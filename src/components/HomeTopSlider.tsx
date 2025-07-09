"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

type Slide = {
  bannerImage?: {
    sourceUrl: string;
  };
};

interface HomeTopSliderProps {
  slides: Slide[];
}

export default function HomeTopSlider({ slides }: HomeTopSliderProps) {
  return (
    <div className="relative z-0 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full aspect-[2.77]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.bannerImage?.sourceUrl || ""}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-contain sm:object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
