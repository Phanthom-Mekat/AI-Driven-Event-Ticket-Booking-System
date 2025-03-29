"use server"
import prisma from "@/lib/prisma";
import {auth} from "@/auth";


interface EventFormData {
    title: string;
    description: string;
    category: string;
    location: string;
    startDate: Date;
    endDate: Date;
    totalTickets: number;
    ticketPrice: number;
    coverImage: string;
}


export async function createEvent(formData: EventFormData) {
    const session = await auth()

    const data = {
        ...formData,
        organizerId: session?.user?.id as string
    }

    try {
        await prisma.event.create({
            data: data
        })
        return {success: true, message: "Event created successfully"}
    } catch (error) {
        console.log(error)
        return {success: false, message: "Failed to create event"}
    }
}