"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

// Define the Event type
interface Event {
  title: string;
  image: string;
  category: string;
  location: string;
  duration: string;
  forWhom: string;
  price: string;
  reviews: number;
  rating: number;
}

// Define the props interface
interface EventCardsProps {
  events: Event[]; // Expecting an array of events from `page.tsx`
}

export default function EventCards({ events = [] }: EventCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {events.length > 0 ? (
        events.map((event, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-lg transition-transform hover:scale-105 duration-300"
          >
            <div className="relative">
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition duration-200">
                <FaHeart className="text-red-500" />
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                {event.reviews} reviews ★ {event.rating}
              </p>
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-gray-500 text-sm">{event.category} • {event.location}</p>
              <p className="text-gray-500 text-sm">{event.duration} • {event.forWhom}</p>
              <p className="text-xl font-bold mt-1 text-primary">{event.price}</p>
              <Button className="bg-[#902B27] text-white w-full mt-4 py-2 rounded-lg">
                Book Now
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )}
    </div>
  );
}
