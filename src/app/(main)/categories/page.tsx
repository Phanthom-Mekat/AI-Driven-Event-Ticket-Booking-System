import EventCards from "@/components/AllCategories/EventCards";
import {getSearchedEvents} from "@/actions/eventActions";
import {NoDataMessage} from "@/components/no-data";
import {MusicIcon} from "lucide-react";

export default async function CategoriesPage({
                                                 searchParams,
                                             }: {
    searchParams: Promise<{
        search: string | null,
        category: string | null,
        sort: string | null
    }>
}) {

    const search = (await searchParams).search || null
    const category = (await searchParams).category || "all"
    const sort = (await searchParams).sort || "latest"

    const events = await getSearchedEvents(search, category, sort);

    if (events.length === 0) {
        return (
            <NoDataMessage
                icon={<MusicIcon/>}
                title={"No events found"}
                description={
                    "No events match your search criteria. Try adjusting your search terms."
                }
            />
        );
    }

    return <EventCards events={events}/>;
}