"use server"
import prisma from "@/lib/prisma";

export async function GetAllEvents() {
    return await prisma.event.findMany()
}