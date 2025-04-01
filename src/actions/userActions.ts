"use server"

import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function deleteUser(id: string) {

    if (!id) {
        throw new Error("User not found!")
    }

    try {
        await prisma.user.delete({
            where: {id: id}
        })
        revalidatePath("/dashboard/user-management")
        return {success: true, message: "User deleted successfully"}
    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete user")
    }

}