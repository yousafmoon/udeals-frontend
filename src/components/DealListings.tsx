import React, { useState } from "react";
import Link from "next/link";

interface Deal {
  id?: string;
  slug?: string;
  title: string;
  dealServices?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  dealsHomepage?: {
    location?: string;
    description?: string;
    image?: { sourceUrl: string };
    displayAsVideo?: boolean;
    video?: { mediaItemUrl: string };
    poster?: { mediaItemUrl: string };
    discountPrice?: string;
    origionalPrice?: string;
    address?: string;
    phone?: number;
    email?: string;
  };
}

interface DealListingsProps {
  deals?: Deal[];
  layout?: "grid" | "list";
  itemsPerPage?: number;
}

export default function DealListings({
  deals = [],
  layout = "grid",
  itemsPerPage = 8,
}: DealListingsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(deals.length / itemsPerPage);

  const paginatedDeals = deals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (!Array.isArray(deals)) return null;

  return (
    <>
      <ul
        className={`gap-6 justify-center ${
          layout === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }`}
      >
        {paginatedDeals.map((deal) => {
          const isVideoDisplay =
            deal.dealsHomepage?.displayAsVideo &&
            !!deal.dealsHomepage?.video?.mediaItemUrl;
          const videoSrc =
            deal.dealsHomepage?.video?.mediaItemUrl?.replace(
              /^http:/,
              "https:"
            ) || "";
          const posterSrc =
            deal.dealsHomepage?.poster?.mediaItemUrl ||
            deal.dealsHomepage?.image?.sourceUrl ||
            "";
          const imageUrl = deal.dealsHomepage?.image?.sourceUrl;

          return (
            <li
              key={deal.id || deal.slug}
              className={`bg-white rounded-xl shadow-md overflow-hidden ${
                layout === "list" ? "flex flex-col sm:flex-row" : ""
              }`}
            >
              <div className={`${layout === "list" ? "sm:w-1/3" : "relative"}`}>
                {deal.dealsHomepage?.displayAsVideo &&
                deal.dealsHomepage?.video?.mediaItemUrl ? (
                  <Link href={`/deal/${deal.slug}`}>
                    <video
                      src={deal.dealsHomepage.video.mediaItemUrl.replace(
                        /^http:/,
                        "https:"
                      )}
                      controls
                      poster={
                        deal.dealsHomepage.poster?.mediaItemUrl ||
                        deal.dealsHomepage.image?.sourceUrl ||
                        ""
                      }
                      className="w-full h-[300px] object-cover"
                    />
                  </Link>
                ) : deal.dealsHomepage?.image?.sourceUrl ? (
                  <Link href={`/deal/${deal.slug}`}>
                    <img
                      src={deal.dealsHomepage.image.sourceUrl}
                      alt={deal.title}
                      className="w-full h-[300px] object-cover"
                    />
                  </Link>
                ) : (
                  <p></p>
                )}

                {layout === "grid" && deal.dealServices?.nodes?.[0]?.name && (
                  <Link
                    href={`/search?service=${encodeURIComponent(
                      deal.dealServices.nodes[0].slug
                    )}`}
                    className="absolute bottom-2 py-2 right-4 bg-black uppercase border border-yellow-700 logo-color text-sm font-semibold px-3 rounded-sm"
                  >
                    {deal.dealServices.nodes[0].name}
                  </Link>
                )}
              </div>

              <div className={`p-6 ${layout === "list" ? "sm:w-2/3" : ""}`}>
                <div className="flex flex-row flex-wrap items-center gap-1">
                  <h3 className="text-md font-bold mb-1 ml-0.5">
                    {deal.title}
                  </h3>
                  {deal.dealsHomepage?.location && (
                    <span className="text-sm text-black ml-1">
                      {deal.dealsHomepage.location}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 items-start mt-2">
                  {deal.dealsHomepage?.address && (
                    <>
                      <svg
                        width="20"
                        height="20"
                        fill="black"
                        viewBox="0 0 24 24"
                        className="shrink-0"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                      </svg>
                      <p className="text-sm text-gray-700">
                        {deal.dealsHomepage.address}
                      </p>
                    </>
                  )}

                  {deal.dealsHomepage?.phone && (
                    <>
                      <img
                        src="/icons/phone-listing.svg"
                        alt="Phone"
                        className="w-4 h-4 self-center ml-0.5"
                      />
                      <p className="text-sm text-gray-700">
                        {deal.dealsHomepage.phone}
                      </p>
                    </>
                  )}

                  {deal.dealsHomepage?.email && (
                    <>
                      <img
                        src="/icons/email-listing.svg"
                        alt="Email"
                        className="w-4 h-4 self-center ml-0.5"
                      />
                      <p className="text-sm text-gray-700">
                        {deal.dealsHomepage.email}
                      </p>
                    </>
                  )}
                </div>

                {deal.dealsHomepage?.description && (
                  <p className="text-sm text-gray-700 mt-2">
                    {deal.dealsHomepage.description}
                  </p>
                )}

                {(deal.dealsHomepage?.discountPrice ||
                  deal.dealsHomepage?.origionalPrice) && (
                  <div className="mt-2 text-sm text-red-800 font-semibold">
                    {deal.dealsHomepage?.discountPrice && (
                      <>AED {deal.dealsHomepage.discountPrice}</>
                    )}
                    {deal.dealsHomepage?.origionalPrice && (
                      <span className="ml-2 line-through text-gray-400">
                        AED {deal.dealsHomepage.origionalPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2 text-sm font-medium items-center">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => changePage(index + 1)}
              className={`px-3 py-1 cursor-pointer ${
                currentPage === index + 1 ? "bg-black text-white rounded" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1 cursor-pointer disabled:opacity-50"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
