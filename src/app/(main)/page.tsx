import Hero from "@/components/Hero";
import PopularCategories from "@/components/popular-categories";

export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <PopularCategories/>
        </div>

    );
}
