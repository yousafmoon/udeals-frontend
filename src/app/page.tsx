import Header from "@/components/Header";
import HomeTopSlider from "@/components/HomeTopSlider";
import HomeCenterSlider from "@/components/HomeCenterSlider";
import FeaturedDealsSlider from "@/components/FeaturedDealsSlider";
import DealsGrid from "@/components/DealsGrid";
import DealsOthersGrid from "@/components/DealsOthersGrid";
import DealsVideoGrid from "@/components/DealsVideoGrid";
import { request } from "graphql-request";
import { HOMEPAGE_ALL_SECTIONS_QUERY } from "@/lib/queries";
import { JSX } from "react";

const endpoint = "https://ujz.cuf.temporary.site/udeals/graphql";

// --- Types ---
type Deal = {
  title: string;
  slug: string;
  dealsHomepage: {
    companyName?: string;
    location?: string;
    description?: string;
    expireOn?: string;
    discountPrice?: string;
    origionalPrice?: string;
    note?: string;
    image?: { sourceUrl: string };
    video?: { mediaItemUrl: string };
  };
};

type DealCategory = {
  id: string;
  name: string;
  slug: string;
  dealCategorySettings?: {
    layoutType?: string;
    styleType?: string;
    viewAllUrl?: string;
    viewAllButton?: string;
  };
  deals: { nodes: Deal[] };
};

export interface DealServiceItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  dealServices?: {
    iconImage?: {
      sourceUrl: string;
    };
  };
}

type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
};

type HomeMainBanner = {
  bannerImage?: { sourceUrl: string };
};

type HomeCenterBanner = {
  bannerCenterImage?: { sourceUrl: string };
  bannerCenterMainTitle?: string;
};

type Banner = {
  id: string;
  title?: string;
  imageUrl: string;
  link?: string;
};

type DealService = {
  id: string;
  name: string;
  count: number;
  slug: string;
  dealServices?: {
    iconImage?: {
      sourceUrl: string;
    };
  };
};

export default async function HomePage() {
  const data = await request<{
    dealCategories: { nodes: DealCategory[] };
    acfOptionsThemeOptions: { ThemeOptions: ThemeOptions };
    page: {
      homeFields: {
        homeMainBanners: HomeMainBanner[];
        homeCenterBanners: HomeCenterBanner[];
        bannerCenterMainTitle: string;
      };
    };
    categories: { nodes: { id: string; name: string }[] };
    dealServices: { nodes: DealService[] };
    menu: {
      menuItems: {
        nodes: {
          label: string;
          url: string;
        }[];
      };
    };
    listingBanners: {
      nodes: {
        id: string;
        title?: string;
        link?: string;
        featuredImage?: {
          node: {
            sourceUrl?: string;
          };
        };
      }[];
    };
  }>(endpoint, HOMEPAGE_ALL_SECTIONS_QUERY);

  const banners: Banner[] =
    data?.listingBanners?.nodes.map((banner) => ({
      id: banner.id,
      title: banner.title,
      imageUrl: banner.featuredImage?.node?.sourceUrl || "",
      link: banner.link || "",
    })) || [];

  const themeOptions = data.acfOptionsThemeOptions?.ThemeOptions || {};
  const homeMainBanners = data.page?.homeFields?.homeMainBanners || [];
  const homeCenterBanners = data.page?.homeFields?.homeCenterBanners || [];
  const bannerCenterMainTitle =
    data.page?.homeFields?.bannerCenterMainTitle || "";
  const services = data.dealServices?.nodes || [];
  const categories = data.dealCategories?.nodes || [];

  const groupedCategories: Record<string, DealCategory[]> = {};
  for (const cat of categories) {
    const layout = cat.dealCategorySettings?.layoutType || "grid-4-col";
    if (!groupedCategories[layout]) groupedCategories[layout] = [];
    groupedCategories[layout].push(cat);
  }

  const layoutRenderOrder = [
    "slider",
    "video-grid-3-col",
    "other-grid-4-col",
    "grid-4-col",
  ];

  let homeCenterSliderShown = false;

  const allLocations =
    data?.dealCategories?.nodes
      ?.flatMap((cat: any) =>
        cat?.deals?.nodes?.map((deal: any) => deal.dealsHomepage?.location)
      )
      ?.filter(Boolean) || [];

  const uniqueLocations = Array.from(new Set(allLocations));

  return (
    <>
      <div className="relative">
        <Header
          variant="default"
          options={themeOptions}
          locations={uniqueLocations}
          services={services}
          banners={banners}
        />
        <div className="relative z-10 lg:-mt-40">
          <HomeTopSlider slides={homeMainBanners} />
        </div>
      </div>

      <main className="pb-8">
        {layoutRenderOrder.map((layout) =>
          (groupedCategories[layout] || [])
            .sort((a, b) => a.name.localeCompare(b.name))
            .flatMap((category) => {
              const deals = category.deals?.nodes || [];
              const components: JSX.Element[] = [];

              switch (layout) {
                case "slider":
                  components.push(
                    <FeaturedDealsSlider
                      key={category.slug}
                      dealCategories={[category]}
                    />
                  );
                  break;

                case "video-grid-3-col":
                  components.push(
                    <DealsVideoGrid
                      key={category.slug}
                      dealCategories={[category]}
                    />
                  );
                  break;

                case "other-grid-4-col":
                  components.push(
                    <DealsOthersGrid
                      key={category.slug}
                      title={category.name}
                      deals={deals}
                      columns={4}
                    />
                  );

                  if (!homeCenterSliderShown) {
                    components.push(
                      <HomeCenterSlider
                        key="home-center-slider"
                        slides={homeCenterBanners}
                        bannerCenterMainTitle={bannerCenterMainTitle}
                      />
                    );
                    homeCenterSliderShown = true;
                  }
                  break;

                case "grid-4-col":
                default:
                  components.push(
                    <DealsGrid
                      key={category.slug}
                      title={category.name}
                      deals={deals}
                      slug={category.slug}
                      dealCategorySettings={category.dealCategorySettings}
                      columns={4}
                      styleType={category?.dealCategorySettings?.styleType}
                    />
                  );
                  break;
              }

              return components;
            })
        )}
      </main>

      {!homeCenterSliderShown && (
        <HomeCenterSlider
          slides={homeCenterBanners}
          bannerCenterMainTitle={bannerCenterMainTitle}
        />
      )}
    </>
  );
}
