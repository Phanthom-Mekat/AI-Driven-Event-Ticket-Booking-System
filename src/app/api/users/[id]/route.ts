"use server";
import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }
) {

    console.log(request)
    try {
        const {id} = await params;

        const user = await prisma.user.findUnique({
            where: {id},
        });

        if (!user) {
            return NextResponse.json(
                {error: 'User not found'},
                {status: 404}
            );
        }

        await prisma.user.delete({
            where: {id},
        });

        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            {error: 'Failed to delete user'},
            {status: 500}
        );
    }
}