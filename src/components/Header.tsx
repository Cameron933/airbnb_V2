import Image from "next/image";
import {
  Bars3Icon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export interface HeaderQuery extends ParsedUrlQuery {
  location?: string;
  startDate?: string;
  endDate?: string;
  numbOfGuests?: string;
}

const Header = ({ placeholder }: any) => {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numbOfGuests, setNumbOfGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const resetInput = () => {
    setSearchInput("");
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numbOfGuests: numbOfGuests.toString(),
      } as HeaderQuery,
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      <div
        onClick={() => router.push("/")}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        <Image
          src="https://links.papareact.com/qd3"
          alt="Logo"
          fill
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </div>

      <div className="flex items-center rounded-full py-2 md:border-2 md:shadow-md">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow bg-transparent pl-5 text-gray-600 placeholder-gray-400 outline-none"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <MagnifyingGlassIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex" />
      </div>

      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer md:inline">Airbnb your home</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 rounded-full border-2 p-2">
          <Bars3Icon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="col-span-3 mx-auto mt-2 flex flex-col">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className="mb-4 flex items-center border-b">
            <h2 className="flex-grow pl-2 text-2xl font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5" />
            <input
              className="w-12 pl-2 text-lg text-red-400 outline-none"
              type="number"
              value={numbOfGuests}
              onChange={(e) => setNumbOfGuests(e.target.valueAsNumber)}
              min={1}
            />
          </div>
          <div className="flex">
            <button className="flex-grow text-gray-500" onClick={resetInput}>
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
