import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/Upcoming-events";
import PopularCategories from "@/components/home/popular-categories";
import FAQ from "@/components/AllCategories/FAQ";


export default function Home() {
    return (
        <div className={"container mx-auto"}>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>

            <FAQ/>
            <Statistics/>
            <UpcomingEvents/>
            <CTA/>
        </div>

    );
}
