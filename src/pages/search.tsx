/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";
import { format } from "date-fns";
import InforCard from "@/components/InforCard";
import Map from "@/components/Map";
interface RouterQuery {
  [key: string]: string;
}
interface SearchProps {
  searchResults: SearchDetail[];
}

const search = ({ searchResults }: SearchProps) => {
  const router = useRouter();
  const { location, startDate, endDate, numbOfGuests } = router.query as RouterQuery;
  let range = "";
  try {
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    range = `${formattedStartDate} - ${formattedEndDate}`;
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numbOfGuests} guests`} />
      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs ">
            300 + Stays - {range} - for {numbOfGuests} guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">Stays in {location}</h1>
          <div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(({ img, location, title, description, star, price, total }) => (
              <InforCard
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
              />
            ))}
          </div>
        </section>

        <section className="sticky top-[76px] hidden h-[calc(100vh-76px)] xl:inline-flex xl:min-w-[40%]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default search;

export const getServerSideProps = async () => {
  const searchResults = await fetch(`${process.env.SEARCH_DATA}`).then((res) => res.json());

  return {
    props: {
      searchResults,
    },
  };
};
