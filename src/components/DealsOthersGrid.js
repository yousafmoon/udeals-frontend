import Link from "next/link";

export default function DealsOthersGrid({ title, deals, columns = 4 }) {
  return (
    <section className="container px-4 sm:px-6 md:px-10 mx-auto pt-12 sm:pt-14 md:pt-16">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {deals.map((deal, i) => (
          <div key={i} className="bg-white rounded shadow-sm">
            <Link href={`/deal/${deal.slug}`}>
              <img
                src={deal?.dealsHomepage?.image?.sourceUrl}
                alt={deal.title}
                className="mb-2 w-full h-[180px] sm:h-[200px] md:h-[211px] object-cover object-top rounded-t"
              />
            </Link>
            <div className="p-4 sm:p-5">
              <h3 className="text-base sm:text-lg font-extrabold font-lato line-clamp-1 text-black">
                {deal.dealsHomepage?.companyName}, {deal.dealsHomepage?.location}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {deal?.dealsHomepage?.description}
              </p>
              <p className="logo-color mt-2 font-extrabold text-sm sm:text-md">
                {deal?.dealsHomepage?.expireOn}
              </p>
              <h5 className="text-red-900 font-bold text-sm sm:text-md mt-2">
                AED {deal?.dealsHomepage?.discountPrice}
                <span className="text-gray-500 text-xs sm:text-sm ml-1 font-normal line-through">
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
    </section>
  );
}
