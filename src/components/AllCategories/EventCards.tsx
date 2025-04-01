"use client";
import Image from "next/image";
import {Button} from "../ui/button";
import {FaHeart} from "react-icons/fa";
import {MapPin} from "lucide-react";
import {SlCalender} from "react-icons/sl";

interface IEvent {
    id: string
    title: string
    description: string
    category: string
    location: string
    startDate: Date
    endDate: Date
    coverImage: string
    totalTickets: number
    ticketPrice: number;
    organizerId: string
    availableTickets: number | null
    createdAt: Date
    updatedAt: Date
}

interface EventCardsProps {
    events: IEvent[];
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

export default function EventCards({events = []}: EventCardsProps) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {events.length > 0 ? (
                events.map((event) => (
                    <div
                        key={event.id}
                        className="border rounded-xl p-4 shadow-lg transition-transform hover:scale-105 duration-300"
                    >
                        <div className="relative">
                            <Image
                                src={process.env.NEXT_PUBLIC_URL_ENDPOINT + event.coverImage}
                                alt={event.title}
                                width={400}
                                height={250}
                                className="rounded-lg w-full h-48 object-cover"
                            />
                            <button
                                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition duration-200">
                                <FaHeart className="text-red-500"/>
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-gray-500 text-sm capitalize">{event.category}</p>
                            <p className="text-gray-500 text-sm flex items-start"><MapPin size={20}/> {event.location}</p>
                            <p className="text-gray-500 text-sm flex gap-2 items-center"><SlCalender/>{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
                            <p className="text-xl font-bold mt-1 text-primary">${event.ticketPrice}</p>
                            <Button
                                className="bg-[#902B27] text-white w-full mt-4 py-2 rounded-lg"
                            >
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
