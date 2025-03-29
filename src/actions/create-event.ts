"use server"
import prisma from "@/lib/prisma";
import {auth} from "@/auth";

export async function createEvent(formData: any) {
    const session = await auth()
    console.log(session?.user?.id)

    const data = {
        ...formData,
        organizerId: session?.user?.id
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