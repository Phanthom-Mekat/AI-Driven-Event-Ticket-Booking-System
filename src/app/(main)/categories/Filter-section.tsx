"use client"
import Searching from "@/components/AllCategories/Searching";
import {IoIosArrowForward} from "react-icons/io";
import CategoryTags from "@/components/AllCategories/CategoryTags";
import SortingDropdown from "@/components/AllCategories/SortingDropdown";

export default function FilterSection() {
    return (
        <>
            <div className="pt-8">
                <Searching/>
            </div>
            <div className="mt-6 flex items-center gap-2">
                <IoIosArrowForward className="text-primary text-lg"/>
                <h5 className="text-gray-600 text-sm">Search the site</h5>
            </div>
            <h1 className="text-3xl font-bold mt-2">HERE’s What We Found</h1>
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CategoryTags/>
                <SortingDropdown/>
            </div>
        </>
    )
}