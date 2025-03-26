import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/Upcoming-events";
import PopularCategories from "@/components/home/popular-categories";
import Navbar from "@/components/navbar/Navbar";


export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Navbar/>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>
            <Statistics/>
            <UpcomingEvents/>
            <CTA/>

        </div>

    );
}
