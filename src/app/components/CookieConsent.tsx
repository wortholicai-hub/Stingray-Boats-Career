"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#18344C] rounded-2xl p-6 shadow-2xl border border-white/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-white/90 text-sm leading-relaxed">
              This website uses cookies to customize and improve your experience. If you are a California resident, you may be entitled to certain rights regarding your personal information. Additional information about our data collection practices and location specific notices is available on our privacy policy.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={accept}
                className="px-5 py-2 bg-[#6FAEDF] text-[#18344C] text-sm font-semibold rounded-lg hover:bg-white transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-barlow), Arial, sans-serif" }}
              >
                Accept
              </button>
              <button
                onClick={decline}
                className="px-5 py-2 bg-white/10 text-white/80 text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                style={{ fontFamily: "var(--font-barlow), Arial, sans-serif" }}
              >
                Decline
              </button>
            </div>
          </div>
          <button
            onClick={decline}
            className="text-white/40 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
