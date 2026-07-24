"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

  const workEnvRef = useRef<HTMLDivElement>(null);
  const hotJobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        workEnvRef.current &&
        !workEnvRef.current.contains(event.target as Node)
      ) {
        setShowWorkEnvDropdown(false);
      }
      if (
        hotJobRef.current &&
        !hotJobRef.current.contains(event.target as Node)
      ) {
        setShowHotJobDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex flex-col">
      <Navbar />

      {/* Header */}
      <header
        className="px-6 pt-24 md:pt-28 pb-14"
        style={{
          background: "linear-gradient(135deg, #18344C 0%, #004D6D 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-2xl md:text-3xl text-white tracking-tight mb-1"
                style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
              >
                Stingray Boats Career Page
              </h1>
              <p className="text-[#C5CCD5]/70 text-sm">
                Find your next opportunity
              </p>
            </motion.div>
            <Link
              href="/"
              className="text-[#6FAEDF] text-sm font-medium hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Careers
            </Link>
          </div>
        </div>
      </header>

      {/* Search & Filters - ALL IN ONE ROW */}
      <motion.div
        className="max-w-6xl mx-auto px-6 -mt-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
          <div className="flex flex-col lg:flex-row items-end gap-3">
            {/* Keyword Search */}
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

            {/* Location */}
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
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">
                Filter
              </label>
              <button
                onClick={() => {
                  setShowWorkEnvDropdown(!showWorkEnvDropdown);
                  setShowHotJobDropdown(false);
                }}
                className="w-full lg:w-auto flex items-center gap-2 px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] hover:border-[#6FAEDF] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Work Environment</span>
                {workEnv.length > 0 && (
                  <span className="bg-[#6FAEDF] text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {workEnv.length}
                  </span>
                )}
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${showWorkEnvDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showWorkEnvDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 bg-white border border-[#C5CCD5] rounded-lg shadow-lg z-20 min-w-[240px]"
                >
                  <div className="p-2">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-[#C5CCD5]/30 mb-1">
                      <button
                        onClick={() =>
                          setWorkEnv(
                            workEnv.length === workEnvOptions.length
                              ? []
                              : [...workEnvOptions],
                          )
                        }
                        className="text-xs font-semibold text-[#6FAEDF] hover:text-[#004D6D] cursor-pointer"
                      >
                        {workEnv.length === workEnvOptions.length ? "Clear" : "Select all"}
                      </button>
                      {workEnv.length > 0 && (
                        <button
                          onClick={() => setWorkEnv([])}
                          className="text-xs text-[#18344C]/40 hover:text-[#18344C] cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {workEnvOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5f6f8] rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={workEnv.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setWorkEnv([...workEnv, option]);
                            } else {
                              setWorkEnv(workEnv.filter((v) => v !== option));
                            }
                          }}
                          className="w-4 h-4 rounded border-[#C5CCD5] text-[#004D6D] accent-[#004D6D]"
                        />
                        <span className="text-sm text-[#18344C]">{option}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Hot Job Dropdown */}
            <div className="relative w-full lg:w-auto" ref={hotJobRef}>
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">
                Filter
              </label>
              <button
                onClick={() => {
                  setShowHotJobDropdown(!showHotJobDropdown);
                  setShowWorkEnvDropdown(false);
                }}
                className="w-full lg:w-auto flex items-center gap-2 px-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] hover:border-[#6FAEDF] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Hot Job</span>
                {hotJob.length > 0 && (
                  <span className="bg-[#6FAEDF] text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {hotJob.length}
                  </span>
                )}
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${showHotJobDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showHotJobDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 bg-white border border-[#C5CCD5] rounded-lg shadow-lg z-20 min-w-[160px]"
                >
                  <div className="p-2">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#f5f6f8] rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={hotJob.includes(option)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setHotJob([...hotJob, option]);
                            } else {
                              setHotJob(hotJob.filter((v) => v !== option));
                            }
                          }}
                          className="w-4 h-4 rounded border-[#C5CCD5] text-[#004D6D] accent-[#004D6D]"
                        />
                        <span className="text-sm text-[#18344C]">{option}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Filter Jobs Button */}
            <div className="w-full lg:w-auto">
              <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1 block lg:invisible">
                Action
              </label>
              <button className="w-full lg:w-auto bg-[#004D6D] text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-[#18344C] transition-colors text-sm tracking-wide cursor-pointer whitespace-nowrap">
                Filter Jobs
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Talent Community Banner */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          className="rounded-xl p-6 mb-6 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #18344C 0%, #004D6D 100%)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Can&apos;t find what you&apos;re looking for?
              </h3>
              <p className="text-[#C5CCD5]/80 text-sm">
                Join our Talent Community to stay updated on career opportunities.
              </p>
            </div>
            <button className="bg-[#6FAEDF] text-[#18344C] font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors text-sm whitespace-nowrap cursor-pointer shadow-lg shadow-black/10">
              Join Talent Community
            </button>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          className="bg-white rounded-xl p-6 border border-[#C5CCD5]/30 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#6FAEDF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-[#004D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#18344C]/70 text-sm leading-relaxed">
              Welcome to our Careers Portal! If you do not see an open position
              that matches your qualifications at this time please create a
              candidate profile by selecting &ldquo;Create Account&rdquo; on the
              right-hand side to be considered for future openings.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto px-6 pb-12 w-full flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[#18344C]">
              <span className="text-[#004D6D] text-xl font-black mr-1">
                {jobs.length}
              </span>
              Result{jobs.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2 text-sm text-[#18344C]/60">
              <span>Show:</span>
              <select className="border border-[#C5CCD5] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#6FAEDF] bg-white text-[#18344C] cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-[#C5CCD5]/30 hover:border-[#6FAEDF]/50 hover:shadow-md transition-all duration-300 cursor-pointer group"
                whileHover={{ x: 4 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#004D6D] group-hover:text-[#6FAEDF] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <svg className="w-3.5 h-3.5 text-[#C5CCD5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-[#18344C]/60">
                        {job.company} - {job.location}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#6FAEDF]/10 text-[#004D6D] whitespace-nowrap self-start">
                    {job.type}
                  </span>
                </div>
                <p className="text-sm text-[#18344C]/60 leading-relaxed line-clamp-2">
                  {job.description}
                </p>
                <div className="mt-4 flex items-center text-[#6FAEDF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Details</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-[#18344C]/40">
            {jobs.length} Result{jobs.length !== 1 ? "s" : ""}
          </div>
        </motion.div>
      </div>

      {/* Job Location Map Section */}
      <section className="bg-white border-t border-[#C5CCD5]/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#6FAEDF]/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#004D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <h2
                  className="text-2xl text-[#18344C] tracking-tight"
                  style={{ fontFamily: "Arial Black, Arial, sans-serif" }}
                >
                  Job Locations
                </h2>
                <p className="text-[#18344C]/50 text-sm">
                  Find open positions near you
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-[#C5CCD5]/30 shadow-sm h-[400px] lg:h-auto min-h-[400px]">
                <iframe
                  title="Stingray Boats Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.5!2d-80.0756!3d34.3743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854a0e4c0f3e8ed%3A0x4d3b3e3e3e3e3e3e!2s625%20Railroad%20Ave%2C%20Hartsville%2C%20SC%2029550!5e0!3m2!1sen!2sus!4v1700000000000"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Sidebar - Job list on map */}
              <div className="flex flex-col">
                {/* Search */}
                <div className="mb-4">
                  <label className="text-[10px] font-semibold text-[#18344C]/60 uppercase tracking-wider mb-1.5 block">
                    Search by job title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={mapSearch}
                      onChange={(e) => setMapSearch(e.target.value)}
                      placeholder="e.g. Warehouse Associate"
                      className="w-full pl-9 pr-3 py-2.5 border border-[#C5CCD5] rounded-lg text-sm text-[#18344C] placeholder-[#C5CCD5] focus:outline-none focus:border-[#6FAEDF] focus:ring-2 focus:ring-[#6FAEDF]/20 transition-all"
                    />
                    <svg className="w-4 h-4 text-[#C5CCD5] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Job results on map */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[320px] pr-1">
                  {jobs
                    .filter((job) =>
                      job.title
                        .toLowerCase()
                        .includes(mapSearch.toLowerCase()),
                    )
                    .map((job, index) => (
                      <div
                        key={index}
                        className="bg-[#f5f6f8] rounded-xl p-4 border border-transparent hover:border-[#6FAEDF]/40 hover:bg-[#6FAEDF]/5 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-[#004D6D] text-sm group-hover:text-[#6FAEDF] transition-colors">
                            {job.title}
                          </h4>
                          <span className="text-[10px] font-semibold bg-[#6FAEDF]/10 text-[#004D6D] px-2 py-0.5 rounded-full whitespace-nowrap">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#18344C]/50">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>
                            {job.company} &mdash; {job.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  {jobs.filter((job) =>
                    job.title
                      .toLowerCase()
                      .includes(mapSearch.toLowerCase()),
                  ).length === 0 && (
                    <div className="text-center py-8 text-[#18344C]/40 text-sm">
                      No jobs found matching your search.
                    </div>
                  )}
                </div>

                {/* Result count */}
                <div className="mt-4 pt-3 border-t border-[#C5CCD5]/30 flex items-center justify-between">
                  <p className="text-xs text-[#18344C]/50">
                    <span className="font-bold text-[#004D6D]">
                      {jobs.filter((job) =>
                        job.title
                          .toLowerCase()
                          .includes(mapSearch.toLowerCase()),
                      ).length}
                    </span>{" "}
                    Result
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-[#18344C]/40">
                    <span>Show:</span>
                    <select className="border border-[#C5CCD5] rounded px-1.5 py-0.5 text-xs bg-white cursor-pointer">
                      <option>10</option>
                      <option>25</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Talent community under map */}
            <div className="mt-6 bg-[#f5f6f8] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#6FAEDF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-[#18344C]/70">
                  Can&apos;t find what you&apos;re looking for?{" "}
                  <button className="text-[#6FAEDF] font-semibold hover:text-[#004D6D] transition-colors cursor-pointer">
                    Join our Talent Community
                  </button>{" "}
                  to stay updated on career opportunities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
