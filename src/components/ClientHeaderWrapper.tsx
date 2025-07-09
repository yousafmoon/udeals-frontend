"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ClientHeader from "./ClientHeader";

export type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
  footerLogo?: { sourceUrl: string; title?: string };
  copyright?: string;
};

export default function ClientHeaderWrapper({}: { options: ThemeOptions }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (pathname === "/") return null;

  return (
    <ClientHeader
      options={{
        headerBackground: undefined,
        headerLogo: undefined,
        headerSlogan: undefined,
      }}
    />
  );
}
