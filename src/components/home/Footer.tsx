import React from 'react';
import { Ticket } from 'lucide-react';

const Footer = () => {
    return (
        <footer className=" text-neutral-700 pt-10 pb-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Ticket className="w-8 h-8 text-[var(--color-primary)]" />
                        <h2 className="text-2xl font-bold">AI Ticket</h2>
                    </div>
                    <p className="text-neutral-500">
                        Experience seamless ticket booking with AI-driven personalized event recommendations.
                    </p>
                </div>

                <div className="mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Events</h3>
                    <ul className="space-y-2 text-neutral-500">
                        <li><a href="#upcoming-events" className="hover:text-[var(--color-primary)]">Upcoming Events</a></li>
                        <li><a href="#popular-events" className="hover:text-[var(--color-primary)]">Popular Events</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">AI-Powered Suggestions</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">VIP Access</a></li>
                    </ul>
                </div>

                <div className="mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-neutral-500">
                        <li><a href="#FAQ" className="hover:text-[var(--color-primary)]">FAQs</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">Customer Support</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">Refund Policy</a></li>
                    </ul>
                </div>

                <div className="mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-neutral-500">
                        <li><a href="#" className="hover:text-[var(--color-primary)]">About Us</a></li>
                        <li><a href="#statistics" className="hover:text-[var(--color-primary)]">Statistics</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">AI Technology</a></li>
                    </ul>
                </div>

                <div className="mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <ul className="space-y-2 text-neutral-500">
                        <li><a href="#" className="hover:text-[var(--color-primary)]">Facebook</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">Instagram</a></li>
                        <li><a href="#" className="hover:text-[var(--color-primary)]">Twitter</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-neutral-500 mt-10 border-t border-neutral-500 pt-4">
            <p className="text-center text-neutral-500 ">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-neutral-700">TicketHub</span>. All rights reserved. Powered by <span className="text-neutral-700 font-semibold">AI-Driven Booking</span> for a smarter, seamless event experience.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
