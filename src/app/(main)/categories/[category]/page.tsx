export default async function EventsPage({params}: { params: Promise<{ category: string }> }) {
    const {category} = await params
    return (
        <>
            hello {category}
        </>
    )
}