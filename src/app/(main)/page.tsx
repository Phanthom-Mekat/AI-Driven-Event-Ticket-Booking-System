import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import PopularCategories from "@/components/home/popular-categories";
import FAQ from "@/components/AllCategories/FAQ";


export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>
            <FAQ/>
        </div>

    );
}
