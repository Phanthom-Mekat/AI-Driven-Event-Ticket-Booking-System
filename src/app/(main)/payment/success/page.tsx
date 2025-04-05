"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface PaymentDetails {
    id: string
    eventTitle: string
    amount: number
    currency: string
    customerName: string
    customerEmail: string
    paymentDate: string
    eventDate: string
    eventLocation: string
}

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retryCount, setRetryCount] = useState(0)

    const sessionId = searchParams.get("session_id")

    useEffect(() => {
        // If no session_id is provided, redirect to events page
        if (!sessionId) {
            router.push("/events")
            return
        }

        async function fetchPaymentDetails() {
            try {
                console.log("Fetching payment details for session:", sessionId)
                const response = await fetch(`/api/payment/details?sessionId=${sessionId}`)

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}))
                    console.error("Error response:", response.status, errorData)

                    // If we get a 404 and haven't retried too many times, we'll retry
                    // This helps when the webhook hasn't processed yet
                    if (response.status === 404 && retryCount < 3) {
                        throw new Error("Payment details not found yet, retrying...")
                    }

                    throw new Error(`Failed to fetch payment details: ${response.status}`)
                }

                const data = await response.json()
                console.log("Payment details received:", data)
                setPaymentDetails(data)
                setLoading(false)
            } catch (err) {
                console.error("Error fetching payment details:", err)

                // If we're still within retry limits, try again after a delay
                if (retryCount < 3) {
                    console.log(`Retrying (${retryCount + 1}/3) in 2 seconds...`)
                    setRetryCount((prev) => prev + 1)
                    setTimeout(() => {
                        fetchPaymentDetails()
                    }, 2000) // Retry after 2 seconds
                } else {
                    setError("We couldn't load your payment details. Please check your email for confirmation.")
                    setLoading(false)
                }
            }
        }

        fetchPaymentDetails()
    }, [sessionId, router, retryCount])

    // Format currency
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount)
    }

    return (
        <div className="container max-w-3xl mx-auto py-12 px-4">
            <Card className="w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">Payment Successful!</CardTitle>
                    <CardDescription className="text-base md:text-lg">
                        Thank you for your purchase. Your ticket has been confirmed.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-6 w-2/3" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-4">
                            <p className="text-red-500">{error}</p>
                            <p className="mt-2">Your payment was successful and a confirmation has been sent to your email.</p>
                            <p className="mt-1">Session ID: {sessionId}</p>
                        </div>
                    ) : paymentDetails ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-500">Event</h3>
                                    <p className="font-semibold text-lg">{paymentDetails.eventTitle}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Amount Paid</h3>
                                    <p className="font-semibold text-lg">
                                        {formatCurrency(paymentDetails.amount, paymentDetails.currency)}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Date</h3>
                                    <p>
                                        {new Date(paymentDetails.eventDate).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Location</h3>
                                    <p>{paymentDetails.eventLocation}</p>
                                </div>
                            </div>

                            <div className="border-t border-b py-4">
                                <h3 className="font-medium mb-2">Ticket Information</h3>
                                <p>
                                    A confirmation email has been sent to{" "}
                                    <span className="font-semibold">{paymentDetails.customerEmail}</span>
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Your ticket will be available in your email and in your account dashboard.
                                </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-medium text-green-800">Payment Information</h3>
                                <p className="text-green-700">Payment ID: {paymentDetails.id.substring(0, 8)}...</p>
                                <p className="text-green-700">Payment Date: {new Date(paymentDetails.paymentDate).toLocaleString()}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p>No payment details found. Please check your email for confirmation.</p>
                            <p className="mt-1">Session ID: {sessionId}</p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-[#902B27] hover:bg-[#7a2522] w-full sm:w-auto">
                        <Link href="/events">Browse More Events</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <Link href="/dashboard/payments">View My Tickets</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

