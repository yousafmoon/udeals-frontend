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
      <Header variant="general" options={themeOptions} menuItems={headerMenu} />

      <main className="container mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10 lg:py-16">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
            About us
          </h2>
        </div>

        {aboutContent ? (
          <div
            className="prose prose-sm sm:prose md:prose-lg max-w-none custom-page font-dmsans"
            dangerouslySetInnerHTML={{ __html: aboutContent }}
          />
        ) : (
          <p className="text-center text-gray-500"></p>
        )}
      </main>
    </>
  );
}
