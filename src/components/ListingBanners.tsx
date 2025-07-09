"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  bannerLink?: string;
}

interface ListingBannersProps {
  banners: Banner[];
}

export default function ListingBanners({ banners }: ListingBannersProps) {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="mt-6 relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={16}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="rounded overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {banner.bannerLink ? (
              <a
                href={banner.bannerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title || "Banner"}
                  className="w-full 
                            h-[220px] 
                            sm:h-[300px] 
                            md:h-[360px] 
                            lg:h-[420px] 
                            xl:h-[480px] 
                            object-contain 
                            sm:object-cover 
                            rounded-2xl"
                />
              </a>
            ) : (
              <img
                src={banner.imageUrl}
                alt={banner.title || "Banner"}
                className="w-full 
                   h-[220px] 
                            sm:h-[280px] 
                            md:h-[360px] 
                            lg:h-[420px] 
                            xl:h-[480px] 
                            object-contain 
                            sm:object-cover 
                            rounded-2xl"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev absolute left-3 top-1/2 z-10 -translate-y-1/2 hidden md:flex cursor-pointer select-none">
        <div className="section-bg rounded-full p-1 shadow-md flex items-center justify-center">
          <img
            src="/icons/left-circle.svg"
            alt="Prev"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>
      </div>

      <div className="swiper-button-next absolute right-3 top-1/2 z-10 -translate-y-1/2 hidden md:flex cursor-pointer select-none">
        <div className="section-bg rounded-full p-1 shadow-md flex items-center justify-center">
          <img
            src="/icons/right-circle.svg"
            alt="Next"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>
      </div>
    </div>
  );
}
