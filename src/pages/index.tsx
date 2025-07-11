import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Login from "@/components/auth/Login";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-50`}
    >
      <main className="flex row-start-2 items-center sm:items-start">
        <Login />
      </main>
    </div>
  );
}
