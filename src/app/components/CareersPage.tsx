"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";

const headingFont = "var(--font-eurostile), Arial Black, sans-serif";
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

// Open Roles data
const openRoles = [
  {
    title: "Warehouse Associate",
    type: "Full Time",
    department: "Operations",
    location: "Hartsville, SC 29550",
    description:
      "We are seeking a dependable and hardworking Warehouse Associate to join our team. Responsible for receiving, storing, and distributing materials, tools, equipment, and products within the warehouse.",
  },
  {
    title: "Fiberglass Laminator",
    type: "Full Time",
    department: "Manufacturing",
    location: "Hartsville, SC 29550",
    description:
      "Join our production team as a Fiberglass Laminator. You will be responsible for laying fiberglass materials and applying resin to boat molds, ensuring quality construction standards.",
  },
  {
    title: "Gel Coat Technician",
    type: "Full Time",
    department: "Manufacturing",
    location: "Hartsville, SC 29550",
    description:
      "We are looking for a skilled Gel Coat Technician to apply gel coat finishes to boat hulls and decks. Attention to detail and quality workmanship are essential.",
  },
  {
    title: "Assembly Technician",
    type: "Full Time",
    department: "Manufacturing",
    location: "Hartsville, SC 29550",
    description:
      "Assemble boat components including hardware, electrical systems, and interior fittings. Work as part of a team to build top-quality powerboats.",
  },
];

// Benefits tiles data
const benefitsTiles = [
  {
    title: "4-Day Work Weeks",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description:
      "Enjoy a better work-life balance with our Monday through Thursday schedule. Three-day weekends every week give you more time with family and for the things you love.",
  },
  {
    title: "401K Retirement",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Invest in your future with our competitive 401K retirement plan. Stingray supports your long-term financial goals with company contributions to help you build a secure retirement.",
  },
  {
    title: "Career Progression",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description:
      "Grow your career at Stingray. We promote from within and provide clear pathways for advancement. Many of our leaders started on the production floor and worked their way up.",
  },
  {
    title: "Medical Insurance",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    description:
      "Comprehensive medical coverage for you and your family. Our health insurance plans are designed to keep you and your loved ones protected with affordable premiums.",
  },
  {
    title: "Dental & Vision",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    description:
      "Full dental and vision benefits included. From routine checkups to specialized care, we ensure your complete health and wellness needs are covered.",
  },
  {
    title: "Paid Vacation & Holidays",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "Recharge and refresh with generous paid time off and holiday schedules. We believe time away from work is essential for maintaining peak performance and happiness.",
  },
  {
    title: "Life Insurance",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "Peace of mind with company-provided life insurance coverage. Optional supplemental plans are also available so you can tailor your protection to fit your family's needs.",
  },
  {
    title: "Disability Coverage",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "Optional short-term and long-term disability insurance to protect your income if you're unable to work. We've got you covered when life throws a curveball.",
  },
];

// Employee testimonials data
const testimonials = [
  {
    name: "James T.",
    role: "Assembly Technician",
    department: "Manufacturing",
    years: "8 years",
    quote:
      "I started here right out of high school and have built a real career. The 4-day work week gives me time to coach my son's baseball team, and the progression opportunities mean I'm always learning something new. Stingray treats us like family.",
  },
  {
    name: "Maria S.",
    role: "Design Engineer",
    department: "Engineering",
    years: "5 years",
    quote:
      "Working on boat designs that actually hit the water is incredibly rewarding. The engineering team is collaborative, and leadership genuinely listens to our ideas. Plus, the benefits package rivals companies twice our size.",
  },
  {
    name: "Kevin R.",
    role: "HR Coordinator",
    department: "Office",
    years: "3 years",
    quote:
      "The culture at Stingray is unlike anywhere I've worked before. From the front office to the plant floor, everyone is pulling in the same direction. The 401K match and medical coverage made it an easy decision to join.",
  },
  {
    name: "Danielle W.",
    role: "Quality Inspector",
    department: "Manufacturing",
    years: "6 years",
    quote:
      "Quality isn't just a department here — it's a mindset. I take pride in knowing every boat that leaves our facility meets the highest standards. The Monday-Thursday schedule has been a game changer for my family.",
  },
  {
    name: "Carlos M.",
    role: "Production Supervisor",
    department: "Manufacturing",
    years: "12 years",
    quote:
      "I started as a laminator and worked my way up to supervisor. Stingray invested in my growth every step of the way. The benefits, the schedule, and the people — there's a reason so many of us have been here for over a decade.",
  },
  {
    name: "Sarah L.",
    role: "Accounting Specialist",
    department: "Office",
    years: "4 years",
    quote:
      "Coming from a big corporate environment, I was amazed at how much Stingray values each employee. The three-day weekends, paid holidays, and genuine team atmosphere make this the best job I've ever had.",
  },
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

  // Culture carousel state
  const [currentImage, setCurrentImage] = useState(0);

  // Testimonial carousel state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Culture auto-rotation
  const nextCultureImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % cultureImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextCultureImage, 5000);
    return () => clearInterval(interval);
  }, [nextCultureImage]);

  // About gallery auto-advance (slowed to 3500ms)
  const startAutoAdvance = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setAboutDir(1);
      setAboutIdx((prev) => prev + 1);
    }, 3500);
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

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentAboutImg = aboutImages[mod(aboutIdx, aboutImages.length)];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ===== HERO SECTION — Video Background ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/shared-video/YTDown.com_YouTube_Heritage-In-Motion_Media_ADkh4jp1Lr4_001_1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#18344C]/55" />

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
            <a
              href="#open-roles"
              className="group inline-flex items-center gap-3 bg-white text-[#18344C] font-bold px-8 py-4 rounded-lg hover:bg-[#6FAEDF] hover:text-white transition-all duration-300 text-base md:text-lg tracking-wide shadow-lg shadow-white/20"
              style={{ fontFamily: buttonFont }}
            >
              Explore Opportunities
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
            <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V100H0V100Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
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

              {/* 3 Tags */}
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

            {/* Right: Image Gallery (slowed to 3500ms) */}
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

      {/* ===== BENEFITS SECTION — Tile Format ===== */}
      <div className="relative z-10" style={{ marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
          <path d="M0 0C0 0 360 100 720 100C1080 100 1440 0 1440 0V100H0V0Z" fill="#18344C" />
        </svg>
      </div>

      <section className="py-20 md:py-28 bg-[#18344C] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              className="text-3xl md:text-4xl text-white mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Benefits & Perks
            </h2>
            <p className="text-[#C5CCD5]/60 mt-3 max-w-2xl mx-auto">
              At Stingray, we invest in our people. From 4-day work weeks to comprehensive
              benefits, here&apos;s what makes working here exceptional.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {benefitsTiles.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={scaleIn}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#6FAEDF]/15 rounded-xl flex items-center justify-center mb-5 text-[#6FAEDF] group-hover:bg-[#6FAEDF]/25 group-hover:scale-110 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3
                  className="text-lg text-white font-bold mb-3 uppercase tracking-wide"
                  style={{ fontFamily: headingFont }}
                >
                  {benefit.title}
                </h3>
                <p className="text-[#C5CCD5]/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10" style={{ marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px", background: "white" }}>
          <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V0H0V100Z" fill="#18344C" />
        </svg>
      </div>

      {/* ===== OPEN ROLES SECTION ===== */}
      <section id="open-roles" className="py-20 md:py-28 px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Now Hiring
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Open Positions
            </h2>
            <p className="text-[#18344C]/50 mt-3 max-w-xl mx-auto">
              Join the Stingray family. Browse our current openings and find the role
              that&apos;s right for you.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {openRoles.map((job) => (
              <motion.div
                key={job.title}
                variants={fadeInUp}
                className="bg-white border border-[#C5CCD5]/30 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3
                      className="text-xl text-[#18344C] font-bold"
                      style={{ fontFamily: headingFont }}
                    >
                      {job.title}
                    </h3>
                    <p className="text-[#004D6D] text-sm font-semibold mt-1">
                      {job.department}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#6FAEDF]/10 text-[#004D6D] text-xs font-bold uppercase tracking-wider flex-shrink-0">
                    {job.type}
                  </span>
                </div>
                <p className="text-[#18344C]/60 text-sm leading-relaxed mb-5">
                  {job.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#18344C]/40 text-xs">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <Link
                    href="/openings"
                    className="inline-flex items-center gap-1.5 text-[#004D6D] text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ fontFamily: buttonFont }}
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link
              href="/openings"
              className="group inline-flex items-center gap-3 bg-[#18344C] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#004D6D] transition-all duration-300 text-base tracking-wide shadow-lg"
              style={{ fontFamily: buttonFont }}
            >
              View All Openings
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== EMPLOYEE TESTIMONIALS SECTION ===== */}
      <section
        className="py-20 md:py-28 px-6"
        style={{ background: "linear-gradient(180deg, #f8f9fb 0%, #e8ebef 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-[#6FAEDF] text-sm font-semibold tracking-[0.2em] uppercase">
              Our People
            </span>
            <h2
              className="text-3xl md:text-4xl text-[#18344C] mt-2 tracking-tight uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Employee Testimonials
            </h2>
            <p className="text-[#18344C]/50 mt-3 max-w-xl mx-auto">
              Hear from the people who make Stingray great — across manufacturing,
              engineering, and office roles.
            </p>
          </motion.div>

          {/* Featured Testimonial */}
          <div className="max-w-4xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-sm relative"
              >
                {/* Quote mark */}
                <div className="absolute top-6 left-8 text-[#6FAEDF]/15 text-8xl font-serif leading-none select-none">
                  &ldquo;
                </div>
                <div className="relative z-10">
                  <p className="text-[#18344C]/80 text-lg md:text-xl leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[testimonialIdx].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#004D6D] to-[#18344C] rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: headingFont }}>
                      {testimonials[testimonialIdx].name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[#18344C] font-bold" style={{ fontFamily: headingFont }}>
                        {testimonials[testimonialIdx].name}
                      </div>
                      <div className="text-[#004D6D] text-sm font-semibold">
                        {testimonials[testimonialIdx].role}
                      </div>
                      <div className="text-[#18344C]/40 text-xs">
                        {testimonials[testimonialIdx].department} &middot; {testimonials[testimonialIdx].years}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIdx(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === testimonialIdx
                      ? "bg-[#004D6D] w-8"
                      : "bg-[#C5CCD5]/40 w-2 hover:bg-[#C5CCD5]"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Department Tags */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {["Manufacturing", "Engineering", "Office"].map((dept) => (
              <span
                key={dept}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-[#18344C] text-sm font-semibold shadow-sm border border-[#C5CCD5]/20"
                style={{ fontFamily: buttonFont }}
              >
                {dept}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== OUR CULTURE SECTION ===== */}
      <div className="relative z-10" style={{ marginBottom: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
          <path d="M0 0C0 0 360 100 720 100C1080 100 1440 0 1440 0V100H0V0Z" fill="#18344C" />
        </svg>
      </div>

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

            {/* Caption tag */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <span className="inline-block px-5 py-2.5 rounded-full bg-white text-[#18344C] text-sm font-semibold shadow-lg">
                {cultureImages[currentImage].alt}
              </span>
            </div>

            {/* Left / Right nav */}
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

      <div className="relative z-10" style={{ marginTop: "-1px" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px", background: "white" }}>
          <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V0H0V100Z" fill="#18344C" />
        </svg>
      </div>

      {/* ===== CTA SECTION ===== */}
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
