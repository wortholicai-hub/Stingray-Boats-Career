import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  {
    label: "Find Your Dealer",
    href: "https://stingrayboats.com/find-your-dealer/",
  },
  { label: "Careers", href: "/" },
  {
    label: "Shows and Events",
    href: "https://stingrayboats.com/company/shows-and-events/",
  },
  {
    label: "Request a Brochure",
    href: "https://stingrayboats.com/request-a-brochure/",
  },
  { label: "Warranty Info", href: "https://stingrayboats.com/warranty/" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/stingrayboats",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stingrayboats/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/stingray-boats/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/StingrayBoats",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 512 512">
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="text-white relative" style={{ backgroundImage: "url('/header-footer-img/footer-background.jpg.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-[#18344C]/50" />
      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo + Tagline */}
          <div>
            <Image
              src="/logo/stingray-logo.png"
              alt="Stingray Boats"
              width={280}
              height={42}
              className="!h-12 !w-auto mb-4"
            />
            <p className="text-white text-base leading-relaxed font-bold">
              Legendary Performance, Unsurpassed Since 1979.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-bold text-base tracking-[0.15em] uppercase mb-4 pb-3 border-b border-white/20"
              style={{ fontFamily: "var(--font-eurostile), Arial Black, sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      className="text-white/90 hover:text-white text-base font-bold transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-white text-base font-bold transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3
              className="text-white font-bold text-base tracking-[0.15em] uppercase mb-4 pb-3 border-b border-white/20"
              style={{ fontFamily: "var(--font-eurostile), Arial Black, sans-serif" }}
            >
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:8433834507"
                className="flex items-center gap-3 text-white/90 hover:text-white text-base font-bold transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (843) 383 4507
              </a>
              <a
                href="#"
                className="flex items-start gap-3 text-white/90 hover:text-white text-base font-bold transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  625 Railroad Ave.
                  <br />
                  Hartsville, SC 29550
                </span>
              </a>
              <a
                href="mailto:info@stingrayboats.com"
                className="flex items-center gap-3 text-white/90 hover:text-white text-base font-bold transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@stingrayboats.com
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#18344C] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Statement */}
      <div className="relative border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-white/80 text-sm leading-relaxed mb-4 text-center">
            Stingray&apos;s goal is to permit customers to successfully gather
            information and conduct business through our website, including
            individuals with visual impairments that use screen readers to view
            the website. Stingray Boats has taken steps and is devoting resources
            to promote website accessibility. If you have difficulty accessing
            features or functions on this website, email us at{" "}
            <a
              href="mailto:info@stingrayboats.com"
              className="text-white underline hover:text-white/90"
            >
              info@stingrayboats.com
            </a>{" "}
            and we will work with you to provide the information you seek and/or
            call our customer service line at{" "}
            <a
              href="tel:8433834507"
              className="text-white underline hover:text-white/90"
            >
              (843) 383 4507
            </a>
            .
          </p>
          <p className="text-white/90 text-sm text-center font-medium">
            &copy; 2026 Stingray Boats. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
