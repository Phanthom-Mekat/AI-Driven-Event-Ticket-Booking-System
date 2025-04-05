import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        // Get the session ID from the query parameters
        const { searchParams } = new URL(request.url)
        const sessionId = searchParams.get("sessionId")

        console.log("Fetching payment details for session:", sessionId)

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
        }

        // Get the current user session
        const session = await auth()
        console.log("User authenticated:", !!session?.user)

        // Find the payment by Stripe session ID
        try {
            console.log("Querying database for payment with sessionId:", sessionId)
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

            console.log("Payment found:", !!payment)

            if (!payment) {
                console.log("Payment not found for session ID:", sessionId)
                return NextResponse.json({ error: "Payment not found" }, { status: 404 })
            }

            if (payment.userId && session?.user?.id && payment.userId !== session.user.id) {
                console.log("Unauthorized access attempt. Payment user:", payment.userId, "Session user:", session.user.id)
                return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
            }

            console.log("Returning payment details for session:", sessionId)
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
        } catch (dbError) {
            console.error("Database error:", dbError)
            return NextResponse.json(
                { error: "Database error", details: dbError instanceof Error ? dbError.message : String(dbError) },
                { status: 500 },
            )
        }
    } catch (error) {
        console.error("Error fetching payment details:", error)
        return NextResponse.json(
            { error: "Failed to fetch payment details", details: error instanceof Error ? error.message : String(error) },
            { status: 500 },
        )
    }
}

