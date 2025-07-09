"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getHeaderMenu } from "@/lib/getHeaderMenu";

type ThemeOptions = {
  headerBackground?: { sourceUrl: string };
  headerLogo?: { sourceUrl: string; title?: string };
  headerSlogan?: string;
};

type Props = {
  options: ThemeOptions;
};

export default function ClientHeader({ options }: Props) {
  const pathname = usePathname();
  const [variant, setVariant] = useState<
    "default" | "compact" | "profile" | "general"
  >("default");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (pathname === "/") setVariant("compact");
    else setVariant("default");
  }, [pathname]);

  useEffect(() => {
    if (variant === "profile" || variant === "general") {
      getHeaderMenu().then((items) => setMenuItems(items));
    } else {
      setMenuItems([]);
    }
  }, [variant]);

  if (!isMounted || pathname === "/") return null;

  return <></>;
}
