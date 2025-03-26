import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "@/app/globals.css";
import {SessionProvider} from "next-auth/react";
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap", 
});

export const metadata: Metadata = {
  title: "AI-Driven Event Ticket Booking",
  description: "Experience seamless event ticket booking with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
    <html lang="en">
      <body className={`${sora.variable} antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
    </SessionProvider>
  );
}
