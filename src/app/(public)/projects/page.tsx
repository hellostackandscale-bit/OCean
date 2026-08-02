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

          {/* Filter */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 mb-8 sm:mb-10 justify-start sm:justify-center items-center">
            <Filter size={18} className="flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{
                  background: activeCategory === cat ? "var(--color-primary)" : "var(--color-bg-secondary)",
                  color: activeCategory === cat ? "#FFFFFF" : "var(--color-text-secondary)",
                  border: `1px solid ${activeCategory === cat ? "var(--color-primary)" : "var(--color-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                style={{ border: "1px solid var(--color-border)" }}
              >
                {/* Image */}
                <div
                  className="w-full h-48 flex items-center justify-center overflow-hidden"
                  style={{ background: "var(--color-primary-light)" }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Building2 size={40} style={{ color: "var(--color-primary)" }} className="opacity-30" />
                  )}
                </div>

                <div className="p-5">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
                  >
                    {project.category}
                  </span>
                  <h3
                    className="text-base font-bold mt-3 mb-2"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {project.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <Building2 size={14} style={{ color: "var(--color-primary)" }} />
                      {project.client}
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <MapPin size={14} style={{ color: "var(--color-primary)" }} />
                      {project.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      <Calendar size={14} style={{ color: "var(--color-primary)" }} />
                      {project.date}
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
