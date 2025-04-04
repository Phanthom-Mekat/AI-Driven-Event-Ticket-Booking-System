import React from 'react';
import MyTicketTable from './my-ticket-table';
import prisma from "@/lib/prisma";

export default async function MyTicket() {

    const tickets = await prisma.booking.findMany({
        include: {
            payment: true,
            user: true,
            event : true
        }
    });


    return (
        <>
            <MyTicketTable bookings={tickets}/>
        </>
    );
};

