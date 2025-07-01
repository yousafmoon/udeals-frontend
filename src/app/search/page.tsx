"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import DealListings from "@/components/DealListings";
import Header from "@/components/Header";
import ListingsControls from "@/components/ListingsControls";
import { request } from "graphql-request";
import { HOMEPAGE_ALL_SECTIONS_QUERY } from "@/lib/queries";

const endpoint = "https://ujz.cuf.temporary.site/udeals/graphql";

type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
};

type DealService = {
  id: string;
  name: string;
  slug: string;
  count: number;
};

type Deal = {
  id: string;
  title: string;
  slug: string;
  dealsHomepage?: {
    companyName?: string;
    location?: string;
    description?: string;
    discountPrice?: string;
    origionalPrice?: string;
    address?: string;
    phone?: number;
    email?: string;
    companyLogo?: {
      sourceUrl: string;
    };
    image?: {
      sourceUrl: string;
    };
  };
  dealServices?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
};

type Banner = {
  id: string;
  title?: string;
  imageUrl: string;
  link?: string;
};

type GraphQLResponse = {
  acfOptionsThemeOptions?: {
    ThemeOptions?: ThemeOptions;
  };
  dealServices?: {
    nodes: DealService[];
  };
  deals?: {
    nodes: {
      dealsHomepage?: {
        location?: string;
      };
    }[];
  };
};

export default function SearchPage() {
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("q") || "";
  const urlLocation = searchParams.get("location") || "";
  const urlService = searchParams.get("service") || "";

  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [themeOptions, setThemeOptions] = useState<ThemeOptions | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [services, setServices] = useState<DealService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [banners, setBanners] = useState<Banner[]>([]);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedListing, setSelectedListing] = useState("");

  const displaySearch = urlSearch;
  const displayLocation = urlLocation;
  const displayService = urlService.replace(/-/g, " ");

  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchSearchAndBanners() {
      try {
        const [searchRes, bannerRes] = await Promise.all([
          fetch(
            `/api/search?q=${urlSearch}&location=${urlLocation}&service=${urlService}`
          ),
          fetch(`/api/banners?service=${urlService}`),
        ]);

        const searchData = await searchRes.json();
        const bannerData = await bannerRes.json();

        const dealsData = Array.isArray(searchData) ? searchData : [];
        setDeals(dealsData);
        setFilteredDeals(dealsData);
        setBanners(Array.isArray(bannerData) ? bannerData : []);

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } catch (error) {
        console.error("Error fetching search or banners:", error);
        setDeals([]);
        setFilteredDeals([]);
        setBanners([]);
      }
    }

    fetchSearchAndBanners();
  }, [urlSearch, urlLocation, urlService]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("scrollToResults") === "true"
    ) {
      sessionStorage.removeItem("scrollToResults");
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, []);

  useEffect(() => {
    async function fetchGraphQLData() {
      try {
        const data: GraphQLResponse = await request(
          endpoint,
          HOMEPAGE_ALL_SECTIONS_QUERY
        );

        const extractedThemeOptions =
          data.acfOptionsThemeOptions?.ThemeOptions || {};
        const allLocations =
          data.deals?.nodes
            ?.map((node) => node?.dealsHomepage?.location)
            .filter((loc): loc is string => Boolean(loc)) || [];

        const uniqueLocations = Array.from(new Set(allLocations));

        setThemeOptions(extractedThemeOptions);
        setLocations(uniqueLocations);
        setServices(data?.dealServices?.nodes || []);
      } catch (error) {
        console.error("GraphQL fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGraphQLData();
  }, []);

  const handleSortChange = (type: string, value: string) => {
    if (!value) {
      setFilteredDeals(deals);
      return;
    }

    let sorted = [...deals];
    switch (type) {
      case "location":
        setSelectedLocation(value);
        sorted = sorted.filter((d) => d.dealsHomepage?.location === value);
        break;
      case "services":
        setSelectedService(value);
        sorted = sorted.filter((d) =>
          d.dealServices?.nodes.some((s) => s.name === value)
        );
        break;
      case "listing":
        setSelectedListing(value);
        if (value === "newest") {
          sorted = sorted.reverse();
        } else if (value === "price_asc") {
          sorted.sort(
            (a, b) =>
              parseFloat(a.dealsHomepage?.discountPrice || "0") -
              parseFloat(b.dealsHomepage?.discountPrice || "0")
          );
        } else if (value === "price_desc") {
          sorted.sort(
            (a, b) =>
              parseFloat(b.dealsHomepage?.discountPrice || "0") -
              parseFloat(a.dealsHomepage?.discountPrice || "0")
          );
        }
        break;
    }

    setFilteredDeals(sorted);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-b-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        variant="compact"
        options={themeOptions || {}}
        locations={locations}
        services={services}
        banners={banners}
      />

      <ListingsControls
        locations={locations}
        services={services.map((s) => s.name)}
        selectedLocation={selectedLocation}
        selectedService={selectedService}
        selectedListing={selectedListing}
        onSortChange={handleSortChange}
        onLayoutChange={setLayout}
      />

      <div
        ref={resultsRef}
        className="container px-4 sm:px-6 md:px-10 mx-auto py-8"
      >
        <h2 className="text-3xl sm:text-xl md:text-5xl text-center font-medium text-black font-lexend-deca uppercase leading-tight">
          Search Results for:{" "}
          <span className="font-marcellus logo-color block sm:inline text-3xl sm:text-xl md:text-5xl">
            {displaySearch || displayService || displayLocation ? (
              <>
                {displaySearch && <>{displaySearch}</>}
                {displaySearch && displayService && " "}
                {displayService && <>{displayService}</>}
                {(displaySearch || displayService) && displayLocation && " in "}
                {displayLocation && (
                  <span className="logo-color">{displayLocation}</span>
                )}
              </>
            ) : (
              "All Deals"
            )}
          </span>
        </h2>
        <div className="h-[2px] bg-logo-color w-full mx-auto mt-4 sm:mt-5 mb-6 sm:mb-8"></div>

        {filteredDeals.length > 0 ? (
          <DealListings
            deals={filteredDeals}
            layout={layout}
            itemsPerPage={8}
          />
        ) : (
          <p className="text-center w-full font-semibold text-lg sm:text-xl mt-6 sm:mt-8 px-2">
            No results found for your search.
          </p>
        )}
      </div>
    </>
  );
}
