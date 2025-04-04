import {type NextRequest, NextResponse} from "next/server"
import prisma from "@/lib/prisma";
import {auth} from "@/auth";

export async function GET(request: NextRequest) {
    try {
        // Get the session ID from the query parameters
        const {searchParams} = new URL(request.url)
        const sessionId = searchParams.get("sessionId")

        if (!sessionId) {
            return NextResponse.json({error: "Session ID is required"}, {status: 400})
        }

        // Get the current user session
        const session = await auth();

        // Find the payment by Stripe session ID
        const payment = await prisma.payment.findUnique({
            where: {
                stripeSessionId: sessionId,
            },
            include: {
                event: {
                    select: {
                        title: true,
                        startDate: true,
                        location: true,
                    },
                },
            },
        })

        if (!payment) {
            return NextResponse.json({error: "Payment not found"}, {status: 404})
        }

        if (payment.userId && session?.user?.id && payment.userId !== session.user.id) {
            return NextResponse.json({error: "Unauthorized"}, {status: 403})
        }

        return NextResponse.json({
            id: payment.id,
            eventTitle: payment.eventTitle || payment.event.title,
            amount: payment.amount,
            currency: payment.currency,
            customerName: payment.customerName,
            customerEmail: payment.customerEmail,
            paymentDate: payment.paymentDate,
            eventDate: payment.event.startDate,
            eventLocation: payment.event.location,
        })
    } catch (error) {
        console.error("Error fetching payment details:", error)
        return NextResponse.json({error: "Failed to fetch payment details"}, {status: 500})
    }
}

