export default async function EventCategory({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    return (
        <>
            <h1>Event Category {slug}</h1>
        </>
    )
}