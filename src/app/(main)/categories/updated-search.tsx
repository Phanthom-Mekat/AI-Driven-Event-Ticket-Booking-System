"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const initialSearch = searchParams.get("search") || "";
        setSearchTerm(initialSearch);
    }, [searchParams]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (searchTerm) {
                params.set("search", searchTerm);
            } else {
                params.delete("search");
            }

            router.replace(`/categories?${params.toString()}`);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, router]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.set("search", searchTerm);
        }

        router.replace(`/categories?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto mb-6 px-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search events by title, location, or category..."
                    className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </form>
    );
}