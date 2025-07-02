"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Deal = {
  title: string;
  slug: string;
  dealsHomepage: {
    companyName?: string;
    location?: string;
    description?: string;
    expireOn?: string;
    discountPrice?: string;
    origionalPrice?: string;
    note?: string;
    image?: { sourceUrl: string };
    video?: { mediaItemUrl: string };
  };
};

interface DealsGridProps {
  title: string;
  deals: Deal[];
  slug: string;
  dealCategorySettings?: {
    viewAllUrl?: string;
    viewAllButton?: string;
  };
  columns?: number;
  styleType?: string;
}

export default function DealsGrid({
  title,
  deals,
  slug,
  dealCategorySettings,
  columns = 4,
  styleType = "default",
}: DealsGridProps) {
  const isProductStyle = styleType === "product";
  const router = useRouter();

  const handleViewAllClick = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("scrollToResults", "true");
    }
    router.push(
      dealCategorySettings?.viewAllUrl || `/search?service=${slug}#results`
    );
  };

  const getResponsiveCols = () => {
    switch (columns) {
      case 1:
        return "lg:grid-cols-1";
      case 2:
        return "lg:grid-cols-2";
      case 3:
        return "lg:grid-cols-3";
      default:
        return "lg:grid-cols-4";
    }
  };

  return (
    <section className="container px-4 sm:px-6 md:px-10 mx-auto pt-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-medium text-black font-lexend-deca uppercase">
          {title}
        </h2>
        <div className="h-[1.5px] bg-logo-color w-full mx-auto mt-5 mb-8 rounded"></div>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${getResponsiveCols()} gap-4`}
      >
        {deals.map((deal, i) => (
          <div
            key={i}
            className={`bg-white ${
              isProductStyle ? "border border-gray-200" : ""
            }`}
          >
            <Link href={`/deal/${deal.slug}`}>
              <img
                src={deal?.dealsHomepage?.image?.sourceUrl}
                alt={deal.title}
                className={`mb-2 w-full object-cover object-top rounded ${
                  isProductStyle ? "h-[350px]" : "h-[211px]"
                }`}
              />
            </Link>
            <div className="p-3">
              <h3 className="text-base sm:text-lg font-extrabold font-lato line-clamp-1">
                {deal.dealsHomepage?.companyName},{" "}
                {deal.dealsHomepage?.location}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {deal?.dealsHomepage?.description}
              </p>
              <p className="mt-2 font-extrabold text-sm text-logo-color">
                {deal?.dealsHomepage?.expireOn}
              </p>
              <h5
                className={`font-bold text-md mt-2 ${
                  isProductStyle ? "text-red-600" : "text-red-900"
                }`}
              >
                AED {deal?.dealsHomepage?.discountPrice}
                <span className="text-gray-500 text-sm ml-1 font-normal line-through">
                  AED {deal?.dealsHomepage?.origionalPrice}
                </span>
              </h5>
              <p className="text-gray-400 text-xs mt-2">
                <strong>Note:</strong> {deal?.dealsHomepage?.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleViewAllClick}
          className="inline-flex items-center cursor-pointer gap-2 section-bg text-md px-6 py-4 text-black hover:bg-opacity-90 transition font-poppins"
        >
          {dealCategorySettings?.viewAllButton || `View All ${title}`}
          <img
            src="/icons/arrow_forward.svg"
            alt="forward"
            className="w-5 h-5"
          />
        </button>
      </div>
    </section>
  );
}
