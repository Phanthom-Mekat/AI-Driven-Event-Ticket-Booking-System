"use client"

import {useState} from "react"
import Image from "next/image"
import {FcRating} from "react-icons/fc"
import {Button} from "@/components/ui/button"
import {
    Heart,
    Share2,
    Users,
    Clock,
    UserCheck,
    PenToolIcon as Tool,
    ChevronLeft,
    ChevronRight,
    MapPin,
} from "lucide-react"

const TAGS = ["Music", "Dhaka", "Concert", "Live", "$10-$50"]

const IMAGE_URL =
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

// Sample gallery images
const GALLERY_IMAGES = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
]

// Sample reviews
const REVIEWS = [
    {
        id: 1,
        name: "Emma Clark",
        location: "NYC",
        image: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Absolutely loved this event! The artist's performance, the high-quality sound, and the overall atmosphere made it truly special. I walked away with amazing memories and a deep appreciation for live music!",
    },
    {
        id: 2,
        name: "Megan Lee",
        location: "Boston",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.5,
        text: "Great experience overall. The venue was perfect and the performances were outstanding. Would definitely attend again!",
    },
    {
        id: 3,
        name: "Ada Miller",
        location: "Chicago",
        image: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "One of the best music festivals I've been to. The organization was flawless and the lineup was incredible.",
    },
]

export default function EventDetailsPage() {
    const [activeTab, setActiveTab] = useState("description")
    const [activeReview, setActiveReview] = useState(0)

    const nextReview = () => {
        setActiveReview((prev) => (prev + 1) % REVIEWS.length)
    }

    const prevReview = () => {
        setActiveReview((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
            <div className="relative mb-4 sm:mb-6">
                <Image
                    src={IMAGE_URL || "/placeholder.svg"}
                    alt="event"
                    width={1600}
                    height={900}
                    className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-cover rounded-2xl"
                />
                <div className="absolute top-2 sm:top-5 left-2 sm:left-5 flex flex-wrap gap-1 sm:gap-2">
                    {TAGS.map((tag) => (
                        <span
                            key={tag}
                            className="bg-[#ffdde4] text-gray-800 text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-0.5 sm:py-1 rounded-full"
                        >
              {tag}
            </span>
                    ))}
                </div>
                <div
                    className="w-full sm:w-72 md:w-80 lg:w-96 bg-[#faf7f5] rounded-b-2xl sm:rounded-b-none sm:rounded-tl-2xl p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-4 absolute bottom-0 right-0">
                    <div className="flex justify-between items-center">
                        <p className="text-secondary-foreground underline text-xs sm:text-sm">50 reviews</p>
                        <p className="flex justify-center items-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <FcRating/> 4.5
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">X Music Fest</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$5</p>
                    </div>
                    <Button
                        className="bg-[#902b27] hover:bg-[#7a2522] w-full text-sm sm:text-base py-1 sm:py-2">Register</Button>
                </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">X MUSIC FEST</h1>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-4 sm:mb-8">
                Experience the ultimate live music event with top artists and unforgettable performances.
            </p>

            <div className="flex overflow-x-auto border-b mb-4 sm:mb-8 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`px-3 sm:px-6 py-2 sm:py-4 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === "description" ? "border-b-2 border-[#902b27] text-[#902b27]" : "text-gray-500"}`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("photos")}
                    className={`px-3 sm:px-6 py-2 sm:py-4 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === "photos" ? "border-b-2 border-[#902b27] text-[#902b27]" : "text-gray-500"}`}
                >
                    Photos
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`px-3 sm:px-6 py-2 sm:py-4 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === "reviews" ? "border-b-2 border-[#902b27] text-[#902b27]" : "text-gray-500"}`}
                >
                    Reviews
                </button>
                <button
                    onClick={() => setActiveTab("location")}
                    className={`px-3 sm:px-6 py-2 sm:py-4 font-medium whitespace-nowrap text-sm sm:text-base ${activeTab === "location" ? "border-b-2 border-[#902b27] text-[#902b27]" : "text-gray-500"}`}
                >
                    Location
                </button>
                <div className="ml-auto flex items-center gap-2 sm:gap-4 pr-0 sm:pr-4">
                    <button className="p-1 sm:p-2 rounded-full hover:bg-gray-100">
                        <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"/>
                    </button>
                    <button className="p-1 sm:p-2 rounded-full hover:bg-gray-100">
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500"/>
                    </button>
                </div>
            </div>

            {/* Description Tab Content */}
            {activeTab === "description" && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8 mb-6 sm:mb-12 text-sm sm:text-base">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500"/>
                            <span className="text-gray-700">Group Event</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500"/>
                            <span className="text-gray-700">Three Hours</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500"/>
                            <span className="text-gray-700">Max: 200</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Tool className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500"/>
                            <span className="text-gray-700">All equipment</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6">What to
                                Expect?</h2>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600">
                                <p>
                                    Join us for an electrifying night of music with renowned artists from around the
                                    world. X Music Fest
                                    brings together diverse musical talents in one spectacular venue.
                                </p>
                                <p>
                                    From pulsating beats to soulful melodies, this festival caters to all music lovers.
                                    Experience
                                    state-of-the-art sound systems, dazzling light shows, and an atmosphere charged with
                                    energy and
                                    excitement.
                                </p>
                                <p className="hidden sm:block">
                                    Whether you&#39;re a dedicated fan or just looking for a night of entertainment, X Music
                                    Fest promises an
                                    unforgettable experience that will leave you wanting more.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-6 mt-6 md:mt-0">
                                Your Ticket Includes:
                            </h2>
                            <ul className="space-y-3 sm:space-y-4">
                                {[
                                    "Access to all performance stages and venues",
                                    "Complimentary welcome drink upon arrival",
                                    "Official festival merchandise pack",
                                    "Free parking at designated areas",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                                        <div
                                            className="mt-0.5 sm:mt-1 flex-shrink-0 rounded-full bg-[#ffebee] p-0.5 sm:p-1">
                                            <svg
                                                className="h-3 w-3 sm:h-4 sm:w-4 text-[#902b27]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </div>
                                        <span className="text-sm sm:text-base text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {/* Photos Tab Content */}
            {activeTab === "photos" && (
                <div className="py-4">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">A GLIMPSE OF PAST EVENTS</h2>
                        <p className="text-gray-600 mb-6">View the gallery of the latest performances and festivals.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {GALLERY_IMAGES.map((image, index) => (
                                <div
                                    key={index}
                                    className={`${index === 1 ? "sm:col-span-2 sm:row-span-2" : ""} overflow-hidden rounded-lg`}
                                >
                                    <Image
                                        src={image || "/placeholder.svg"}
                                        alt={`Event photo ${index + 1}`}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Tab Content */}
            {activeTab === "reviews" && (
                <div className="py-4">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">REAL FEEDBACK FROM OUR
                            ATTENDEES</h2>
                        <p className="text-gray-600 mb-8">Real experiences from attendees who have enjoyed our music
                            festivals!</p>

                        <div className="relative">
                            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 rounded-lg p-6">
                                <div className="md:w-1/3">
                                    <Image
                                        src={REVIEWS[activeReview].image || "/placeholder.svg"}
                                        alt={`${REVIEWS[activeReview].name}'s photo`}
                                        width={300}
                                        height={300}
                                        className="w-full h-48 md:h-64 object-cover rounded-lg"
                                    />
                                </div>
                                <div className="md:w-2/3">
                                    <h3 className="text-xl font-bold mb-2">An Unforgettable Experience!</h3>
                                    <p className="text-gray-600 mb-4">{REVIEWS[activeReview].text}</p>
                                    <div className="mt-4">
                                        <p className="font-bold">{REVIEWS[activeReview].name}</p>
                                        <p className="text-gray-500">{REVIEWS[activeReview].location}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={prevReview}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                            >
                                <ChevronLeft className="h-5 w-5 text-gray-600"/>
                            </button>
                            <button
                                onClick={nextReview}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                            >
                                <ChevronRight className="h-5 w-5 text-gray-600"/>
                            </button>
                        </div>

                        <div className="mt-12 flex justify-center gap-8">
                            {REVIEWS.map((review, index) => (
                                <button
                                    key={review.id}
                                    onClick={() => setActiveReview(index)}
                                    className={`flex flex-col items-center gap-2 ${activeReview === index ? "opacity-100" : "opacity-50"}`}
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <Image
                                            src={review.image || "/placeholder.svg"}
                                            alt={review.name}
                                            width={50}
                                            height={50}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span
                                        className={`text-xs ${activeReview === index ? "text-[#902b27]" : "text-gray-500"}`}>
                    {review.name}
                  </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Location Tab Content */}
            {activeTab === "location" && (
                <div className="py-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">VIEW THE LOCATION</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-bold mb-4">Hours</h3>
                            <div className="space-y-2">
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                                    <div key={day} className="flex justify-between text-sm">
                                        <span>{day}</span>
                                        <span>{index < 5 ? "8:00 AM - 9:00 PM" : "10:00 AM - 9:00 PM"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-gray-100 rounded-lg overflow-hidden relative min-h-[300px]">
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <MapPin className="h-8 w-8 text-[#902b27] mx-auto mb-2"/>
                                    <h3 className="font-bold text-lg mb-2">456 Music Avenue, Dhaka</h3>
                                    <p className="text-gray-600 mb-4">Located in the heart of the entertainment
                                        district</p>
                                    <Button
                                        className="bg-white text-[#902b27] hover:bg-gray-50 border border-[#902b27]">
                                        View on Map
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 sm:mt-12 flex justify-center">
                <Button
                    className="bg-[#902b27] cursor-pointer hover:bg-[#7a2522] px-8 sm:px-12 py-2 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
                    Register
                </Button>
            </div>

        </div>
    )
}

