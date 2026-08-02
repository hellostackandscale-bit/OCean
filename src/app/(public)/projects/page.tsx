// ============================================
// Projects Page — Gallery
// ============================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Building2, Filter } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";

const staticProjects = [
  { title: "Complete MGPS Installation — Shri Sai Hospital", client: "Shri Sai Hospital", location: "Ch. Sambhaji Nagar, MH", date: "Jan 2025", category: "MGPS Installation", image: "/images/projects/mgps-installation.png" },
  { title: "Modular OT & MGPS — Lifeline Multi-Specialty", client: "Lifeline Hospital", location: "Pune, MH", date: "Mar 2025", category: "Modular OT Setup", image: "/images/products/modular-ot.png" },
  { title: "Pipeline Renovation — District General Hospital", client: "District Hospital", location: "Nashik, MH", date: "Nov 2024", category: "Pipeline Work", image: "/images/projects/mgps-installation.png" },
  { title: "Greenfield MGPS — Apollo Care Hospital", client: "Apollo Care Hospital", location: "Mumbai, MH", date: "Aug 2024", category: "MGPS Installation", image: "/images/projects/mgps-installation.png" },
  { title: "Equipment Supply — Government Medical College", client: "Government Medical College", location: "Nagpur, MH", date: "Jun 2024", category: "Hospital Setup", image: "/images/products/manifold-system.png" },
  { title: "Emergency ICU Expansion — City Care Hospital", client: "City Care Hospital", location: "Ch. Sambhaji Nagar, MH", date: "Feb 2024", category: "MGPS Installation", image: "/images/products/bed-head-panel.png" },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = staticProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <>
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Completed <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Our track record of successful installations across India
            </p>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-10 sm:mb-12 justify-start sm:justify-center items-center scrollbar-none">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                    style={{
                      background: isSelected ? "var(--color-primary)" : "rgba(226, 232, 240, 0.6)",
                      color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid — Open Flat Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filtered.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container — Unboxed standalone rounded media element */}
                  <div className="w-full aspect-[16/10] sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden mb-4 bg-slate-100 shadow-xs relative">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50">
                        <Building2 size={40} className="text-[var(--color-primary)] opacity-30" />
                      </div>
                    )}
                  </div>

                  {/* Category Pill */}
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80 inline-block mb-1">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-base sm:text-lg font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-snug text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  {/* Metadata list */}
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
