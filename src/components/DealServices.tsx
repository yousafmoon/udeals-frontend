"use client";

import Link from "next/link";

interface DealServiceIcon {
  sourceUrl: string;
}

interface DealServiceInner {
  iconImage?: DealServiceIcon;
  showOnHomepage?: boolean;
}

interface DealServiceItem {
  id: string;
  name: string;
  count: number;
  slug: string;
  dealServices?: DealServiceInner;
}

interface DealServicesProps {
  services: DealServiceItem[];
}

export default function DealServices({ services = [] }: DealServicesProps) {
  const normalizedServices = services.map((term) => ({
    ...term,
    dealServices: {
      ...term.dealServices,
      showOnHomepage: !!term.dealServices?.showOnHomepage,
    },
  }));

  const filteredServices = normalizedServices.filter(
    (term) => term.dealServices.showOnHomepage === true
  );

  return (
    <div className="relative z-10 w-full px-4">
      <div className="max-w-4xl w-full mx-auto px-2 sm:px-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-4 lg:grid-cols-6 md:overflow-visible">
          {filteredServices.map((term) => (
            <Link
              key={term.id}
              href={`/search?service=${encodeURIComponent(term.name)}#results`}
              onClick={() => {
                if (typeof window !== "undefined") {
                  sessionStorage.setItem("scrollToResults", "true");
                }
              }}
              className="flex-shrink-0 md:flex-shrink md:flex-grow-0 flex flex-col items-center justify-center text-center hover:opacity-80 transition min-w-[100px]"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 bg-white border border-gray-300 rounded-full flex items-center justify-center text-black text-sm font-semibold">
                {term.dealServices?.iconImage?.sourceUrl ? (
                  <img
                    src={term.dealServices.iconImage.sourceUrl}
                    alt={term.name}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                ) : (
                  term.name.charAt(0)
                )}
              </div>
              <span className="text-white text-sm sm:text-base font-semibold leading-snug">
                {term.name.replace(/ ?Deals/i, "")}
              </span>
              <span className="mt-1 px-3 sm:px-4 py-0.5 sm:py-1 font-medium text-lg sm:text-xl bg-black text-yellow-400 rounded-full">
                {term.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
