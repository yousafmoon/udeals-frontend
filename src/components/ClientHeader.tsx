"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getHeaderMenu } from "@/lib/getHeaderMenu";

export default function ClientHeader({ options }: { options: any }) {
  const pathname = usePathname();
  const [variant, setVariant] = useState<
    "default" | "compact" | "profile" | "general"
  >("default");
  const [menuItems, setMenuItems] = useState([]);

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
}
