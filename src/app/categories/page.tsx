 "use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Searching from "@/components/AllCategories/Searching";
import CategoryTags from "@/components/AllCategories/CategoryTags";
import SortingDropdown from "@/components/AllCategories/SortingDropdown";
import EventCards from "@/components/AllCategories/EventCards";
import { IoIosArrowForward } from "react-icons/io";
import eventData from "../../data/events.json";
import RecentView from "@/components/AllCategories/RecentView";
import FAQ from "@/components/AllCategories/FAQ";

// Define Event Type
interface Event {
  title: string;
  image: string;
  category: string;
  location: string;
  duration: string;
  forWhom: string;
  price: string;
  reviews: number;
  rating: number;
}

// Define Filters
interface Filters {
  location?: string;
  forWhom?: string;
  category?: string;
  price?: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({});

  // Extract filters from URL on page load
  useEffect(() => {
    const newFilters: Filters = {};
    searchParams.forEach((value, key) => {
      newFilters[key as keyof Filters] = value;
    });
    setFilters(newFilters);
  }, [searchParams]);

  // Function to update filters and URL
  const updateFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Update URL dynamically without a page refresh
    router.push(`?${params.toString()}`);
  };

  // Filter events dynamically based on URL filters
  const filteredEvents = eventData.events.filter((event) =>
    Object.entries(filters).every(([key, value]) =>
      value ? event[key as keyof Event] === value : true
    )
  );

  return (
    <div className="w-11/12 mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Search Section */}
      <div className="mt-8 lg:mt-16 pt-8">
        <Searching updateFilters={updateFilters} />
      </div>

      {/* Page Header */}
      <div className="mt-6 flex items-center gap-2">
        <IoIosArrowForward className="text-primary text-lg" />
        <h5 className="text-gray-600 text-sm">Search the site</h5>
      </div>

      <h1 className="text-3xl font-bold mt-2">HERE’s What We Found</h1>

      {/* Filters & Sorting */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CategoryTags />
        <SortingDropdown />
      </div>

      {/* Event Cards Section */}
      <EventCards events={filteredEvents} />
      {/* when searching params then the data store backend then recentview page show */}
      <RecentView  events={filteredEvents}></RecentView>
       {/* faq section adding intigate mailgun for next day */}
       <FAQ></FAQ>

    </div>
  );
}
