"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const cultureImages = [
  { src: "/our-work/DSC00533.jpg", alt: "Team collaboration at Stingray Boats" },
  { src: "/our-work/DSC00803.jpg", alt: "Manufacturing excellence" },
  { src: "/our-work/DSC00831.jpg", alt: "Team discussion on the factory floor" },
  { src: "/our-work/DSC00865.jpg", alt: "Boat assembly and finishing" },
  { src: "/our-work/DSC00887.jpg", alt: "Craftsmanship and detail work" },
];

export default function CareersPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % cultureImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #18344C 0%, #004D6D 40%, #18344C 100%)",
        }}
      >
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Decorative circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-[#6FAEDF]/10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full border border-[#6FAEDF]/5"
          animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full border border-[#6FAEDF]/[0.07]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block px-5 py-2 rounded-full border border-[#6FAEDF]/30 text-[#6FAEDF] text-sm tracking-[0.25em] uppercase font-medium">
              Join Our Team
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight mb-6"
            style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
          >
            CAREERS
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl md:text-3xl text-[#C5CCD5] mb-3 font-light"
          >
            Employment at Stingray
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-[#6FAEDF]/60 text-base md:text-lg max-w-lg mx-auto mb-12"
          >
            Legendary Performance, Unsurpassed Since 1979
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              href="/openings"
              className="group inline-flex items-center gap-3 bg-[#6FAEDF] text-[#18344C] font-bold px-8 py-4 rounded-lg hover:bg-white transition-all duration-300 text-base md:text-lg tracking-wide shadow-lg shadow-[#6FAEDF]/20 hover:shadow-white/20"
            >
              View Open Roles
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: "80px" }}
          >
            <path
              d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-[#6FAEDF]/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-2">
                <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
                  About Us
                </span>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl text-[#18344C] mb-8 tracking-tight"
                style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
              >
                Building Top Quality
                <br />
                Powerboats
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#18344C]/70 text-lg leading-relaxed mb-6"
              >
                Located in Hartsville, SC, Stingray is a family oriented company
                committed to building top quality powerboats. Since its beginning
                in 1979, Stingray has emerged as one of the leading independent
                boat builders in the nation.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#18344C]/70 text-lg leading-relaxed mb-6"
              >
                Our facilities consist of over 225,000 square feet of
                manufacturing space and is one of the most technologically
                advanced facilities in the country.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#18344C]/70 text-lg leading-relaxed"
              >
                Our positions offer competitive wage and benefit programs
                including medical, dental, vision, holidays, vacation, 401k,
                plus optional disability and life insurance.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  number: "1979",
                  label: "Established",
                  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                },
                {
                  number: "225K+",
                  label: "Sq Ft Facility",
                  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                },
                {
                  number: "Top",
                  label: "Boat Builder",
                  icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                },
                {
                  number: "Family",
                  label: "Oriented",
                  icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  className="bg-gradient-to-br from-[#18344C] to-[#004D6D] text-white rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-[#004D6D]/20 transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-[#6FAEDF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={stat.icon}
                      />
                    </svg>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-[#6FAEDF] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[#C5CCD5] text-sm tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Culture Section - Auto-rotating Images */}
      <section className="py-20 md:py-28 bg-[#18344C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Life at Stingray
            </span>
            <h2
              className="text-3xl md:text-4xl text-white mt-2 tracking-tight"
              style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
            >
              Our Culture
            </h2>
            <p className="text-[#C5CCD5]/60 mt-3 max-w-xl mx-auto">
              At Stingray, we&apos;re more than a team &mdash; we&apos;re a
              family dedicated to craftsmanship and excellence.
            </p>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            className="relative rounded-2xl overflow-hidden aspect-[16/7] max-w-5xl mx-auto shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={cultureImages[currentImage].src}
                  alt={cultureImages[currentImage].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={currentImage === 0}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18344C]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <p className="text-white/90 text-sm font-medium">
                {cultureImages[currentImage].alt}
              </p>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {cultureImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentImage
                    ? "bg-[#6FAEDF] w-8"
                    : "bg-white/20 w-2 hover:bg-white/40"
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Operating Hours Section */}
      <section
        className="py-20 md:py-28 px-6"
        style={{
          background: "linear-gradient(180deg, #f8f9fb 0%, #e8ebef 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Why Stingray
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight"
              style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
            >
              Benefits & Information
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#004D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl text-[#18344C]" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
                  Benefits Package
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Medical", "Dental", "Vision", "Holidays", "Vacation", "401k", "Disability", "Life Insurance"].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#6FAEDF] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#18344C]/70 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#004D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl text-[#18344C]" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
                  Operating Hours
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f8f9fb] rounded-xl">
                  <div>
                    <div className="font-semibold text-[#18344C]">Plant</div>
                    <div className="text-xs text-[#18344C]/50 mt-0.5">Manufacturing Floor</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#004D6D]">Mon - Thu</div>
                    <div className="text-sm text-[#18344C]/60">7:00 AM - 5:30 PM</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f8f9fb] rounded-xl">
                  <div>
                    <div className="font-semibold text-[#18344C]">Office</div>
                    <div className="text-xs text-[#18344C]/50 mt-0.5">Administrative</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#004D6D]">Mon - Thu</div>
                    <div className="text-sm text-[#18344C]/60">7:00 AM - 5:30 PM</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#C5CCD5]/30">
                <p className="text-xs text-[#18344C]/40 text-center">Hartsville, SC</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equal Opportunity Banner */}
      <motion.section
        className="py-8 px-6"
        style={{ background: "linear-gradient(90deg, #18344C 0%, #004D6D 100%)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-white/80 text-sm tracking-wide">
          Stingray is an equal opportunity employer.
        </p>
      </motion.section>

      {/* CTA Section - 3 Placeholder Buttons */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Explore More
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight"
              style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
            >
              Stingray Boats
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                top: "Price Your",
                bottom: "Stingray",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                top: "Find Your",
                bottom: "Dealer",
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              },
              {
                top: "Request A",
                bottom: "Brochure",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
            ].map((cta) => (
              <motion.button
                key={cta.bottom}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-gradient-to-br from-[#18344C] to-[#004D6D] rounded-2xl p-8 text-center cursor-pointer overflow-hidden border-0"
              >
                <div className="absolute inset-0 bg-[#6FAEDF]/0 group-hover:bg-[#6FAEDF]/10 transition-colors duration-300" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#6FAEDF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#6FAEDF]/20 transition-colors duration-300">
                    <svg className="w-8 h-8 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cta.icon} />
                    </svg>
                  </div>
                  <div className="text-[#C5CCD5] text-sm tracking-wider uppercase mb-1">{cta.top}</div>
                  <div className="text-white text-2xl tracking-wide" style={{ fontFamily: "Arial Black, Arial, sans-serif" }}>
                    {cta.bottom}
                  </div>
                  <div className="mt-4 inline-flex items-center text-[#6FAEDF] text-sm font-medium">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
