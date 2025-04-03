import prisma from "@/lib/prisma";
import EventDetails from "@/components/event-details";
import {NoDataMessage} from "@/components/no-data";

export default async function EventDetailsPage({params}: { params: Promise<{ eventId: string }> }) {
    const {eventId} = await params;
    const event = await prisma.event.findUnique({
        where: {id: eventId}
    })


    if (!event) {
        return <NoDataMessage/>
    }

    const organizer = await prisma.user.findUnique({
        where: {id: event.organizerId}
    })

    if (!organizer){
        return <div>Organizer details not found</div>
    }


    return (
        <div className={"max-w-7xl mx-auto"}>
            <EventDetails event={event} organizer={organizer}/>
        </div>
    )
}
