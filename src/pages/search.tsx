/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { format } from "date-fns";

interface RouterQuery {
  [key: string]: string;
}

const search = () => {
  const router = useRouter();
  const { location, startDate, endDate, numberOfGuest } = router.query as RouterQuery;

  return (
    <div>
      <Header />
      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs ">300 + Stays - - for {numberOfGuest} guests</p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">Stays in {location}</h1>
          <div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default search;
