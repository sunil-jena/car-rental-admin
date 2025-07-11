import React from "react";
import Head from "next/head";
import Login from "@/components/auth/Login";

export default function Home() {
  return (
    <>
      <Head>
        <title>Car Rental Login</title>
        <meta name="description" content="Login to the Car Rental Admin Dashboard to manage listings and approvals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-50`}
      >
        <main className="flex row-start-2 items-center sm:items-start">
          <Login />
        </main>
      </div>
    </>
  );
}
