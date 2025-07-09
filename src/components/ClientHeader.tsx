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

  useEffect(() => {
    setVariant(pathname === "/" ? "compact" : "default");
  }, [pathname]);

  useEffect(() => {
    if (variant === "profile" || variant === "general") {
      getHeaderMenu().then(setMenuItems);
    } else {
      setMenuItems([]);
    }
  }, [variant]);

  return (
    <header className="bg-white shadow-md p-4">
      {options?.headerLogo && (
        <div className="flex items-center gap-2">
          <img
            src={options.headerLogo.sourceUrl}
            alt={options.headerLogo.title || "Logo"}
            className="h-10"
          />
          <span className="text-lg font-bold">{options.headerSlogan}</span>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-2">Variant: {variant}</div>

      {menuItems.length > 0 && (
        <nav className="mt-2">
          <ul className="flex gap-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.url} className="text-blue-600 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
