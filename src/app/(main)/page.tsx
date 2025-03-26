import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import PopularCategories from "@/components/home/popular-categories";
import Navbar from "@/components/navbar/Navbar";


export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Navbar/>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>
        </div>

    );
}
