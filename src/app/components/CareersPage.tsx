"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

const headingFont = "var(--font-exo2), Arial Black, sans-serif";
const buttonFont = "var(--font-barlow), Arial, sans-serif";

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

// About Us images (About Us folder)
const aboutImages = [
  { src: "/About%20Us/DSC00518.jpg", alt: "Team collaboration at Stingray" },
  { src: "/About%20Us/DSC00526.jpg", alt: "Manufacturing precision" },
  { src: "/About%20Us/DSC00549.jpg", alt: "Boat assembly process" },
  { src: "/About%20Us/DSC00565.jpg", alt: "Quality craftsmanship" },
  { src: "/About%20Us/DSC00578.jpg", alt: "Team at work" },
  { src: "/About%20Us/DSC00658.jpg", alt: "Production excellence" },
  { src: "/About%20Us/DSC00726.jpg", alt: "Workshop environment" },
  { src: "/About%20Us/DSC00744.jpg", alt: "Detailed finishing work" },
  { src: "/About%20Us/DSC00776.jpg", alt: "Boat manufacturing" },
  { src: "/About%20Us/DSC00865.jpg", alt: "Team dedication" },
  { src: "/About%20Us/DSC00871.jpg", alt: "Stingray facility" },
];

// Our Culture images (our-work folder)
const cultureImages = [
  { src: "/our-work/DSC00533.jpg", alt: "Team collaboration at Stingray Boats" },
  { src: "/our-work/DSC00803.jpg", alt: "Manufacturing excellence" },
  { src: "/our-work/DSC00831.jpg", alt: "Team discussion on the factory floor" },
  { src: "/our-work/DSC00865.jpg", alt: "Boat assembly and finishing" },
  { src: "/our-work/DSC00887.jpg", alt: "Craftsmanship and detail work" },
];

const aboutTags = [
  { label: "Est. 1979", accent: false },
  { label: "225,000+ Sq Ft", accent: true },
  { label: "Family Oriented", accent: false },
];

// Slide variants for About gallery
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0.3,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0.3,
  }),
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function CareersPage() {
  // About gallery state
  const [aboutIdx, setAboutIdx] = useState(0);
  const [aboutDir, setAboutDir] = useState(1);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Culture carousel state (original)
  const [currentImage, setCurrentImage] = useState(0);

  // Culture auto-rotation (original)
  const nextCultureImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % cultureImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextCultureImage, 5000);
    return () => clearInterval(interval);
  }, [nextCultureImage]);

  // About gallery auto-advance (faster: 2500ms)
  const startAutoAdvance = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAboutDir(1);
      setAboutIdx((prev) => prev + 1);
    }, 1500);
  }, []);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [startAutoAdvance]);

  const aboutPrev = useCallback(() => {
    setAboutDir(-1);
    setAboutIdx((prev) => prev - 1);
    startAutoAdvance();
  }, [startAutoAdvance]);

  const aboutNext = useCallback(() => {
    setAboutDir(1);
    setAboutIdx((prev) => prev + 1);
    startAutoAdvance();
  }, [startAutoAdvance]);

  const currentAboutImg = aboutImages[mod(aboutIdx, aboutImages.length)];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/career-backgraound/StingraySelects-CLW-119.jpg"
          alt="Stingray Boats"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay - lower opacity to show more background */}
        <div className="absolute inset-0 bg-[#18344C]/45" />


        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-block px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm tracking-[0.25em] uppercase font-bold border border-white/20 hover:bg-white/20 transition-colors duration-300 cursor-default">
              Join Our Team
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight mb-6 uppercase font-black"
            style={{ fontFamily: headingFont }}
          >
            CAREERS
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl sm:text-2xl md:text-3xl text-[#C5CCD5] mb-3 font-light">
            Employment at Stingray
          </motion.p>
          <motion.p variants={fadeInUp} className="text-white/80 text-base md:text-lg max-w-lg mx-auto mb-12">
            Legendary Performance, Unsurpassed Since 1979
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              href="/openings"
              className="group inline-flex items-center gap-3 bg-white text-[#18344C] font-bold px-8 py-4 rounded-lg hover:bg-[#6FAEDF] transition-all duration-300 text-base md:text-lg tracking-wide shadow-lg shadow-white/20"
              style={{ fontFamily: buttonFont }}
            >
              View Open Roles
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom outer curve */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
            <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V100H0V100Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text + Tags */}
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
                className="text-3xl md:text-4xl text-[#18344C] mb-8 tracking-tight uppercase font-black"
                style={{ fontFamily: headingFont }}
              >
                Building Top Quality
                <br />
                Powerboats
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[#18344C]/70 text-lg leading-relaxed mb-6">
                Located in Hartsville, SC, Stingray is a family oriented company
                committed to building top quality powerboats. Since its beginning
                in 1979, Stingray has emerged as one of the leading independent
                boat builders in the nation.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[#18344C]/70 text-lg leading-relaxed mb-6">
                Our facilities consist of over 225,000 square feet of
                manufacturing space and is one of the most technologically
                advanced facilities in the country.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[#18344C]/70 text-lg leading-relaxed mb-8">
                Our positions offer competitive wage and benefit programs
                including medical, dental, vision, holidays, vacation, 401k,
                plus optional disability and life insurance.
              </motion.p>

              {/* 3 Tags with CSS 3D hover (WordPress-portable) */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                {aboutTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-bold tracking-wide cursor-default shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-200 ${
                      tag.accent
                        ? "bg-gradient-to-r from-[#004D6D] to-[#18344C] text-white hover:shadow-[0_10px_30px_rgba(0,77,109,0.35)]"
                        : "bg-white text-[#18344C] border border-[#C5CCD5]/40 hover:shadow-[0_10px_30px_rgba(24,52,76,0.15)]"
                    }`}
                    style={{ fontFamily: buttonFont }}
                  >
                    {tag.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Single Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ aspectRatio: "3/2" }}>
                <AnimatePresence mode="popLayout" custom={aboutDir} initial={false}>
                  <motion.div
                    key={aboutIdx}
                    custom={aboutDir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentAboutImg.src}
                      alt={currentAboutImg.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left hover zone */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer group/left"
                  onClick={aboutPrev}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/left:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white">
                      <svg className="w-5 h-5 text-[#18344C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right hover zone */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer group/right"
                  onClick={aboutNext}
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/right:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white">
                      <svg className="w-5 h-5 text-[#18344C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top curve - blue arcs upward into white section above */}
      <div className="relative z-10" style={{ marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
          <path d="M0 0C0 0 360 100 720 100C1080 100 1440 0 1440 0V100H0V0Z" fill="#18344C" />
        </svg>
      </div>

      {/* Our Culture Section - Auto-rotating Images */}
      <section className="py-20 md:py-28 bg-[#18344C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              className="text-3xl md:text-4xl text-white mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Our Culture
            </h2>
            <p className="text-[#C5CCD5]/60 mt-3 max-w-xl mx-auto">
              At Stingray, we&apos;re more than just a team. We&apos;re a
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#18344C]/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* White solid tag caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <span className="inline-block px-5 py-2.5 rounded-full bg-white text-[#18344C] text-sm font-semibold shadow-lg">
                {cultureImages[currentImage].alt}
              </span>
            </div>

            {/* Left / Right nav buttons */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer group/cl" onClick={() => setCurrentImage((currentImage - 1 + cultureImages.length) % cultureImages.length)}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/cl:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white">
                  <svg className="w-5 h-5 text-[#18344C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer group/cr" onClick={() => setCurrentImage((currentImage + 1) % cultureImages.length)}>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover/cr:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white">
                  <svg className="w-5 h-5 text-[#18344C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
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

      {/* Bottom curve - blue arcs downward into gray section below */}
      <div className="relative z-10" style={{ marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px", background: "linear-gradient(180deg, #f8f9fb 0%, #f8f9fb 100%)" }}>
          <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V0H0V100Z" fill="#18344C" />
        </svg>
      </div>

      {/* Benefits & Operating Hours Section */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "linear-gradient(180deg, #f8f9fb 0%, #e8ebef 100%)" }}
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
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Benefits & Information
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefits Card */}
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
                <h3 className="text-xl text-[#18344C] font-bold" style={{ fontFamily: headingFont }}>
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

            {/* Operating Hours Card - Blue Theme */}
            <motion.div
              className="bg-gradient-to-br from-[#18344C] to-[#004D6D] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl text-white font-bold" style={{ fontFamily: headingFont }}>
                  Operating Hours
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div>
                    <div className="font-semibold text-white">Plant</div>
                    <div className="text-xs text-white/50 mt-0.5">Manufacturing Floor</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#6FAEDF]">Mon thru Thu</div>
                    <div className="text-sm text-white/70">7:00 AM to 5:30 PM</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                  <div>
                    <div className="font-semibold text-white">Office</div>
                    <div className="text-xs text-white/50 mt-0.5">Administrative</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#6FAEDF]">Mon thru Thu</div>
                    <div className="text-sm text-white/70">7:00 AM to 5:30 PM</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-white/40 text-center">Hartsville, SC</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Explore More
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Stingray Boats
            </h2>
            <p className="text-[#18344C]/50 mt-3 max-w-md mx-auto text-sm">
              Discover everything Stingray has to offer
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                top: "Price Your",
                bottom: "Stingray",
                desc: "Build and customize your dream boat with our pricing tool",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                top: "Find Your",
                bottom: "Dealer",
                desc: "Locate an authorized Stingray dealer near you",
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              },
              {
                top: "Request A",
                bottom: "Brochure",
                desc: "Get detailed specifications and model information",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
            ].map((cta) => (
              <motion.button
                key={cta.bottom}
                variants={scaleIn}
                className="group relative bg-gradient-to-br from-[#18344C] to-[#004D6D] rounded-2xl p-8 text-center cursor-pointer overflow-hidden border-0 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#18344C]/30 transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#6FAEDF]/15 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-[#6FAEDF]/25 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-7 h-7 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cta.icon} />
                    </svg>
                  </div>
                  <div className="text-[#C5CCD5]/70 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: buttonFont }}>{cta.top}</div>
                  <div className="text-white text-2xl tracking-wide font-black mb-3" style={{ fontFamily: headingFont }}>
                    {cta.bottom}
                  </div>
                  <p className="text-[#C5CCD5]/40 text-xs leading-relaxed mb-4 max-w-[200px] mx-auto">{cta.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-[#6FAEDF] text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ fontFamily: buttonFont }}>
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div>
  );
}
