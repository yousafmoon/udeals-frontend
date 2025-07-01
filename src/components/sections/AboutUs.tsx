"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function AboutUs({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = () => {
    const video = document.getElementById("aboutUsVideo") as HTMLVideoElement;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const hasAboutUsContent =
    d?.aboutusHeading ||
    d?.aboutusDescription ||
    (d?.aboutusRightSection && d.aboutusRightSection.length > 0) ||
    d?.aboutusWrapperTitle ||
    d?.aboutusWrapperButton ||
    d?.aboutusWrapperDescription ||
    d?.aboutusWrapperVideo?.mediaItemUrl ||
    d?.teamDescription ||
    d?.teamImage?.sourceUrl ||
    d?.ourTeamSection?.ourTeamMainTitle ||
    (d?.ourTeamSection?.teamSlider && d.ourTeamSection.teamSlider.length > 0);

  if (!hasAboutUsContent) return null;

  return (
    <section id="about-us" className="mb-16">
      <div className="container px-4 sm:px-6 md:px-10 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
            About us
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex-1 space-y-4">
            <div className="bg-white shadow-md rounded-full px-5 py-3 w-max">
              <h3 className="text-xl font-semibold logo-color">Who We Are</h3>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-lexend-deca font-semibold">
              {d?.aboutusHeading}
            </h2>

            <div
              className="text-gray-700 space-y-2 font-poppins"
              dangerouslySetInnerHTML={{ __html: d?.aboutusDescription || "" }}
            />
          </div>

          <div className="flex-1 space-y-4">
            {d?.aboutusRightSection?.map((item: any, index: number) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="flex justify-between items-center p-4">
                    <span className="text-lg font-semibold font-lexend-deca">
                      {item.aboutusRightTitle}
                    </span>
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="bg-black p-2 rounded-full"
                      aria-label="Toggle accordion"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 text-white transform transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className="px-4 pb-4 text-gray-700 font-poppins"
                      dangerouslySetInnerHTML={{
                        __html: item.aboutusRightDescription || "",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {(d?.aboutusWrapperTitle ||
        d?.aboutusWrapperButton ||
        d?.aboutusWrapperDescription ||
        d?.aboutusWrapperVideo?.mediaItemUrl) && (
        <div className="mt-16 bg-about-gradient w-full">
          <div className="container px-4 sm:px-6 md:px-10 mx-auto flex flex-col md:flex-row">
            <div className="flex-[1.5] pt-12 pb-6 pr-0 md:pr-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h3 className="text-3xl sm:text-5xl md:text-7xl font-medium text-white font-lexend-deca shadow-custom-sm">
                  {d?.aboutusWrapperTitle}
                </h3>
                {d?.aboutusWrapperButton && (
                  <button className="px-6 py-3 bg-white text-lg logo-color rounded-full font-lexend-deca whitespace-nowrap">
                    {d?.aboutusWrapperButton}
                  </button>
                )}
              </div>

              <div
                className="mt-6 text-white text-md font-lexend-deca font-medium"
                dangerouslySetInnerHTML={{
                  __html: d?.aboutusWrapperDescription || "",
                }}
              />
            </div>

            <div className="flex-1 px-4 py-8">
              {d?.aboutusWrapperVideo?.mediaItemUrl && (
                <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] overflow-hidden">
                  <video
                    id="aboutUsVideo"
                    className="w-full h-full object-cover"
                    onWaiting={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onLoadedData={() => setIsLoading(false)}
                  >
                    <source
                      src={d.aboutusWrapperVideo.mediaItemUrl}
                      type="video/mp4"
                    />
                  </video>

                  <button
                    onClick={handleToggle}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-14 h-14 bg-red-600 bg-opacity-60 p-2 rounded-full text-white"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      {isPlaying ? (
                        <path d="M5.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5z" />
                      ) : (
                        <path d="M6 4.5v7l6-3.5-6-3.5z" />
                      )}
                    </svg>
                  </button>

                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-0">
                      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(d?.teamDescription || d?.teamImage?.sourceUrl) && (
        <div className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-full inline-block px-8 py-2 text-center font-lexend-deca">
                <h3 className="text-xl font-semibold text-black">Our Team</h3>
              </div>
              <div
                className="text-white mt-4 font-lexend-deca text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: d?.teamDescription || "" }}
              />
            </div>

            <div className="flex-1 relative w-full max-w-md mx-auto md:mx-0">
              <div className="absolute -top-4 left-4 w-full h-full border-2 border-logo-color rounded-tl-[20px] rounded-bl-[20px] z-0" />
              {d?.teamImage?.sourceUrl && (
                <Image
                  src={d.teamImage.sourceUrl}
                  alt="Team"
                  width={500}
                  height={450}
                  className="relative z-10 object-cover rounded-tl-[20px] rounded-bl-[20px] w-full"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {d?.ourTeamSection?.teamSlider?.length > 0 && (
        <div className="overflow-x-hidden">
          <div className="pb-20 pt-16 mt-8 section-bg rounded-[20px] mx-4 sm:mx-6 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
              {d?.ourTeamSection?.ourTeamMainTitle && (
                <h3
                  className="text-3xl sm:text-3xl md:text-7xl text-center font-lexend-deca font-semibold text-black mb-8"
                  dangerouslySetInnerHTML={{
                    __html: d.ourTeamSection.ourTeamMainTitle,
                  }}
                />
              )}

              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={4.2}
                navigation={{
                  nextEl: ".team-slider-next",
                  prevEl: ".team-slider-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1.2 },
                  768: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3.2 },
                  1280: { slidesPerView: 4.2 },
                }}
                className="!overflow-visible"
              >
                {d.ourTeamSection.teamSlider.map(
                  (member: any, index: number) => (
                    <SwiperSlide key={index} className="!overflow-visible">
                      <div className="bg-white rounded-xl shadow-xs overflow-visible h-full">
                        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4">
                          <Image
                            src={
                              member.profileImage?.sourceUrl ||
                              "/placeholder.jpg"
                            }
                            alt={member.teamMemberName}
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div className="px-4 pt-1 pb-4">
                          <h4 className="text-xl font-semibold text-left text-black font-lexend-deca">
                            {member.teamMemberName}
                          </h4>
                          <p className="text-sm text-left text-gray-600 font-lexend-deca">
                            {member.designation}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>

              <div className="absolute -left-0 -bottom-15 flex gap-4 z-10">
                <button className="team-slider-prev bg-black text-white p-2 rounded-full hover:bg-logo-color transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer w-5 h-5"
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
                </button>
                <button className="team-slider-next bg-black text-white p-2 rounded-full hover:bg-logo-color transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer w-5 h-5"
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
