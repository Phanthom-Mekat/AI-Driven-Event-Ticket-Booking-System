import Image from "next/image";
import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

const events = [
  {
    title: "AI & Machine Learning Bootcamp",
    image: "/image/img2.jpg",
    price: "$299",
    reviews: 120,
    rating: 4.8,
  },
  {
    title: "Cybersecurity Fundamentals Workshop",
    image: "/image/cybersecurity.jpg",
    price: "$199",
    reviews: 85,
    rating: 4.7,
  },
  {
    title: "Blockchain & Web3 Development",
    image: "/image/blockchain.jpg",
    price: "$250",
    reviews: 95,
    rating: 4.9,
  },
  {
    title: "Cloud Computing with AWS & Azure",
    image: "/image/cloud-computing.jpg",
    price: "$275",
    reviews: 110,
    rating: 4.8,
  },
  {
    title: "UI/UX Design & Prototyping",
    image: "/image/ui-ux.jpg",
    price: "$180",
    reviews: 70,
    rating: 4.6,
  },
  {
    title: "Data Science & Analytics Workshop",
    image: "/image/data-science.jpg",
    price: "$320",
    reviews: 130,
    rating: 4.9,
  },
];

export default function EventCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="border rounded-xl p-4 shadow-lg transition-transform hover:scale-105 duration-300"
        >
          {/* Image */}
          <div className="relative">
            <Image
              src={event.image}
              alt={event.title}
              width={400}
              height={250}
              className="rounded-lg w-full h-48 object-cover"
            />
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition duration-200">
              <FaHeart className="text-red-500" />
            </button>
          </div>

          {/* Event Details */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-sm">
              {event.reviews} reviews ★ {event.rating}
            </p>
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <p className="text-xl font-bold mt-1 text-primary">{event.price}</p>
            <Button className="bg-primary text-white w-full mt-4 py-2 rounded-lg">
              Book Now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
