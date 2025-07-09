"use client";

import ClientHeader from "./ClientHeader";

export type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
  footerLogo?: { sourceUrl: string; title?: string };
  copyright?: string;
};

export default function ClientHeaderWrapper({
  options,
}: {
  options: ThemeOptions;
}) {
  return <ClientHeader options={options} />;
}
