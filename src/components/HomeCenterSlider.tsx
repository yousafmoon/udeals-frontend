"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

type Slide = {
  bannerCenterImage?: {
    sourceUrl: string;
  };
  bannerExternalLink?: string;
};

interface HomeCenterSliderProps {
  slides: Slide[];
  bannerCenterMainTitle?: string;
}

export default function HomeCenterSlider({
  slides,
  bannerCenterMainTitle,
}: HomeCenterSliderProps) {
  return (
    <div className="w-full section-bg mt-12 sm:mt-16">
      <div className="z-0 py-10 sm:py-14 md:py-16 container px-4 sm:px-6 md:px-10 mx-auto">
        {bannerCenterMainTitle && (
          <div className="mb-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-marcellus uppercase">
              {bannerCenterMainTitle}
            </h2>
          </div>
        )}

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.3,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
          }}
          className="w-full h-[240px] sm:h-[400px] md:h-[600px] lg:h-[1000px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {slide.bannerExternalLink ? (
                <a
                  href={slide.bannerExternalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={slide.bannerCenterImage?.sourceUrl || ""}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </a>
              ) : (
                <img
                  src={slide.bannerCenterImage?.sourceUrl || ""}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
