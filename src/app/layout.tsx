import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { getFooterMenu } from "@/lib/getFooterMenu";
import { request } from "graphql-request";
import { HOMEPAGE_ALL_SECTIONS_QUERY } from "@/lib/queries";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Suspense } from "react";

import {
  Montserrat,
  Poppins,
  Lato,
  Lexend_Deca,
  Marcellus,
  Alata,
  Questrial,
  DM_Sans,
} from "next/font/google";

const endpoint = "https://ujz.cuf.temporary.site/udeals/graphql";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lexend-deca",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Salon Deals & Offer, Massage, Hair in UAE  | UAE SALON DEALS",
  description:
    "Discover the best salon deals across UAE! Get discounts on hair, nails, facials, and more. Pamper yourself with premium beauty services at low prices.",
  icons: {
    icon: "/favicon.ico",
  },
};

type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
  footerLogo?: { sourceUrl: string; title?: string };
  copyright?: string;
};

type GraphQLData = {
  acfOptionsThemeOptions?: {
    ThemeOptions?: ThemeOptions;
  };
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerMenu = await getFooterMenu();
  const data: GraphQLData = await request(
    endpoint,
    HOMEPAGE_ALL_SECTIONS_QUERY
  );
  const themeOptions: ThemeOptions =
    data?.acfOptionsThemeOptions?.ThemeOptions || {};

  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${poppins.variable} ${lato.variable} ${lexendDeca.variable} 
      ${marcellus.variable} ${alata.variable} ${questrial.variable} ${dmsans.variable} font-sans antialiased`}
    >
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      <body>
        <Suspense fallback={<div>Loading page...</div>}>{children}</Suspense>
        <ScrollToTopButton />
        <Footer options={themeOptions} menuItems={footerMenu} />
      </body>
    </html>
  );
}
