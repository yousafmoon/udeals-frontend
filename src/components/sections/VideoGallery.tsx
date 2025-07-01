"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function VideoGallery({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const handleVideoClick = (idx: number, isExternal: boolean) => {
    if (playingIndex === idx) {
      if (!isExternal) {
        const video = videoRefs.current[idx];
        if (video?.paused) {
          video?.play();
        } else {
          video?.pause();
        }
      } else {
        setPlayingIndex(null);
      }
    } else {
      setPlayingIndex(idx);
    }
  };

  const hasData =
    d?.videoGalleryMainTitle ||
    (d?.videoGalleryGrid && d.videoGalleryGrid.length > 0);

  if (!hasData) return null;

  return (
    <section id="video-gallery" className="mb-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Video Gallery
        </h2>

        {d?.videoGalleryMainTitle && (
          <h3 className="text-4xl max-w-xl mx-auto font-marcellus text-black mt-16">
            {d.videoGalleryMainTitle}
          </h3>
        )}
      </div>

      {d?.videoGalleryGrid?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          {d.videoGalleryGrid.map((video: any, idx: number) => {
            const isExternal = !!video.externalVideoLink;
            const poster = video?.videoPoster?.sourceUrl || "";
            const embedUrl = isExternal
              ? video.externalVideoLink.includes("watch?v=")
                ? video.externalVideoLink.replace("watch?v=", "embed/")
                : video.externalVideoLink
              : "";

            const isPlaying = playingIndex === idx;

            return (
              <div
                key={idx}
                className="relative w-full h-[450px] bg-black overflow-hidden group cursor-pointer"
                onClick={() => handleVideoClick(idx, isExternal)}
              >
                {isPlaying ? (
                  isExternal ? (
                    <iframe
                      key={`iframe-${idx}-${Date.now()}`}
                      src={`${embedUrl}?autoplay=1`}
                      title={`External Video ${idx + 1}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={video?.videoFile?.mediaItemUrl || ""}
                      poster={poster}
                      controls={false}
                      className="w-full h-full object-cover"
                      playsInline
                      autoPlay
                    />
                  )
                ) : (
                  <>
                    {poster ? (
                      <Image
                        src={poster}
                        alt={`Poster ${idx + 1}`}
                        width={480}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-sm">
                        No Poster Available
                      </div>
                    )}

                    <div className="absolute inset-0 flex justify-center items-center transition pointer-events-none">
                      <Image
                        src="/icons/video-red-icon.svg"
                        alt="Play"
                        width={60}
                        height={60}
                        className="opacity-90 group-hover:scale-110 transition"
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
