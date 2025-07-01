"use client";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function PhotoGallery({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasData =
    d?.photoGalleryMainTitle ||
    (d?.photoGalleryGrid && d.photoGalleryGrid.length > 0);

  if (!hasData) return null;

  return (
    <section id="photo-gallery" className="mb-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Photo Gallery
        </h2>

        {d?.photoGalleryMainTitle && (
          <h3 className="text-4xl max-w-xl mx-auto font-marcellus text-black mt-16">
            {d.photoGalleryMainTitle}
          </h3>
        )}
      </div>

      {d?.photoGalleryGrid?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {d.photoGalleryGrid.map((item: any, idx: number) => {
            const isEven = idx % 2 !== 0;
            const imageShape = isEven ? "rounded-full" : "rounded-none";
            const isOpen = activeIndex === idx;

            return (
              <div
                key={idx}
                className={clsx(
                  "relative group overflow-hidden w-full h-[475px]",
                  imageShape
                )}
                onClick={() => {
                  if (isMobile) {
                    setActiveIndex(isOpen ? null : idx);
                  }
                }}
              >
                {item.photoGalleryImage?.sourceUrl && (
                  <div className={clsx("relative w-full h-full", imageShape)}>
                    <Image
                      src={item.photoGalleryImage.sourceUrl}
                      alt={
                        item.photoGalleryImageTitle ||
                        `Gallery Image ${idx + 1}`
                      }
                      fill
                      className={clsx(
                        "object-cover transition-all duration-300",
                        imageShape
                      )}
                    />

                    <div
                      className={clsx(
                        "absolute inset-0 flex flex-col justify-center items-center px-4 text-center transition-opacity duration-300",
                        "bg-[#514216]/90 text-white",
                        imageShape,
                        {
                          "opacity-100": isMobile ? isOpen : false,
                          "opacity-0": isMobile ? !isOpen : true,
                          "group-hover:opacity-100": !isMobile,
                        }
                      )}
                    >
                      {item.photoGalleryImageTitle && (
                        <h4
                          className="font-marcellus text-[31px] mb-2"
                          style={{ fontWeight: 400 }}
                        >
                          {item.photoGalleryImageTitle}
                        </h4>
                      )}
                      {item.photoGalleryImageDescription && (
                        <p
                          className="font-dmsans text-[19px]"
                          style={{ fontWeight: 400 }}
                          dangerouslySetInnerHTML={{
                            __html: item.photoGalleryImageDescription || "",
                          }}
                        ></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
