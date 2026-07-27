"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Sync: detect pathname change instantly (same render frame, no flash)
  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setLoading(true);
    setVisible(true);
  }

  // Timer to hide loader after delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [currentPath]);

  // After fade-out completes, remove from DOM
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center ${
        loading
          ? "opacity-100"
          : "opacity-0 pointer-events-none transition-opacity duration-500"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-2 border-[#C5CCD5]/30 border-t-[#18344C] loader-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo/chrome_Stingray-icon.png"
            alt="Stingray"
            width={50}
            height={50}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
