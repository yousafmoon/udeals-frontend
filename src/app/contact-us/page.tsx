import Header from "@/components/Header";
import ContactUsForm from "@/components/ContactUsForm";
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
  [x: string]: any;
  acfOptionsThemeOptions: {
    ThemeOptions: ThemeOptions;
  };
}

export default async function ContactUs() {
  const headerMenu = await getHeaderMenu();

  const themeData = await request<GraphQLResponse>(
    endpoint,
    HOMEPAGE_ALL_SECTIONS_QUERY
  );

  const themeOptions: ThemeOptions =
    themeData.acfOptionsThemeOptions?.ThemeOptions || {};

  const contactPageContent =
    themeData.contactUsPage?.homepageContactPageFields?.contactPageContent;
  return (
    <>
      <Header variant="general" options={themeOptions} menuItems={headerMenu} />

      <main className="container mx-auto px-4 sm:px-6 md:px-10 py-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-black font-lexend-deca uppercase section-heading-border">
            Contact us
          </h2>
        </div>

        {contactPageContent ? (
          <div
            className="prose prose-sm sm:prose md:prose-lg max-w-none font-dmsans"
            dangerouslySetInnerHTML={{ __html: contactPageContent }}
          />
        ) : (
          <p className="text-center text-gray-500"></p>
        )}

        <ContactUsForm contactPageContent={contactPageContent} />
      </main>
    </>
  );
}
