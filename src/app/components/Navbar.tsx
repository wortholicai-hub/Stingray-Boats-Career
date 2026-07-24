"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    label: "Explore Models",
    href: "https://stingrayboats.com/models/",
  },
  {
    label: "Find a Dealer",
    href: "https://stingrayboats.com/find-your-dealer/",
    children: [
      {
        label: "Dealer Locator",
        href: "https://stingrayboats.com/find-your-dealer/",
      },
      {
        label: "Become A Stingray Dealer",
        href: "https://stingrayboats.com/become-a-stingray-dealer/",
      },
    ],
  },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Owners", href: "https://stingrayboats.com/owners/" },
      {
        label: "Shop Stingray",
        href: "https://www.stingraymerch.com",
        external: true,
      },
    ],
  },
  {
    label: "About Stingray",
    href: "https://stingrayboats.com/company/about-stingray/",
    children: [
      {
        label: "Our Story",
        href: "https://stingrayboats.com/company/about-stingray/",
      },
      {
        label: "Technology",
        href: "https://stingrayboats.com/technology/",
      },
      {
        label: "Environmental Commitment",
        href: "https://stingrayboats.com/company/environmental-commitment/",
      },
      {
        label: "Shows / Events",
        href: "https://stingrayboats.com/company/shows-and-events/",
      },
      { label: "News", href: "https://stingrayboats.com/news/" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-[#18344C]/95 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo/stingray-logo.png"
              alt="Stingray Boats"
              width={280}
              height={42}
              className="!h-10 md:!h-12 !w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label,
                      )
                    }
                    className="flex items-center gap-1 px-3 py-2 text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors cursor-pointer"
                  >
                    {item.label}
                    <svg
                      className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="px-3 py-2 text-[13px] font-semibold text-white/80 hover:text-white tracking-wide uppercase transition-colors"
                  >
                    {item.label}
                  </a>
                )}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-[#C5CCD5]/30 min-w-[220px] py-2 z-50">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        target={
                          "external" in child && child.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          "external" in child && child.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block px-4 py-2.5 text-sm text-[#18344C] hover:bg-[#6FAEDF]/10 hover:text-[#004D6D] transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/"
              className="ml-2 px-4 py-2 text-[13px] font-bold text-[#18344C] bg-[#6FAEDF] rounded-lg hover:bg-white tracking-wide uppercase transition-colors"
            >
              Careers
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#18344C] border-t border-white/10 px-4 pb-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label,
                      )
                    }
                    className="w-full flex items-center justify-between py-3 text-sm font-semibold text-white/80 hover:text-white uppercase tracking-wide cursor-pointer"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 pb-2 space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block py-2 text-sm text-[#6FAEDF]/80 hover:text-[#6FAEDF]"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  className="block py-3 text-sm font-semibold text-white/80 hover:text-white uppercase tracking-wide"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <Link
            href="/"
            className="block mt-2 text-center py-3 text-sm font-bold text-[#18344C] bg-[#6FAEDF] rounded-lg uppercase tracking-wide"
          >
            Careers
          </Link>
        </div>
      )}
    </nav>
  );
}
