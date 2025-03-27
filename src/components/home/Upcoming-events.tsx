"use client";
import React from "react";
import { Card, Carousel } from "../apple-cards-carousel";

export function UpcomingEvents() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="py-20">
        <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-700 dark:text-neutral-200 mb-3">
          Exciting Upcoming Events Await You!
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Stay updated with the latest events and never miss out on thrilling
          experiences.
        </p>
      </div>
    <div className="max-w-7xl mx-auto h-full ">
    
      <Carousel items={cards} />
    </div>
    </div>
  );
}


const data = [
  {
    title: "Rock on the Beach",
    category: "Music Festivals",
    date: "2025-06-10",
    location: "Miami Beach, Florida",
    description:
      "A weekend of electrifying performances by top rock bands and artists on the sandy shores of Miami Beach.",
    src: "https://i.imgur.com/Qofj3lc.jpeg",
    ticketsSold: 12000,
    slug: "rock-on-the-beach",
  },

  {
    title: "Modern Art Expo",
    category: "Art Exhibitions",
    date: "2025-08-15",
    location: "Paris, France",
    description:
      "Explore groundbreaking works from emerging artists at the Modern Art Expo in the heart of Paris.",
    src: "https://i.imgur.com/7uD9AQL.jpeg",
    ticketsSold: 3200,
    slug: "modern-art-expo",
  },
  {
    title: "Tech & Coding Bootcamp",
    category: "Workshops & Classes",
    date: "2025-09-05",
    location: "San Francisco, California",
    description:
      "Learn the latest coding skills and tech trends at this intensive bootcamp for aspiring developers and engineers.",
    src: "https://i.imgur.com/8FQMcGK.png",
    ticketsSold: 500,
    slug: "tech-coding-bootcamp",
  },
  {
    title: "The Grand Slam Tennis",
    category: "Sports Events",
    date: "2025-10-20",
    location: "London, UK",
    description:
      "Catch the best tennis players in action at the prestigious Grand Slam Tennis Tournament in London.",
    src: "https://i.imgur.com/dRZ64br.png",
    ticketsSold: 7000,
    slug: "grand-slam-tennis",
  },
  {
    title: "Business Networking Gala",
    category: "Networking",
    date: "2025-11-10",
    location: "New York, USA",
    description:
      "An exclusive event for business leaders and entrepreneurs to expand their networks and share insights.",
    src: "https://i.imgur.com/Jh2sB3q.jpeg",
    ticketsSold: 1500,
    slug: "business-networking-gala",
  },
  {
    title: "Global Cultural Fest",
    category: "Cultural Festivals",
    date: "2025-12-12",
    location: "Berlin, Germany",
    description:
      "Celebrate global diversity through music, food, and art at the Global Cultural Festival in Berlin.",
    src: "https://i.imgur.com/7paRx5T.png",
    ticketsSold: 10000,
    slug: "global-cultural-fest",
  },
  {
    title: "Movie Marathon Weekend",
    category: "Movies",
    date: "2025-07-25",
    location: "Los Angeles, California",
    description:
      "Enjoy a weekend of your favorite movies, from classic hits to the latest blockbusters, with friends and family.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ticketsSold: 2000,
    slug: "movie-marathon-weekend",
  },
];

