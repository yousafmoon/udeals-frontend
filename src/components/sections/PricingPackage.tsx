"use client";
import Image from "next/image";

export default function PricingPackage({
  d,
  dealsHomepage,
}: {
  d: any;
  dealsHomepage: any;
}) {
  const hasData =
    d?.pricingPackageSectionBackground?.sourceUrl ||
    d?.packageMainTitle ||
    d?.packageMainSubtitle ||
    (d?.pricingPackage && d.pricingPackage.length > 0);

  if (!hasData) return null;

  return (
    <section
      id="pricing-package"
      className={`relative mb-16 px-4 md:px-8 pt-16 pb-30 overflow-hidden ${
        d?.pricingPackageSectionBackground?.sourceUrl ? "min-h-[500px]" : ""
      }`}
    >
      {d?.pricingPackageSectionBackground?.sourceUrl && (
        <>
          <Image
            src={d.pricingPackageSectionBackground.sourceUrl}
            alt="Pricing Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#F8F3E5]/90 z-0" />
        </>
      )}

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
          Pricing Package
        </h2>

        {d?.packageMainTitle && (
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black font-marcellus mt-10 max-w-3xl mx-auto">
            {d.packageMainTitle}
          </h3>
        )}

        {d?.packageMainSubtitle && (
          <p className="text-base sm:text-lg text-black font-dmsans mb-16 max-w-3xl mx-auto mt-4">
            {d.packageMainSubtitle}
          </p>
        )}
      </div>

      {d?.pricingPackage?.length > 0 && (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {d.pricingPackage.map((pkg: any, idx: number) => (
            <div
              key={idx}
              className="border border-[#9D957D] p-6 pb-10 transition-shadow"
            >
              <h3 className="text-2xl sm:text-3xl text-[#4D3F17] font-marcellus mb-6">
                {pkg.packageName}
              </h3>

              <p className="text-lg sm:text-xl font-dmsans text-[#4D3F17] mb-6">
                Price:{" "}
                <span className="text-2xl sm:text-3xl font-semibold font-dmsans text-[#4D3F17]">
                  {pkg.packagePrice}
                </span>
              </p>

              <div className="h-px w-full bg-[#9D957D] mb-5" />

              <h4 className="text-xl sm:text-2xl text-[#4D3F17] font-marcellus mb-2">
                {pkg.packageServiceTitle}
              </h4>

              <ul className="mb-4 list-none space-y-1 mt-7">
                {pkg.packageServiceList?.map((service: any, sidx: number) => (
                  <li
                    key={sidx}
                    className="flex items-start gap-2 text-gray-600"
                  >
                    <img
                      src="/icons/check-circle.svg"
                      alt="Check"
                      className="w-4 h-4 mt-1.5 flex-shrink-0"
                    />
                    <span className="font-dmsans text-sm sm:text-base text-[#4D3F17]">
                      {service.packageServiceName}
                    </span>
                  </li>
                ))}
              </ul>

              {pkg.bookAppointment && (
                <div className="flex justify-center mt-6">
                  <a
                    href={pkg.bookAppointment}
                    className="block w-full bg-[#685214] text-white px-5 py-2 font-dmsans text-base sm:text-xl text-center hover:bg-opacity-90 transition"
                  >
                    Book Appointment
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
