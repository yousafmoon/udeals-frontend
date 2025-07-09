import Header from "@/components/Header";
import { getHeaderMenu } from "@/lib/getHeaderMenu";
import { HOMEPAGE_ALL_SECTIONS_QUERY } from "@/lib/queries";
import { request } from "graphql-request";

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
  aboutUsPage?: {
    homepageAboutusPageFields?: {
      aboutPageContent?: string;
    };
  };
}

export default async function AboutUsPage() {
  const headerMenu = await getHeaderMenu();

  const themeData = await request<GraphQLResponse>(
    endpoint,
    HOMEPAGE_ALL_SECTIONS_QUERY
  );

  const themeOptions: ThemeOptions =
    themeData.acfOptionsThemeOptions?.ThemeOptions || {};

  const aboutContent =
    themeData.aboutUsPage?.homepageAboutusPageFields?.aboutPageContent;

  return (
    <>
      <Header
        variant="general"
        options={themeOptions}
        menuItems={headerMenu}
        pageTitle="About Us"
      />

      <main className="container mx-auto px-10 py-10 custom-page sm:px-5 md:px-10">
        {aboutContent ? (
          <div
            className="proseprose-sm sm:prose md:prose-base lg:prose-lg max-w-none font-dmsans p-7 border-1 border-amber-300"
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          />
        ) : (
          <p className="text-center text-gray-500"></p>
        )}
      </main>
    </>
  );
}
