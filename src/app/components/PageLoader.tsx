"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Sync: if pathname changed, show loader immediately (same render frame, no flash)
  if (pathname !== currentPath) {
    setCurrentPath(pathname);
    setLoading(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [currentPath]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
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
