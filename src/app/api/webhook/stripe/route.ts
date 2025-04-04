import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = (await headers()).get("stripe-signature") as string

        let event: Stripe.Event
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        } catch (err) {
            console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : "Unknown error"}`)
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
        }

        if (event.type === "checkout.session.completed") {
            await handleSuccessfulPayment(event.data.object as Stripe.Checkout.Session)
        } else if (event.type === "payment_intent.payment_failed") {
            await handleFailedPayment(event.data.object as Stripe.PaymentIntent)
        } else if (event.type === "checkout.session.expired") {
            await handleExpiredSession(event.data.object as Stripe.Checkout.Session)
        }

        return NextResponse.json({ received: true }, { status: 200 })
    } catch (error) {
        console.error("Webhook error:", error)
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
    }
}



async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const eventId = session.metadata?.eventId
    const userId = session.metadata?.userId
    const userEmail = session.metadata?.userEmail || session.customer_details?.email || ""
    const userName = session.metadata?.userName || session.customer_details?.name || ""
    const eventTitle = session.metadata?.eventTitle || ""
    const ticketPrice = session.metadata?.ticketPrice ? Number.parseFloat(session.metadata.ticketPrice) : 0

    if (!eventId) {
        console.error("No event ID found in session metadata")
        return
    }

    // Retrieve the payment intent for additional details
    let paymentIntent: Stripe.PaymentIntent | null = null
    if (session.payment_intent) {
        paymentIntent = await stripe.paymentIntents.retrieve(
            typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent.id,
        )
    }

    // Use a transaction to ensure both payment and booking are created together
    await prisma.$transaction(async (tx) => {
        // 1. Create the booking
        const booking = await tx.booking.create({
            data: {
                userId: userId || "", // If userId is empty, this will fail - handle appropriately
                eventId,
            },
        })

        // 2. Create the payment record
        await tx.payment.create({
            data: {
                stripeSessionId: session.id,
                stripePaymentIntentId:
                    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
                amount: session.amount_total ? session.amount_total / 100 : ticketPrice,
                currency: session.currency || "usd",
                status: "COMPLETED",
                paymentMethod: paymentIntent?.payment_method_types?.[0] || "card",

                // User information
                userId: userId || null,
                customerEmail: userEmail,
                customerName: userName,

                // Event information
                eventId,
                eventTitle,
                ticketPrice,

                // Link to booking
                bookingId: booking.id,

                // Payment date
                paymentDate: new Date(),
            },
        })

        // 3. Update available tickets
        await tx.event.update({
            where: { id: eventId },
            data: {
                availableTickets: {
                    decrement: 1,
                },
            },
        })
    })
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
    const metadata = paymentIntent.metadata
    const eventId = metadata.eventId
    const userId = metadata.userId
    const userEmail = metadata.userEmail || ""
    const userName = metadata.userName || ""
    const eventTitle = metadata.eventTitle || ""
    const ticketPrice = metadata.ticketPrice ? Number.parseFloat(metadata.ticketPrice) : 0

    if (!eventId) {
        console.error("No event ID found in payment intent metadata")
        return
    }

    await prisma.payment.create({
        data: {
            stripeSessionId: paymentIntent.id,
            stripePaymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: "FAILED",
            paymentMethod: paymentIntent.payment_method_types?.[0] || "card",

            // User information
            userId: userId || null,
            customerEmail: userEmail,
            customerName: userName,

            // Event information
            eventId,
            eventTitle,
            ticketPrice,

            // Error information
            errorMessage: paymentIntent.last_payment_error?.message || "Payment failed",
        },
    })
}

async function handleExpiredSession(session: Stripe.Checkout.Session) {
    // Extract metadata
    const eventId = session.metadata?.eventId
    const userId = session.metadata?.userId
    const userEmail = session.metadata?.userEmail || session.customer_details?.email || ""
    const userName = session.metadata?.userName || session.customer_details?.name || ""
    const eventTitle = session.metadata?.eventTitle || ""
    const ticketPrice = session.metadata?.ticketPrice ? Number.parseFloat(session.metadata.ticketPrice) : 0

    if (!eventId) {
        console.error("No event ID found in session metadata")
        return
    }

    // Create a payment record for the expired session
    await prisma.payment.create({
        data: {
            stripeSessionId: session.id,
            stripePaymentIntentId:
                typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
            amount: session.amount_total ? session.amount_total / 100 : ticketPrice,
            currency: session.currency || "usd",
            status: "FAILED",

            // User information
            userId: userId || null,
            customerEmail: userEmail,
            customerName: userName,

            // Event information
            eventId,
            eventTitle,
            ticketPrice,

            // Error information
            errorMessage: "Checkout session expired",
        },
    })
}

