"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  options: {
    footerLogo?: { sourceUrl: string; title?: string };
    copyright?: string;
  };
  menuItems?: { label: string; url: string }[];
}

export default function Footer({ options, menuItems = [] }: FooterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          receiverEmail: "marketing@yourdomain.com",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusType("error");
        setStatus(data.message || "Subscription failed.");
      } else {
        setStatusType("success");
        setStatus(data.message || "Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      setStatusType("error");
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
    }
  };

  return (
    <footer className="bg-black text-white py-6">
      <div className="container px-10 mx-auto text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="w-full md:w-1/2 text-center md:text-left">
            {options?.footerLogo?.sourceUrl && (
              <div className="mb-1">
                <Link href="/">
                  <Image
                    src={options.footerLogo.sourceUrl}
                    alt={options.footerLogo.title || "Footer Logo"}
                    width={420}
                    height={40}
                    className="h-[40px] w-[420px] cursor-pointer"
                  />
                </Link>
              </div>
            )}
            {options?.copyright && (
              <div
                className="text-lg text-white-400"
                dangerouslySetInnerHTML={{ __html: options.copyright }}
              />
            )}
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-[460px] mt-15">
            <div className="relative h-[60px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Please enter the email for subscribe"
                className="w-full h-full pr-[130px] pl-4 text-sm rounded-full text-black placeholder-gray-400 bg-white focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute top-0 right-0 h-full px-6 rounded-full cursor-pointer bg-logo-color text-black font-semibold text-md"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-2 h-6 flex justify-center items-center transition-all duration-200">
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : status ? (
                <span
                  className={`text-sm font-medium ${
                    statusType === "success" ? "text-green-300" : "text-red-400"
                  }`}
                >
                  {status}
                </span>
              ) : null}
            </div>
          </form>
        </div>

        {menuItems.length > 0 && (
          <ul className="flex flex-wrap text-left gap-4 text-sm uppercase text-white">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <Link
                  href={new URL(item.url).pathname}
                  className="hover:underline"
                >
                  <span dangerouslySetInnerHTML={{ __html: item.label }} />
                </Link>
                {index !== menuItems.length - 1 && (
                  <span className="text-white">|</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
