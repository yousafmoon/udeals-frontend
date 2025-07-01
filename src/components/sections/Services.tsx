"use client";
import Image from "next/image";

export default function Services({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const hasData =
    d?.servicesMainHeading ||
    d?.servicesBannerImage?.sourceUrl ||
    d?.servicesBannerHeading ||
    d?.servicesBannerDescription ||
    d?.servicesGridSectionTopHeading ||
    d?.servicesGrid?.length > 0;

  if (!hasData) return null;

  return (
    <section id="services">
      <div className="container px-4 sm:px-6 lg:px-10">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
            Services
          </h2>
        </div>

        <div className="flex justify-start mb-8">
          <div className="bg-white shadow-md rounded-full px-5 py-3">
            <h3 className="text-xl font-semibold logo-color inline-block">
              What We Do
            </h3>
          </div>
        </div>

        {d?.servicesMainHeading && (
          <div className="max-w-2xl mb-10 text-left">
            <h2 className="text-5xl font-semibold text-black font-lexend-deca">
              {d.servicesMainHeading}
            </h2>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-start gap-10 mt-10">
          <div className="relative w-full lg:w-[650px] h-[400px] sm:h-[500px] lg:h-[600px]">
            <Image
              src="/images/service-shape.svg"
              alt="Services Background"
              width={600}
              height={670}
              className="absolute inset-0 object-cover z-0 rounded-3xl"
            />

            <div className="absolute top-[80px] sm:top-[100px] left-8 sm:left-20 w-[250px] sm:w-[300px] h-[300px] sm:h-[350px] services-box rounded-3xl z-10" />

            {d?.servicesBannerImage?.sourceUrl && (
              <div className="absolute top-[120px] sm:top-[150px] left-[80px] sm:left-[130px] rounded-2xl overflow-hidden z-20">
                <Image
                  src={d.servicesBannerImage.sourceUrl}
                  alt="Banner Image"
                  width={350}
                  height={390}
                  className="object-cover rounded-3xl"
                />
              </div>
            )}
          </div>

          <div className="flex-1 max-w-2xl mt-10 lg:mt-20">
            {d?.servicesBannerHeading && (
              <h3 className="text-4xl sm:text-5xl font-semibold font-lexend-deca text-black mb-4">
                {d.servicesBannerHeading}
              </h3>
            )}
            {d?.servicesBannerDescription && (
              <div
                className="text-gray-700 text-base leading-relaxed font-poppins font-medium"
                dangerouslySetInnerHTML={{
                  __html: d.servicesBannerDescription,
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="section-bg py-10">
        <div className="container px-4 sm:px-6 lg:px-10">
          <h4 className="text-center font-medium text-xl font-lexend-deca">
            Service you want
          </h4>

          {d?.servicesGridSectionTopHeading && (
            <div className="flex justify-center mt-10">
              <div className="text-center max-w-3xl">
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-marcellus text-black">
                  {d.servicesGridSectionTopHeading}
                </h3>
              </div>
            </div>
          )}

          {d?.servicesGrid?.length > 0 && (
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {d.servicesGrid.map((item: any, idx: number) => (
                <div key={idx} className="relative bg-white overflow-hidden">
                  {item?.serviceImage?.sourceUrl && (
                    <div className="relative h-[200px] sm:h-[244px] mb-4">
                      <Image
                        src={item.serviceImage.sourceUrl}
                        alt={item.serviceTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="pt-1 px-4 pb-10 relative min-h-[300px]">
                    <h4 className="text-2xl font-semibold mb-2 text-black font-marcellus">
                      {item.serviceTitle}
                    </h4>

                    <p
                      className="text-black mb-3 font-poppins"
                      dangerouslySetInnerHTML={{
                        __html: item.serviceDescription,
                      }}
                    ></p>

                    {item.serviceList?.length > 0 && (
                      <ul className="list-none list-inside text-sm text-black space-y-1">
                        {item.serviceList.map(
                          (listItem: any, listIdx: number) => (
                            <li key={listIdx} className="font-poppins">
                              <span className="text-gold-500 mr-1 font-poppins">
                                →
                              </span>{" "}
                              {listItem.serviceName}
                            </li>
                          )
                        )}
                      </ul>
                    )}

                    <div className="absolute bottom-1 right-2 count-color text-7xl font-poppins">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
