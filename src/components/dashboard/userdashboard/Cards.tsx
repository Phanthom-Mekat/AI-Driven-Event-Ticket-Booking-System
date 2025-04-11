import React from "react";
import { 
  Ticket, 
  TicketCheck, 
  CalendarDays, 
  DollarSign, 
  TrendingUp, 

  MapPin, 
  Clock 
} from "lucide-react";
import { useState, useEffect } from "react";

// Mock data - in a real app, you would fetch this from your API
const mockEvents = [
  { id: "1", title: "Tech Conference 2025", category: "Technology", ticketPrice: 199, location: "San Francisco" },
  { id: "2", title: "Music Festival", category: "Entertainment", ticketPrice: 89, location: "Los Angeles" },
  { id: "3", title: "Business Summit", category: "Business", ticketPrice: 299, location: "New York" },
  { id: "4", title: "Art Exhibition", category: "Art", ticketPrice: 25, location: "Chicago" },
];

const mockRecentBookings = [
  { id: "b1", eventTitle: "Tech Conference 2025", customerName: "John Doe", amount: 199, date: "2025-04-08" },
  { id: "b2", eventTitle: "Music Festival", customerName: "Jane Smith", amount: 89, date: "2025-04-07" },
  { id: "b3", eventTitle: "Business Summit", customerName: "Robert Brown", amount: 299, date: "2025-04-06" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalEvents: 567,
    availableTickets: 9876,
    bookedTickets: 8543,
    revenue: 234567
  });

  // Simulating data fetching
  useEffect(() => {
    const data = {
      totalEvents: 567,
      availableTickets: 9876,
      bookedTickets: 8543,
      revenue: 234567
    }
    // const fetchStats = async () => {
    //   const response = await fetch("/api/dashboard/stats");
    //   const data = await response.json();
      setStats(data);
    // };
    // fetchStats();
  }, []);

  return (
    <div className="p-6 w-full mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white"></h1>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`inline-flex items-center px-4 py-2 rounded-t-lg ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Overview
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("events")}
              className={`inline-flex items-center px-4 py-2 rounded-t-lg ${
                activeTab === "events"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Events
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`inline-flex items-center px-4 py-2 rounded-t-lg ${
                activeTab === "bookings"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <TicketCheck className="w-4 h-4 mr-2" />
              Bookings
            </button>
          </li>
        </ul>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.totalEvents}</h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full">
              <CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12% </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Tickets</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.availableTickets.toLocaleString()}</h3>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-full">
              <Ticket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">5% </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Booked Tickets</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stats.bookedTickets.toLocaleString()}</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-full">
              <TicketCheck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">18% </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">${stats.revenue.toLocaleString()}</h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">24% </span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Events</h2>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEvents.map((event) => (
                    <tr key={event.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800 dark:text-white">{event.title}</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {event.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        ${event.ticketPrice}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                          {event.location}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Bookings</h2>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all</a>
            </div>
            <div className="space-y-4">
              {mockRecentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white">{booking.customerName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{booking.eventTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800 dark:text-white">${booking.amount}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "events" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">All Events</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create Event
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Events management data would be displayed here.</p>
        </div>
      )}
      
      {activeTab === "bookings" && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">All Bookings</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">Export</button>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">Filter</button>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Bookings data would be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;