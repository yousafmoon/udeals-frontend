"use client";
import Image from "next/image";

export default function BeautyProducts({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const hasData =
    d?.beautyProductsMainTitle ||
    d?.beautyProductsSubtitle ||
    (d?.beautyProductGrid && d.beautyProductGrid.length > 0);

  if (!hasData) return null;

  return (
    <section id="beauty-products" className="mb-16 px-4 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Beauty Products
        </h2>

        {d?.beautyProductsMainTitle && (
          <h3 className="text-5xl sm:text-6xl md:text-7xl max-w-3xl mx-auto font-marcellus text-black mt-16">
            {d.beautyProductsMainTitle}
          </h3>
        )}

        {d?.beautyProductsSubtitle && (
          <p className="text-2xl sm:text-3xl md:text-5xl text-black font-dmsans mb-16 max-w-3xl mx-auto mt-2">
            {d.beautyProductsSubtitle}
          </p>
        )}
      </div>

      {d?.beautyProductGrid?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {d.beautyProductGrid.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border border-[#9D957D] rounded-[10px] overflow-hidden bg-[#F8F3E7]"
            >
              <div className="p-4">
                {item?.beautyProductCategory && (
                  <p className="text-lg font-dmsans text-black bg-[#F0E8D2] px-6 py-2 rounded-full inline-block uppercase mb-1">
                    {item.beautyProductCategory}
                  </p>
                )}

                {item?.beautyProductTitle && (
                  <h4 className="text-2xl sm:text-3xl font-medium font-lexend-deca text-black mb-1">
                    {item.beautyProductTitle}
                  </h4>
                )}

                {item?.beautyProductDescription && (
                  <p
                    className="text-sm font-light text-[#6C6C6C] lexend-deca mb-2"
                    dangerouslySetInnerHTML={{
                      __html: item.beautyProductDescription,
                    }}
                  ></p>
                )}

                {item?.beautyProductPrice && (
                  <p className="text-lg sm:text-xl md:text-2xl text-white font-dmsans py-2 px-5 inline-block font-bold bg-[#4D3F17] rounded-sm">
                    {item.beautyProductPrice}
                  </p>
                )}
              </div>

              {item?.beautyProductImage?.sourceUrl && (
                <div className="relative w-full flex justify-center items-center">
                  <Image
                    src={item.beautyProductImage.sourceUrl}
                    alt={item.beautyProductTitle || `Product ${idx + 1}`}
                    width={140}
                    height={270}
                    className="object-cover mx-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
