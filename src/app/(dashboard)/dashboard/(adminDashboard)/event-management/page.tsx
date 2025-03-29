import {EventManagementTable} from "@/app/(dashboard)/dashboard/(adminDashboard)/event-management/event-table";
import {GetAllEvents} from "@/actions/get-all-events";

export default async function EventManagementPage() {
    const events = await GetAllEvents()
    console.log(events)

    return (
        <>
            <EventManagementTable eventData={events}/>
        </>
    )
}