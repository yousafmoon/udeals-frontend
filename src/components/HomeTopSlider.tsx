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
    <div className="relative z-0 container px-4 sm:px-6 md:px-10 mx-auto">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[520px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.bannerImage?.sourceUrl || ""}
              alt={`Banner ${index + 1}`}
              className="w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[520px] 
             object-contain sm:object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
