"use client";
import Image from "next/image";

export default function BeforeAfter({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const hasData =
    d?.beforeAfterMainTitle ||
    (d?.beforeAfterGallery && d.beforeAfterGallery.length > 0);

  if (!hasData) return null;

  return (
    <section id="before-after" className="mb-16">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Before / After
        </h2>

        {d?.beforeAfterMainTitle && (
          <h3 className="text-4xl max-w-xl mx-auto font-marcellus text-black mt-16">
            {d.beforeAfterMainTitle}
          </h3>
        )}
      </div>

      {d?.beforeAfterGallery?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {d.beforeAfterGallery.map((item: any, idx: number) => (
            <div
              key={idx}
              className="relative w-full h-[500px] overflow-hidden"
            >
              {item.beforeAfterImage?.sourceUrl && (
                <Image
                  src={item.beforeAfterImage.sourceUrl}
                  alt={`Before/After ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
