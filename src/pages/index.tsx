import React from "react";
import Login from "@/components/auth/Login";

export default function Home() {
  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-50`}
    >
      <main className="flex row-start-2 items-center sm:items-start">
        <Login />
      </main>
    </div>
  );
}
