import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import PopularCategories from "@/components/home/popular-categories";


export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>
        </div>

    );
}
