"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import ListingBanners from "./ListingBanners";
import type { DealServiceItem } from "./SearchBar";
import Link from "next/link";

interface Banner {
  id: string;
  imageUrl: string;
  link?: string;
  title?: string;
  bannerLink?: string;
}

interface HeaderProps {
  variant?: "default" | "compact" | "profile" | "general";
  options: {
    headerBackground?: { sourceUrl: string };
    headerLogo?: { sourceUrl: string; title?: string };
    headerSlogan?: string;
  };
  locations?: string[];
  services?: DealServiceItem[];
  banners?: Banner[];
  menuItems?: { label: string; url: string }[];
  profileInfo?: {
    companyName?: string;
    companyLogo?: { sourceUrl: string };
    address?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  pageTitle?: string;
}

export default function Header({
  variant = "default",
  options,
  locations = [],
  services = [],
  banners = [],
  menuItems = [],
  profileInfo,
  pageTitle,
}: HeaderProps) {
  const isCompact = variant === "compact";
  const isProfile = variant === "profile";
  const isGeneral = variant === "general";

  const scrollToAbout = () => {
    const el = document.getElementById("about-us");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`relative bg-no-repeat bg-center bg-cover w-full text-white ${
        isCompact
          ? "h-[650px]"
          : isProfile
            ? "h-[630px]"
            : isGeneral
              ? "h-[300px]"
              : "h-[550px]"
      }`}
      style={{
        backgroundImage: options?.headerBackground?.sourceUrl
          ? `url(${options.headerBackground.sourceUrl})`
          : "none",
      }}
    >
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-black opacity-[0.77]"></div>
        <div className="w-1/2 bg-black opacity-[0.85]"></div>
      </div>

      <div className="relative z-10 container px-4 sm:px-6 md:px-10 mx-auto py-4">
        {isCompact ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                {options?.headerLogo?.sourceUrl && (
                  <Link href="/">
                    <Image
                      src={options.headerLogo.sourceUrl}
                      alt={options.headerLogo.title || "Header Logo"}
                      width={320}
                      height={65}
                      className="h-auto w-full max-w-[200px] sm:max-w-[300px] md:max-w-[320px] cursor-pointer"
                    />
                  </Link>
                )}
                {options?.headerSlogan && (
                  <p className="text-sm px-1 text-center">
                    {options.headerSlogan}
                  </p>
                )}
              </div>
              <div className="w-full md:flex-1 mt-4 md:mt-0">
                <SearchBar
                  locations={locations}
                  services={services}
                  small={isCompact}
                />
              </div>
            </div>
            {banners?.length > 0 && <ListingBanners banners={banners} />}
          </div>
        ) : isProfile ? (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex flex-col items-center">
                {options?.headerLogo?.sourceUrl && (
                  <Link href="/">
                    <Image
                      src={options.headerLogo.sourceUrl}
                      alt={options.headerLogo.title || "Header Logo"}
                      width={300}
                      height={80}
                      className="h-auto w-full sm:max-w-[300px] cursor-pointer"
                    />
                  </Link>
                )}
                {options?.headerSlogan && (
                  <p className="text-sm text-center">{options.headerSlogan}</p>
                )}
              </div>

              {menuItems.length > 0 && (
                <nav className="mt-4 md:mt-0">
                  <ul className="flex flex-wrap text-left gap-4 text-sm uppercase text-white">
                    {menuItems.map((item, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <Link
                          href={
                            item.url.startsWith("http")
                              ? new URL(item.url).pathname
                              : item.url
                          }
                          className="hover:underline uppercase text-lg md:text-2xl"
                        >
                          {item.label}
                        </Link>
                        {index !== menuItems.length - 1 && (
                          <span className="text-white">|</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            <div className="text-center justify-center relative mt-5">
              {profileInfo?.companyLogo?.sourceUrl && (
                <div className="flex justify-center items-center mb-3">
                  <div className="company-logo rounded-full w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex justify-center items-center bg-white">
                    <Image
                      src={profileInfo.companyLogo.sourceUrl}
                      alt={profileInfo.companyName || "Company Logo"}
                      width={120}
                      height={120}
                      className="border-4 border-white rounded-full"
                    />
                  </div>
                </div>
              )}

              <div className="text-center mt-5">
                <div className="inline-block px-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-normal font-alata text-center">
                    {profileInfo?.companyName}
                  </h1>
                  <div className="h-[2px] bg-logo-color mt-2 w-full"></div>
                </div>
              </div>

              <div className="text-lg sm:text-md text-white space-y-1 mt-3 font-questrial px-2">
                {profileInfo?.address && (
                  <p className="mb-2"> Address: {profileInfo.address}</p>
                )}
                {profileInfo?.phone && <p> Call: {profileInfo.phone}</p>}
                {profileInfo?.whatsapp && (
                  <p> Whatsapp: {profileInfo.whatsapp}</p>
                )}
                {profileInfo?.email && <p> Email: {profileInfo.email}</p>}
              </div>

              <div className="mt-10">
                <a
                  onClick={scrollToAbout}
                  className="cursor-pointer flex flex-col items-center text-white"
                  title="Scroll to About Us"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hover:opacity-80 mb-1"
                  >
                    <circle cx="12" cy="12" r="11" />
                    <line x1="12" y1="7" x2="12" y2="17" />
                    <polyline points="8 13 12 17 16 13" />
                  </svg>
                  Explore More
                </a>
              </div>
            </div>
          </>
        ) : isGeneral ? (
          <div className="text-white">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center">
              <div className="flex flex-col items-center lg:items-start">
                {options?.headerLogo?.sourceUrl && (
                  <Link href="/">
                    <Image
                      src={options.headerLogo.sourceUrl}
                      alt={options.headerLogo.title || "Header Logo"}
                      width={300}
                      height={80}
                      className="h-auto w-full sm:max-w-[300px] cursor-pointer"
                    />
                  </Link>
                )}
                {options?.headerSlogan && (
                  <p className="text-sm mt-1 text-center lg:text-left">
                    {options.headerSlogan}
                  </p>
                )}
              </div>

              <nav className="mt-4 lg:mt-0">
                <ul className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm uppercase">
                  {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <Link
                        href={
                          item.url.startsWith("http")
                            ? new URL(item.url).pathname
                            : item.url
                        }
                        className="hover:underline uppercase text-lg md:text-2xl"
                      >
                        {item.label}
                      </Link>
                      {index !== menuItems.length - 1 && (
                        <span className="text-white">|</span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {pageTitle && (
              <div className="w-full text-center mt-10">
                <div className="inline-block px-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl uppercase font-normal font-alata text-white">
                    {pageTitle}
                  </h1>
                  <div className="h-[2px] bg-logo-color mt-2 w-full"></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            {options?.headerLogo?.sourceUrl && (
              <Image
                src={options.headerLogo.sourceUrl}
                alt={options.headerLogo.title || "Header Logo"}
                width={500}
                height={60}
                className="mx-auto h-auto w-full max-w-[320px] sm:max-w-[450px]"
              />
            )}
            {options?.headerSlogan && (
              <p className="text-sm sm:text-lg text-white">
                {options.headerSlogan}
              </p>
            )}
            <div className="mt-6">
              <SearchBar
                locations={locations}
                services={services}
                small={isCompact}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
