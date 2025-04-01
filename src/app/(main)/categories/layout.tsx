import SearchFilter from "@/app/(main)/categories/search-filter";

export default function CategoriesLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <SearchFilter/>
            <div className={"max-w-7xl mx-auto"}>
                {children}
            </div>
        </>
    )
}