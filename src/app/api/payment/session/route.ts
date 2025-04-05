import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/auth"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function GET(request: NextRequest) {
    try {
        // Get the session ID from the query parameters
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get("sessionId")

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
        }

        console.log("Fetching Stripe session:", sessionId)

        // Get the current user session
        const userSession = await auth()
        console.log("User authenticated:", !!userSession?.user)

        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId, {
                expand: ["line_items", "customer", "payment_intent"],
            })

            console.log("Stripe session retrieved:", session.id)
            console.log("Session metadata:", session.metadata)
            console.log("Session customer details:", session.customer_details)

            // Check if the user is authorized to view this session
            // Only check if we have a logged-in user and the session has customer email
            if (userSession?.user?.email && session.customer_email && userSession.user.email !== session.customer_email) {
                console.log("Unauthorized access attempt")
                return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
            }

            // Extract relevant data from the session
            const lineItems = session.line_items?.data || []
            const eventTitle =
                lineItems.length > 0
                    ? lineItems[0].description || session.metadata?.eventTitle || "Event"
                    : session.metadata?.eventTitle || "Event"

            // Get payment method details if available
            let paymentMethodDetails = "Card"
            if (typeof session.payment_intent === "object" && session.payment_intent) {
                const paymentIntent = session.payment_intent
                paymentMethodDetails = paymentIntent.payment_method_types?.[0] || "Card"
            }

            // Return the session details with enhanced information
            return NextResponse.json({
                id: session.id,
                eventTitle: eventTitle,
                amount: session.amount_total ? session.amount_total / 100 : 0,
                currency: session.currency || "usd",
                customerName: session.customer_details?.name || session.metadata?.userName || "",
                customerEmail: session.customer_email || session.customer_details?.email || session.metadata?.userEmail || "",
                created: session.created,
                eventDate: session.metadata?.eventDate || new Date().toISOString(),
                eventLocation: session.metadata?.eventLocation || "Venue",
                paymentMethod: paymentMethodDetails,
                status: session.payment_status || "paid",
            })
        } catch (stripeError) {
            console.error("Error retrieving Stripe session:", stripeError)
            return NextResponse.json(
                {
                    error: "Failed to retrieve Stripe session",
                    details: stripeError instanceof Error ? stripeError.message : String(stripeError),
                },
                { status: 500 },
            )
        }
    } catch (error) {
        console.error("Error fetching Stripe session:", error)
        return NextResponse.json(
            { error: "Failed to fetch session details", details: error instanceof Error ? error.message : String(error) },
            { status: 500 },
        )
    }
}

