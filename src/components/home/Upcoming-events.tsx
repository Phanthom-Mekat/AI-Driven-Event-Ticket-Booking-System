"use client";
import React from "react";
import { Card, Carousel } from "../apple-cards-carousel";

export function UpcomingEvents() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="max-w-7xl mx-auto h-full py-20">
      <Carousel items={cards} />
    </div>
  );
}

// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => {
//         return (
//           <div
//             key={"dummy-content" + index}
//             className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
//           >
//             <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//               <span className="font-bold text-neutral-700 dark:text-neutral-200">
//                 The first rule of Apple club is that you boast about Apple club.
//               </span>{" "}
//               Keep a journal, quickly jot down a grocery list, and take amazing
//               class notes. Want to convert those notes to text? No problem.
//               Langotiya jeetu ka mara hua yaar is ready to capture every
//               thought.
//             </p>
//             <Image
//               src="https://assets.aceternity.com/macbook.png"
//               alt="Macbook mockup from Aceternity UI"
//               height="500"
//               width="500"
//               className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
//             />
//           </div>
//         );
//       })}
//     </>
//   );
// };

const data=[
  {
    "title": "Rock on the Beach",
    "category": "Music Festivals",
    "date": "2025-06-10",
    "location": "Miami Beach, Florida",
    "description": "A weekend of electrifying performances by top rock bands and artists on the sandy shores of Miami Beach.",
    "src": "https://i.imgur.com/Qofj3lc.jpeg",
    "ticketsSold": 12000,
    "slug": "rock-on-the-beach"
  },
  
  {
    "title": "Modern Art Expo",
    "category": "Art Exhibitions",
    "date": "2025-08-15",
    "location": "Paris, France",
    "description": "Explore groundbreaking works from emerging artists at the Modern Art Expo in the heart of Paris.",
    "src": "https://i.imgur.com/Qofj3lc.jpeg",
    "ticketsSold": 3200,
    "slug": "modern-art-expo"
  },
  {
    "title": "Tech & Coding Bootcamp",
    "category": "Workshops & Classes",
    "date": "2025-09-05",
    "location": "San Francisco, California",
    "description": "Learn the latest coding skills and tech trends at this intensive bootcamp for aspiring developers and engineers.",
    "src": "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ticketsSold": 500,
    "slug": "tech-coding-bootcamp"
  },
  {
    "title": "The Grand Slam Tennis",
    "category": "Sports Events",
    "date": "2025-10-20",
    "location": "London, UK",
    "description": "Catch the best tennis players in action at the prestigious Grand Slam Tennis Tournament in London.",
    "src": "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ticketsSold": 7000,
    "slug": "grand-slam-tennis"
  },
  {
    "title": "Business Networking Gala",
    "category": "Networking",
    "date": "2025-11-10",
    "location": "New York, USA",
    "description": "An exclusive event for business leaders and entrepreneurs to expand their networks and share insights.",
    "src": "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ticketsSold": 1500,
    "slug": "business-networking-gala"
  },
  {
    "title": "Global Cultural Fest",
    "category": "Cultural Festivals",
    "date": "2025-12-12",
    "location": "Berlin, Germany",
    "description": "Celebrate global diversity through music, food, and art at the Global Cultural Festival in Berlin.",
    "src": "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ticketsSold": 10000,
    "slug": "global-cultural-fest"
  },
  {
    "title": "Movie Marathon Weekend",
    "category": "Movies",
    "date": "2025-07-25",
    "location": "Los Angeles, California",
    "description": "Enjoy a weekend of your favorite movies, from classic hits to the latest blockbusters, with friends and family.",
    "src": "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "ticketsSold": 2000,
    "slug": "movie-marathon-weekend"
  }
]

// const data = [
//   {
//     category: "Artificial Intelligence",
//     title: "You can do more with AI.",
//     src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },

//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     // content: <DummyContent />,
//   },
// ];
