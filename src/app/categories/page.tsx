import Navbar from "@/components/navbar/Navbar";
import Searching from "@/components/AllCategories/Searching";
import CategoryTags from "@/components/AllCategories/CategoryTags";
import SortingDropdown from "@/components/AllCategories/SortingDropdown";
import EventCards from "@/components/AllCategories/EventCards";
import { IoIosArrowForward } from "react-icons/io";

export default function Page() {
  return (
    <div className="w-11/12 mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Search Section */}
      <div className="mt-16 pt-8">
        <Searching />
      </div>

      {/* Page Header */}
      <div className="mt-6 flex items-center gap-2">
        <IoIosArrowForward className="text-primary text-lg" />
        <h5 className="text-gray-600 text-sm">Search the site</h5>
      </div>

      <h1 className="text-3xl font-bold mt-2">Here’s What We Found</h1>

      {/* Filters & Sorting */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CategoryTags />
        <SortingDropdown />
      </div>

      {/* Event Cards Section   */}
      <EventCards />
    </div>
  );
}
