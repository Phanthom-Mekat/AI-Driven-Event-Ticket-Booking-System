 "use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import eventData from "../../../../data/events.json";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Define event type
interface Event {
  id: number;
  title: string;
  image: string;
  category: string;
  location: string;
  duration: string;
  forWhom: string;
  price: string;
  reviews: number;
  rating: number;
  description: string; 
  venue: string;
  instructor: string;
  time: string;
  date: string;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const eventId = Number(id);

  // Find the event in the data
  const event: Event | undefined = eventData.events.find((event) => event.id === eventId);

  // State for date, time, and buy ticket 
  const [buyticket, setBuyTicket] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  // If event is not found, show error
  if (!event) {
    return <p className="text-center text-red-500 text-xl mt-10">Event not found.</p>;
  }

  // Fix for price parsing issue
  const pricePerPerson = typeof event.price === "string" 
    ? parseFloat(event.price.replace("$", "")) 
    : event.price;
    
  const totalAmount = pricePerPerson * buyticket;

  // Checkout Button Handler
  const checkoutButton = async () => {

    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment", {
        title: event.title,
        description:event.description,
        price: totalAmount.toString(),
      });

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Event Details */}
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-500 text-sm mt-1">{event.category} • {event.location}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left - Event Image */}
        <div className="col-span-1 md:col-span-2">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={400}
            className="rounded-lg w-full h-72 object-cover"
          />
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-gray-700"><strong>Duration:</strong> {event.duration}</p>
              <p className="text-gray-700"><strong>For:</strong> {event.forWhom}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Reviews:</strong> {event.reviews}</p>
              <p className="text-gray-700"><strong>Rating:</strong> ★{event.rating}</p>
            </div>
          </div>
          <p className="text-gray-600 font-semibold mt-3"><strong>Instructor:</strong> {event.instructor}</p>
          <p className="text-gray-600 font-semibold mt-3"><strong>Description:</strong> {event.description}</p>
        </div>

        {/* Right - Order Preview */}
        <div className="border p-4 rounded-lg shadow-md bg-gray-100">
          <h2 className="text-xl font-bold mb-3">Order Preview</h2>
          <p className="font-semibold">{event.title}</p>
          <p className="text-gray-500 text-sm mt-1">{event.venue}</p>

          {/* Date Selection */}
          <div className="mt-4">
            <label className="text-sm font-semibold flex items-center">
              <FaCalendarAlt className="mr-2" />Date: {event.date}
            </label>
            
          </div>
           {/* Time Selection */} 
          <div className="mt-4">
            <label className="text-sm font-semibold flex items-center">
              <FaClock  className="mr-2" />Time: {event.time}
            </label>
          </div> 

          {/* Ticket Selection */}
          <div className="mt-4">
            <label className="text-sm font-semibold flex items-center">
              <FaUsers className="mr-2" /> Buy Ticket:
            </label>
            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={buyticket}
              onChange={(e) => setBuyTicket(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div className="mt-4 text-lg font-bold">
            Total Amount: <span className="text-primary">${totalAmount.toFixed(2)}</span>
          </div>

          {/* Confirm Button */}
          <Button onClick={checkoutButton} disabled={loading} className="bg-[#902B27] text-white w-full mt-4 py-3 rounded-lg">
            {loading ? "Loading..." : "Pay Now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
