import CTA from "@/components/home/CTA";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import { UpcomingEvents } from "@/components/home/Upcoming-events";
import PopularCategories from "@/components/home/popular-categories";
import FAQ from "@/components/AllCategories/FAQ";
import Footer from "@/components/home/Footer";


export default function Home() {
    return (
        <div className={"w-11/12 mx-auto"}>
            <Hero/>
            <PopularCategories/>
            <Testimonials/>
            <FAQ/>
            <Statistics/>
            <UpcomingEvents/>
            <CTA/>
            <Footer/>
        </div>

    );
}
