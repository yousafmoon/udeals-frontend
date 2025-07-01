"use client";

import DealServices from "./DealServices";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface DealServiceItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  showOnHomepage?: boolean;
  dealServices?: {
    iconImage?: {
      sourceUrl: string;
    };
  };
}

interface SearchBarProps {
  locations?: string[];
  services?: DealServiceItem[];
  small?: boolean;
}

export default function SearchBar({
  locations = [],
  services = [],
  small = false,
}: SearchBarProps) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchText) params.append("q", searchText);
    if (location) params.append("location", location);
    if (service) params.append("service", service);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative z-10 w-full">
      <form
        onSubmit={handleSubmit}
        className={`w-full ${
          small ? "mt-2" : "mt-8"
        } flex flex-col md:flex-row gap-4`}
      >
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white h-[52px] text-sm text-black placeholder:text-sm placeholder:text-black px-5 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="relative w-full">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none bg-white h-[52px] text-sm text-black px-4 pr-10 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Location</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        </div>

        <div className="relative w-full">
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="appearance-none bg-white h-[52px] text-sm text-black px-4 pr-10 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Categories</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-black h-[52px] text-white cursor-pointer px-8 py-3 w-full md:w-auto border border-gray-300 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black font-poppins"
        >
          Search
        </button>
      </form>

      {services.length > 0 && !small && <DealServices services={services} />}
    </div>
  );
}
