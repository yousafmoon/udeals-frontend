'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function DealsVideoGrid({ dealCategories }) {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="pt-12 sm:pt-14 md:pt-16">
      {dealCategories.map((category) => (
        <section key={category.slug}>
          {/* Header */}
          <div className="container px-4 sm:px-6 md:px-10 mx-auto mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-black font-lexend-deca uppercase">
              {category.name}
            </h2>
            <div className="h-[1.5px] bg-logo-color w-full mx-auto mt-4 sm:mt-5 mb-6 sm:mb-8 rounded"></div>
          </div>

          {/* Video Grid */}
          <div className="w-full section-bg py-8 sm:py-10">
            <div className="container px-4 sm:px-6 md:px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {category.deals?.nodes?.map((deal, index) => (
                <VideoCard
                  key={deal.id || deal.slug || `${deal.title}-${index}`}
                  videoUrl={deal.dealsHomepage?.video?.mediaItemUrl}
                  title={deal.dealsHomepage?.companyName || deal.title}
                  description={deal.dealsHomepage?.description}
                  posterUrl={deal.dealsHomepage?.poster?.mediaItemUrl}
                  id={deal.id || index}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-6 container px-4 sm:px-6 md:px-10 mx-auto">
              <a
                href={category.dealCategorySettings?.viewAllUrl || `/search?service=${category.slug}`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem("scrollToResults", "true");
                  }
                }}
                className="inline-flex items-center gap-2 bg-white text-sm sm:text-md px-5 sm:px-6 py-3 sm:py-4 text-black hover:bg-opacity-90 transition font-poppins"
              >
                {category.dealCategorySettings?.viewAllButton || `View All ${category.name}`}
                <img src="/icons/arrow_forward.svg" alt="forward" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function VideoCard({ videoUrl, title, description, posterUrl, id, activeVideo, setActiveVideo }) {
  const videoRef = useRef(null);
  const [hasHovered, setHasHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const isActive = activeVideo === id;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.play();
      setHasPlayedOnce(true);
    } else {
      video.pause();
    }
  }, [isActive]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleMouseEnter = () => setHasHovered(true);
  const handleMouseLeave = () => setHasHovered(false);
  const togglePlayback = () => setActiveVideo(isActive ? null : id);

  const showIcon =
    !hasMounted ||
    isActive ||
    hasHovered ||
    (!isActive && !hasPlayedOnce);

  return (
    <div className="relative mb-4">
      {videoUrl ? (
        <div
          className="relative group rounded overflow-hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlayback}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            className="w-full h-[200px] sm:h-[240px] md:h-[300px] object-cover rounded"
            playsInline
            muted
          />
          <button
            type="button"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
              showIcon ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={isActive ? '/icons/pause-black.svg' : '/icons/video-black-icon.svg'}
              alt={isActive ? 'Pause' : 'Play'}
              width={40}
              height={40}
              className="opacity-90"
            />
          </button>
        </div>
      ) : (
        <p className="text-sm text-red-500 mb-2">No video available</p>
      )}

      <h3 className="text-base sm:text-lg font-extrabold font-lato text-black mt-3">{title}</h3>
      <p className="text-sm sm:text-base text-black mt-1">{description}</p>
    </div>
  );
}
