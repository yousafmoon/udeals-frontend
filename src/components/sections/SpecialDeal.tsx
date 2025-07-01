"use client";
import { useState } from "react";
import Image from "next/image";

export default function SpecialDeal({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggle = () => {
    const video = document.getElementById("dealVideo") as HTMLVideoElement;
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

  const hasContent =
    d?.dealImage?.sourceUrl ||
    d?.dealVideo?.mediaItemUrl ||
    d?.videoTitle ||
    d?.videoDescription ||
    d?.companyBanner?.sourceUrl;

  if (!hasContent) return null;

  return (
    <section id="special-deal" className="mb-16 px-4 sm:px-6">
      <h2 className="text-3xl text-black mb-6">
        Special <span className="font-bold">Deal</span>
      </h2>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 sm:gap-1">
        {d?.dealImage?.sourceUrl && (
          <div className="w-full md:w-[620px]">
            <Image
              src={d.dealImage.sourceUrl}
              alt="Deal Image"
              width={620}
              height={580}
              className="rounded-3xl object-cover w-full h-auto"
            />
          </div>
        )}

        <div className="flex flex-col w-full md:w-[800px]">
          {d?.dealVideo?.mediaItemUrl && (
            <div className="relative w-full h-[220px] sm:h-[300px] md:h-[425px]">
              <video
                id="dealVideo"
                className="w-full h-full object-cover rounded-t-3xl"
                onWaiting={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={d.dealVideo.mediaItemUrl} type="video/mp4" />
              </video>

              <button
                onClick={handleToggle}
                className="absolute inset-0 flex items-center justify-center text-white z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 bg-black bg-opacity-50 p-4 rounded-full"
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
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-0 rounded-t-3xl">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          )}

          {(d?.videoTitle || d?.videoDescription) && (
            <div className="w-full profile-video-bottom rounded-b-3xl px-3 py-4 flex flex-col sm:flex-row items-start gap-4">
              {dealsHomepage?.companyLogo?.sourceUrl && (
                <Image
                  src={dealsHomepage.companyLogo.sourceUrl}
                  alt="Company Logo"
                  width={120}
                  height={120}
                  className="rounded-full object-contain"
                />
              )}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {d?.videoTitle}
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  {d?.videoDescription || dealsHomepage?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {d?.companyBanner?.sourceUrl && (
        <div className="mt-4 relative w-full h-[220px] sm:h-[320px] md:h-[455px] border border-black rounded-3xl overflow-hidden">
          <Image
            src={d.companyBanner.sourceUrl}
            alt="Company Banner"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      )}
    </section>
  );
}
