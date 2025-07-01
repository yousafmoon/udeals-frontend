// src/app/deal/[slug]/page.tsx

import { getDealBySlug, HOMEPAGE_ALL_SECTIONS_QUERY } from "@/lib/queries";
import { request } from "graphql-request";
import { notFound } from "next/navigation";
import SpecialDeal from "@/components/sections/SpecialDeal";
import Header from "@/components/Header";
import { getHeaderMenu } from "@/lib/getHeaderMenu";
import AboutUs from "@/components/sections/AboutUs";
import Services from "@/components/sections/Services";
import PricingPackage from "@/components/sections/PricingPackage";
import BeforeAfter from "@/components/sections/BeforeAfter";
import PhotoGallery from "@/components/sections/PhotoGallery";
import VideoGallery from "@/components/sections/VideoGallery";
import BeautyProducts from "@/components/sections/BeautyProducts";
import GetInTouch from "@/components/sections/GetInTouch";

const endpoint = "https://ujz.cuf.temporary.site/udeals/graphql";

type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
};

interface GraphQLResponse {
  acfOptionsThemeOptions: {
    ThemeOptions: ThemeOptions;
  };
}

interface DealPageProps {
  params: {
    slug: string;
  };
}

export default async function DealPage({ params }: DealPageProps) {
  const headerMenu = await getHeaderMenu();

  const deal = await getDealBySlug(params.slug);
  if (!deal) return notFound();

  const themeData: GraphQLResponse = await request(
    endpoint,
    HOMEPAGE_ALL_SECTIONS_QUERY
  );
  const themeOptions = themeData.acfOptionsThemeOptions?.ThemeOptions || {};
  const d = deal.dealsHomepage;

  return (
    <>
      <Header
        variant="profile"
        options={themeOptions}
        menuItems={headerMenu}
        profileInfo={{
          companyName: d?.companyName || deal.title,
          companyLogo: d?.companyLogo,
          address: d?.address,
          phone: d?.phone,
          whatsapp: d?.whatsapp,
          email: d?.email,
        }}
      />

      <main className="container mx-auto pt-12 px-4 sm:px-5 md:px-10">
        <SpecialDeal
          d={deal.specialDealSection}
          dealsHomepage={deal.dealsHomepage}
        />
      </main>

      <main className="w-full mx-auto">
        <AboutUs
          d={{ ...deal.aboutUsSection, ourTeamSection: deal.ourTeamSection }}
          dealsHomepage={deal.dealsHomepage}
        />
      </main>

      <Services d={deal.servicesSection} dealsHomepage={deal.dealsHomepage} />
      <PricingPackage
        d={deal.pricingPackageSection}
        dealsHomepage={deal.dealsHomepage}
      />
      <BeforeAfter
        d={deal.beforeAfterSection}
        dealsHomepage={deal.dealsHomepage}
      />
      <PhotoGallery
        d={deal.photoGallerySection}
        dealsHomepage={deal.dealsHomepage}
      />
      <VideoGallery
        d={deal.videoGallerySection}
        dealsHomepage={deal.dealsHomepage}
      />
      <BeautyProducts
        d={deal.beautyProductsSection}
        dealsHomepage={deal.dealsHomepage}
      />
      <GetInTouch
        d={deal.contactUsSection}
        dealsHomepage={deal.dealsHomepage}
      />
    </>
  );
}
