"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export default function HomepageDealsSection({ dealCategories }) {
  return (
    <div className="pt-12 sm:pt-8 md:pt-16">
      {dealCategories?.map((category) => (
        <section
          key={category.slug}
          className="relative container px-4 sm:px-6 md:px-10 mx-auto"
        >
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black font-lexend-deca uppercase">
              {category.name}
            </h2>
            <div className="h-0.5 bg-logo-color w-full mx-auto mt-4 sm:mt-5 mb-6 sm:mb-8 rounded"></div>
          </div>

          <div className="relative group overflow-hidden">
            {/* Navigation arrows */}
            <div className="swiper-button-prev left-2 sm:left-3 top-1/2 absolute z-10 -translate-y-1/2 cursor-pointer select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white rounded-full p-1 shadow-md flex items-center justify-center">
                <img
                  src="/icons/left-circle.svg"
                  alt="Prev"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
            </div>

            <div className="swiper-button-next right-2 sm:right-3 top-1/2 absolute z-10 -translate-y-1/2 cursor-pointer select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white rounded-full p-1 shadow-md flex items-center justify-center">
                <img
                  src="/icons/right-circle.svg"
                  alt="Next"
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
            </div>

            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={12}
              loop
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              grabCursor={true}
              simulateTouch={true}
              touchStartPreventDefault={false}
              freeMode={true}
              pagination={{
                type: "progressbar",
                el: `.custom-swiper-pagination-${category.slug}`,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {category.deals.nodes.map((deal, index) => (
                <SwiperSlide
                  key={deal.id || deal.slug || `${deal.title}-${index}`}
                >
                  <div className="bg-white h-full rounded-b-sm shadow-sm">
                    <Link href={`/deal/${deal.slug}`}>
                      <img
                        src={deal.dealsHomepage?.image?.sourceUrl}
                        className="w-full h-[200px] sm:h-[220px] md:h-[240px] object-cover object-top rounded-t"
                        alt={deal.title}
                      />
                    </Link>
                    <div className="p-3">
                      <h3 className="text-md sm:text-lg font-extrabold font-lato line-clamp-1">
                        {deal.dealsHomepage?.companyName},{" "}
                        {deal.dealsHomepage?.location}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {deal.dealsHomepage?.description}
                      </p>
                      <p className="logo-color mt-2 font-extrabold text-sm sm:text-md">
                        {deal.dealsHomepage?.expireOn}
                      </p>
                      <h5 className="text-red-900 font-bold text-md mt-2">
                        AED {deal.dealsHomepage?.discountPrice}
                        <span className="text-gray-500 text-sm ml-1 font-normal line-through">
                          AED {deal.dealsHomepage?.origionalPrice}
                        </span>
                      </h5>
                      <p className="text-gray-400 text-xs mt-2">
                        <strong>Note:</strong> {deal.dealsHomepage?.note}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={`custom-swiper-pagination-${category.slug} mt-4`} />
          </div>

          <div className="text-center mt-6">
            <a
              href={
                category.dealCategorySettings?.viewAllUrl ||
                `/search?service=${category.slug}#results`
              }
              className="inline-flex items-center gap-2 text-sm sm:text-md px-6 py-3 sm:py-4 view-all-button-bg text-black hover:bg-opacity-90 transition font-poppins"
            >
              {category.dealCategorySettings?.viewAllButton ||
                `View All ${category.name}`}
              <img
                src="/icons/arrow_forward.svg"
                alt="forward"
                className="w-5 h-5"
              />
            </a>
          </div>
        </section>
      ))}
    </div>
  );
}
