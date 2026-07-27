"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const headingFont = "var(--font-exo2), Arial Black, sans-serif";
const buttonFont = "var(--font-barlow), Arial, sans-serif";

const jobs = [
  {
    title: "Warehouse Associate",
    type: "Full Time",
    company: "Stingray Boats",
    location: "Hartsville, SC 29550",
    coords: "34.3743,-80.0734",
    description:
      "Warehouse Associate Job Summary We are seeking a dependable and hardworking Warehouse Associate to join our team. The Warehouse Associate is responsible for receiving, storing, and distributing materials, tools, equipment, and products within the warehouse, ensuring accuracy and timeliness in all warehouse activities.",
  },
];

const workEnvOptions = [
  "Fully Remote",
  "Optional Work from Home",
  "Hybrid",
  "Temporary Remote",
];

export default function OpeningsPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const [workEnv, setWorkEnv] = useState<string[]>([]);
  const [hotJob, setHotJob] = useState<string[]>([]);
  const [showWorkEnvDropdown, setShowWorkEnvDropdown] = useState(false);
  const [showHotJobDropdown, setShowHotJobDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<"positions" | "locations">("positions");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [modalView, setModalView] = useState<"create" | "signin">("create");
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showQuickApply, setShowQuickApply] = useState(false);
  const [quickApplyView, setQuickApplyView] = useState<"apply" | "signin" | "create">("apply");
  const [smsConsent, setSmsConsent] = useState<string>("");
  const [showTalentModal, setShowTalentModal] = useState(false);
  const [talentView, setTalentView] = useState<"create" | "signin">("create");

  const workEnvRef = useRef<HTMLDivElement>(null);
  const hotJobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workEnvRef.current && !workEnvRef.current.contains(event.target as Node)) {
        setShowWorkEnvDropdown(false);
      }
      if (hotJobRef.current && !hotJobRef.current.contains(event.target as Node)) {
        setShowHotJobDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <img
          src="/openings/DJI_20240919170558_0018_D.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#18344C]/45" />
        {/* Bottom inner curve */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ height: "80px" }}>
            <path d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V100H0V100Z" fill="#f5f6f8" />
          </svg>
        </div>

        {/* Hero text */}
        <div className="relative text-center px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight mb-4 uppercase font-black"
              style={{ fontFamily: headingFont }}
            >
              Find Your Next Opportunity
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto">
              Legendary Performance, Unsurpassed Since 1979
            </p>
          </motion.div>
        </div>

      </header>

      {/* Search & Filters - overlaps hero bottom */}
      <motion.div
          className="relative z-30 w-full max-w-7xl mx-auto px-6 -mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-5">
          {/* View Mode Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => { setViewMode("positions"); setSelectedJob(null); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                viewMode === "positions"
                  ? "bg-[#004D6D] text-white shadow-md"
                  : "bg-[#f5f6f8] text-[#18344C]/60 hover:text-[#18344C] hover:bg-[#e8ebef]"
              }`}
              style={{ fontFamily: buttonFont }}
            >
              All Positions
            </button>
            <button
              onClick={() => { setViewMode("locations"); setSelectedJob(null); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                viewMode === "locations"
                  ? "bg-[#004D6D] text-white shadow-md"
                  : "bg-[#f5f6f8] text-[#18344C]/60 hover:text-[#18344C] hover:bg-[#e8ebef]"
              }`}
              style={{ fontFamily: buttonFont }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              By Location
            </button>
          </div>

          {/* Search inputs row */}
          <div className="flex flex-col lg:flex-row items-end gap-3">
            <div className="flex-1 w-full lg:w-auto">
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block">
                Search by keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skills, etc."
                className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all"
              />
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block">
                City, State, ZIP code
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Hartsville, SC"
                className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all"
              />
            </div>

            {/* Work Environment Dropdown */}
            <div className="relative w-full lg:w-auto" ref={workEnvRef}>
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">Filter</label>
              <button
                onClick={() => { setShowWorkEnvDropdown(!showWorkEnvDropdown); setShowHotJobDropdown(false); }}
                className="w-full lg:w-auto flex items-center gap-2 px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] hover:border-[#6FAEDF] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Work Environment</span>
                {workEnv.length > 0 && (
                  <span className="bg-[#6FAEDF] text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{workEnv.length}</span>
                )}
                <svg className={`w-3.5 h-3.5 transition-transform ${showWorkEnvDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showWorkEnvDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#C5CCD5] rounded-lg shadow-lg z-20 min-w-[240px]">
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-[#C5CCD5]/30 mb-1">
                      <button onClick={() => setWorkEnv(workEnv.length === workEnvOptions.length ? [] : [...workEnvOptions])} className="text-xs font-semibold text-[#6FAEDF] hover:text-[#004D6D] cursor-pointer">
                        {workEnv.length === workEnvOptions.length ? "Clear" : "Select all"}
                      </button>
                      {workEnv.length > 0 && <button onClick={() => setWorkEnv([])} className="text-xs text-[#18344C]/40 hover:text-[#18344C] cursor-pointer">Clear</button>}
                    </div>
                    {workEnvOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5f6f8] rounded cursor-pointer">
                        <input type="checkbox" checked={workEnv.includes(option)} onChange={(e) => { if (e.target.checked) setWorkEnv([...workEnv, option]); else setWorkEnv(workEnv.filter((v) => v !== option)); }} className="w-4 h-4 rounded border-[#C5CCD5] text-[#004D6D] accent-[#004D6D]" />
                        <span className="text-sm text-[#18344C]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hot Job Dropdown */}
            <div className="relative w-full lg:w-auto" ref={hotJobRef}>
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">Filter</label>
              <button
                onClick={() => { setShowHotJobDropdown(!showHotJobDropdown); setShowWorkEnvDropdown(false); }}
                className="w-full lg:w-auto flex items-center gap-2 px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] hover:border-[#6FAEDF] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Hot Job</span>
                {hotJob.length > 0 && (
                  <span className="bg-[#6FAEDF] text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{hotJob.length}</span>
                )}
                <svg className={`w-3.5 h-3.5 transition-transform ${showHotJobDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showHotJobDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#C5CCD5] rounded-lg shadow-lg z-20 min-w-[160px]">
                  <div className="p-2">
                    {["Yes", "No"].map((option) => (
                      <label key={option} className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5f6f8] rounded cursor-pointer">
                        <input type="checkbox" checked={hotJob.includes(option)} onChange={(e) => { if (e.target.checked) setHotJob([...hotJob, option]); else setHotJob(hotJob.filter((v) => v !== option)); }} className="w-4 h-4 rounded border-[#C5CCD5] text-[#004D6D] accent-[#004D6D]" />
                        <span className="text-sm text-[#18344C]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full lg:w-auto">
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">Action</label>
              <button className="w-full lg:w-auto bg-[#004D6D] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#18344C] transition-colors text-sm tracking-wide cursor-pointer whitespace-nowrap" style={{ fontFamily: buttonFont }}>
                Filter Jobs
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Talent Community Panel - below search bar */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-4 relative z-20">
        <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #18344C 0%, #004D6D 100%)" }}>
          <svg className="w-5 h-5 text-[#6FAEDF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-white/85">
            Can&apos;t find what you&apos;re looking for?{" "}
            <button
              onClick={() => { setShowTalentModal(true); setTalentView("create"); }}
              className="text-[#6FAEDF] font-semibold hover:text-white transition-colors cursor-pointer underline"
            >
              Join our Talent Community
            </button>{" "}
            to stay updated on career opportunities.
          </p>
        </div>
      </div>

      {/* Welcome Banner with Create Job Alerts */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-6 relative z-20">
        <motion.div
          className="rounded-xl p-6 mb-6 overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #18344C 0%, #004D6D 100%)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-8 h-8 bg-[#6FAEDF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white/85 text-sm leading-relaxed">
                Welcome to our Careers Portal! If you do not see an open position that matches your qualifications at this time please create a candidate profile by selecting &ldquo;Create Account&rdquo; on the right-hand side to be considered for future openings.
              </p>
            </div>
            <button
              onClick={() => setShowAlertModal(true)}
              className="bg-[#6FAEDF] text-[#18344C] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors text-sm whitespace-nowrap cursor-pointer shadow-lg shadow-black/10"
              style={{ fontFamily: buttonFont }}
            >
              Create Job Alerts
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-12 w-full flex-1">
        {/* Job Detail View */}
        {selectedJob !== null ? (
          <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {(() => { const job = jobs[selectedJob]; return (
              <div className="bg-white rounded-xl border border-[#C5CCD5]/30 overflow-hidden">
                {/* Detail Header */}
                <div className="px-6 md:px-8 py-4 md:py-5 border-b border-[#C5CCD5]/20" style={{ background: "linear-gradient(135deg, #18344C 0%, #004D6D 100%)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-white text-[#18344C] shadow-sm">{job.type}</span>
                    <button onClick={() => setSelectedJob(null)} className="flex items-center gap-2 text-[#6FAEDF] text-sm font-medium hover:text-white transition-colors cursor-pointer" style={{ fontFamily: buttonFont }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      Back to Results
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h1 className="text-2xl md:text-3xl text-white font-black uppercase tracking-tight" style={{ fontFamily: headingFont }}>{job.title}</h1>
                      <div className="flex items-center gap-2 mt-1 text-[#C5CCD5]/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="text-sm">{job.company} | {job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detail Body */}
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-[1fr_280px] gap-8">
                    <div>
                      <h2 className="text-lg font-bold text-[#18344C] mb-4" style={{ fontFamily: headingFont }}>Job Summary</h2>
                      <p className="text-[#18344C]/70 text-sm leading-relaxed mb-6">{job.description}</p>

                      <h2 className="text-lg font-bold text-[#18344C] mb-4" style={{ fontFamily: headingFont }}>Responsibilities</h2>
                      <ul className="space-y-2.5 mb-6">
                        {["Receive, unload, and process incoming shipments accurately", "Organize and maintain inventory in designated warehouse areas", "Pick, pack, and prepare orders for shipment", "Operate warehouse equipment such as forklifts and pallet jacks", "Perform regular inventory counts and reconcile discrepancies", "Maintain a clean, safe, and organized work environment", "Collaborate with team members to meet daily operational goals"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#18344C]/70">
                            <svg className="w-4 h-4 text-[#6FAEDF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <h2 className="text-lg font-bold text-[#18344C] mb-4" style={{ fontFamily: headingFont }}>Requirements</h2>
                      <ul className="space-y-2.5">
                        {["High school diploma or equivalent", "Ability to lift up to 50 lbs regularly", "Strong attention to detail and organizational skills", "Reliable and punctual with a strong work ethic", "Ability to work in a fast paced environment", "Prior warehouse or manufacturing experience preferred"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-[#18344C]/70">
                            <svg className="w-4 h-4 text-[#6FAEDF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                      <div className="bg-[#f5f6f8] rounded-xl p-5">
                        <h3 className="text-sm font-bold text-[#18344C] mb-3" style={{ fontFamily: headingFont }}>Job Details</h3>
                        <div className="space-y-3">
                          {[{ label: "Company", value: job.company }, { label: "Location", value: job.location }, { label: "Job Type", value: job.type }, { label: "Department", value: "Manufacturing" }].map((d) => (
                            <div key={d.label}>
                              <div className="text-[10px] font-semibold text-[#18344C]/40 uppercase tracking-wider">{d.label}</div>
                              <div className="text-sm text-[#18344C]/80 font-medium">{d.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => { setShowQuickApply(true); setQuickApplyView("apply"); }} className="w-full bg-[#004D6D] text-white font-bold py-3 rounded-lg hover:bg-[#18344C] transition-colors text-sm tracking-wide cursor-pointer" style={{ fontFamily: buttonFont }}>
                        Quick Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ); })()}
          </motion.div>
        ) : viewMode === "positions" ? (
          <motion.div key="positions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center mb-4">
              <p className="text-sm font-semibold text-[#18344C]">
                <span className="text-[#004D6D] text-xl font-black mr-1">{jobs.length}</span>
                Result{jobs.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={index} onClick={() => setSelectedJob(index)} className="bg-white rounded-xl p-6 border border-[#C5CCD5]/30 hover:border-[#6FAEDF]/50 hover:shadow-md hover:translate-x-1 transition-all duration-300 cursor-pointer group">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#004D6D] group-hover:text-[#6FAEDF] transition-colors" style={{ fontFamily: headingFont }}>{job.title}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <svg className="w-3.5 h-3.5 text-[#C5CCD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-[#18344C]/60">{job.company} | {job.location}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#6FAEDF]/10 text-[#004D6D] whitespace-nowrap self-start">{job.type}</span>
                  </div>
                  <p className="text-sm text-[#18344C]/60 leading-relaxed line-clamp-2">{job.description}</p>
                  <div className="mt-4 flex items-center text-[#6FAEDF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-[#18344C]/40">{jobs.length} Result{jobs.length !== 1 ? "s" : ""}</div>
              <div className="flex items-center gap-2 text-sm text-[#18344C]/60">
                <span>Show:</span>
                <select className="border border-[#C5CCD5] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#6FAEDF] bg-white text-[#18344C] cursor-pointer">
                  <option>10</option><option>25</option><option>50</option>
                </select>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="locations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#004D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl text-[#18344C] tracking-tight uppercase font-black" style={{ fontFamily: headingFont }}>Job Locations</h2>
                <p className="text-[#18344C]/50 text-sm">Find open positions near you</p>
              </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              <div className="rounded-xl overflow-hidden border border-[#C5CCD5]/30 shadow-sm h-[400px] lg:h-auto min-h-[400px]">
                <iframe title="Stingray Boats Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5!2d-80.0756!3d34.3743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854a0e4c0f3e8ed%3A0x4d3b3e3e3e3e3e3e!2s625%20Railroad%20Ave%2C%20Hartsville%2C%20SC%2029550!5e0!3m2!1sen!2sus!4v1700000000000" className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="flex flex-col">
                <div className="mb-4">
                  <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1.5 block">Search by job title</label>
                  <div className="relative">
                    <input type="text" value={mapSearch} onChange={(e) => setMapSearch(e.target.value)} placeholder="e.g. Warehouse Associate" className="w-full pl-9 pr-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    <svg className="w-4 h-4 text-[#C5CCD5] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[320px] pr-1">
                  {jobs.filter((job) => job.title.toLowerCase().includes(mapSearch.toLowerCase())).map((job, index) => (
                    <div key={index} onClick={() => setSelectedJob(index)} className="bg-[#f5f6f8] rounded-xl p-4 border border-transparent hover:border-[#6FAEDF]/40 hover:bg-[#6FAEDF]/5 transition-all cursor-pointer group">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-[#004D6D] text-sm group-hover:text-[#6FAEDF] transition-colors" style={{ fontFamily: headingFont }}>{job.title}</h4>
                        <span className="text-[10px] font-semibold bg-[#6FAEDF]/10 text-[#004D6D] px-2 py-0.5 rounded-full whitespace-nowrap">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#18344C]/50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{job.company} | {job.location}</span>
                      </div>
                    </div>
                  ))}
                  {jobs.filter((job) => job.title.toLowerCase().includes(mapSearch.toLowerCase())).length === 0 && (
                    <div className="text-center py-8 text-[#18344C]/40 text-sm">No jobs found matching your search.</div>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-[#C5CCD5]/30 flex items-center justify-between">
                  <p className="text-xs text-[#18344C]/50"><span className="font-bold text-[#004D6D]">{jobs.filter((job) => job.title.toLowerCase().includes(mapSearch.toLowerCase())).length}</span> Result</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#18344C]/40">
                    <span>Show:</span>
                    <select className="border border-[#C5CCD5] rounded px-1.5 py-0.5 text-xs bg-white cursor-pointer"><option>10</option><option>25</option></select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />

      {/* Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowAlertModal(false); setModalView("create"); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll">
            <div className="p-6 md:p-8">
              {/* Close button */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-[#18344C] uppercase tracking-tight" style={{ fontFamily: headingFont }}>
                  {modalView === "create" ? "Create Job Alerts" : "Sign In"}
                </h2>
                <button onClick={() => { setShowAlertModal(false); setModalView("create"); }} className="text-[#18344C]/40 hover:text-[#18344C] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {modalView === "create" ? (
                <>
                  <p className="text-[#18344C]/60 text-sm leading-relaxed mb-6">
                    Providing your contact information allows us to email you when a job matching your selected filters is added to our job board. By completing the form below, you will be creating an account to stay notified.
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal First Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal Last Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Email <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <p className="text-sm text-[#18344C]/50 mt-5 text-center">
                    Already have an account?{" "}
                    <button onClick={() => setModalView("signin")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">
                      Sign In
                    </button>
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => { setShowAlertModal(false); setModalView("create"); }} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>
                      Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-center">
                    <p className="text-sm text-[#18344C]/50">
                      Don&apos;t have an account yet?{" "}
                      <button onClick={() => setModalView("create")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">
                        Create Account
                      </button>
                    </p>
                    <p>
                      <button className="text-sm text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">
                        Forgot your password?
                      </button>
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => { setShowAlertModal(false); setModalView("create"); }} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>
                      Cancel
                    </button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>
                      Sign In
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Quick Apply Modal */}
      {showQuickApply && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowQuickApply(false); setQuickApplyView("apply"); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-[#18344C] uppercase tracking-tight" style={{ fontFamily: headingFont }}>
                  {quickApplyView === "apply" ? "Quick Apply" : quickApplyView === "signin" ? "Sign In" : "Create Account"}
                </h2>
                <button onClick={() => { setShowQuickApply(false); setQuickApplyView("apply"); }} className="text-[#18344C]/40 hover:text-[#18344C] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {quickApplyView === "apply" ? (
                <>
                  <p className="text-xs font-semibold text-[#6FAEDF] uppercase tracking-wider mb-5">Contact Information</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal First Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal Last Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Email <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Primary Phone Number</label>
                      <input type="tel" placeholder="xxx xxx xxxx" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>

                    {/* SMS Consent */}
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-2 block">
                        Do you consent to receiving text communications related to your job application via SMS from Stingray Boats, which may include auto dialed and automated messages, at the mobile number provided? Message frequency may vary and applicable data rates may apply. See Terms of Use and Privacy Policy for more details. <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-6 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="smsConsent" value="yes" checked={smsConsent === "yes"} onChange={(e) => setSmsConsent(e.target.value)} className="w-4 h-4 accent-[#004D6D]" />
                          <span className="text-sm text-[#18344C]">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="smsConsent" value="no" checked={smsConsent === "no"} onChange={(e) => setSmsConsent(e.target.value)} className="w-4 h-4 accent-[#004D6D]" />
                          <span className="text-sm text-[#18344C]">No</span>
                        </label>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Resume/CV</label>
                      <div className="border-2 border-dashed border-[#C5CCD5] rounded-lg p-5 text-center hover:border-[#6FAEDF] transition-colors">
                        <svg className="w-8 h-8 text-[#C5CCD5] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <label className="cursor-pointer">
                          <span className="text-sm text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors">Choose file</span>
                          <span className="text-sm text-[#18344C]/50"> or drag and drop</span>
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                        </label>
                        <p className="text-xs text-[#18344C]/40 mt-1">Max 1 file per upload (5.00 MB size limit per file)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 text-center">
                    <p className="text-sm text-[#18344C]/50">
                      Already have an account?{" "}
                      <button onClick={() => setQuickApplyView("signin")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Sign In</button>
                    </p>
                    <p className="text-sm text-[#18344C]/50">
                      Don&apos;t have an account yet?{" "}
                      <button onClick={() => setQuickApplyView("create")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Create Account</button>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => { setShowQuickApply(false); setQuickApplyView("apply"); }} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>Cancel</button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>Next</button>
                  </div>
                </>
              ) : quickApplyView === "signin" ? (
                <>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-center">
                    <p className="text-sm text-[#18344C]/50">Don&apos;t have an account yet?{" "}<button onClick={() => setQuickApplyView("create")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Create Account</button></p>
                    <p><button className="text-sm text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Forgot your password?</button></p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => setQuickApplyView("apply")} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>Cancel</button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>Sign In</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[#18344C]/60 text-sm leading-relaxed mb-6 mt-2">Create an account to apply and track your applications.</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal First Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal Last Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Email <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <p className="text-sm text-[#18344C]/50 mt-5 text-center">Already have an account?{" "}<button onClick={() => setQuickApplyView("signin")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Sign In</button></p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => setQuickApplyView("apply")} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>Cancel</button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>Next</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Talent Community Modal */}
      {showTalentModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowTalentModal(false); setTalentView("create"); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto modal-scroll">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-black text-[#18344C] uppercase tracking-tight" style={{ fontFamily: headingFont }}>
                  {talentView === "create" ? "Join the Talent Community" : "Sign In"}
                </h2>
                <button onClick={() => { setShowTalentModal(false); setTalentView("create"); }} className="text-[#18344C]/40 hover:text-[#18344C] transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {talentView === "create" ? (
                <>
                  <p className="text-[#18344C]/60 text-sm leading-relaxed mb-6">
                    We invite you to stay connected with us to learn about opportunities by joining our Talent Community below.
                  </p>
                  <p className="text-xs font-semibold text-[#6FAEDF] uppercase tracking-wider mb-4">Account Creation Details</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal First Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Legal Last Name <span className="text-red-500">*</span></label>
                        <input type="text" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Email <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Confirm Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Primary Phone Number</label>
                      <input type="tel" placeholder="xxx xxx xxxx" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <p className="text-sm text-[#18344C]/50 mt-5 text-center">
                    Already have an account?{" "}
                    <button onClick={() => setTalentView("signin")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Sign In</button>
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => { setShowTalentModal(false); setTalentView("create"); }} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>Cancel</button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>Next</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#18344C]/70 mb-1.5 block">Password <span className="text-red-500">*</span></label>
                      <input type="password" className="w-full px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all" />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-center">
                    <p className="text-sm text-[#18344C]/50">
                      Don&apos;t have an account yet?{" "}
                      <button onClick={() => setTalentView("create")} className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Create Account</button>
                    </p>
                    <p>
                      <button className="text-sm text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">Forgot your password?</button>
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#C5CCD5]/30">
                    <button onClick={() => { setShowTalentModal(false); setTalentView("create"); }} className="px-6 py-2.5 text-sm font-semibold text-[#18344C]/60 hover:text-[#18344C] rounded-lg hover:bg-[#f5f6f8] transition-all cursor-pointer" style={{ fontFamily: buttonFont }}>Cancel</button>
                    <button className="px-6 py-2.5 text-sm font-semibold bg-[#004D6D] text-white rounded-lg hover:bg-[#18344C] transition-colors cursor-pointer shadow-md" style={{ fontFamily: buttonFont }}>Sign In</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
