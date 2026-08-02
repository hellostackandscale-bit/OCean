// ============================================
// Industries Page — Ultra Clean Mobile & Desktop UI
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Hospital,
  Stethoscope,
  FlaskConical,
  Microscope,
  Siren,
  Building2,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const industries = [
  {
    id: "hospitals",
    icon: Hospital,
    name: "Multi-Specialty & Govt Hospitals",
    badge: "100+ Beds Turnkey",
    description: "Centralized liquid oxygen (LMO) tank yards, automatic manifold plants, and floor-wise piping for large healthcare facilities.",
    tags: ["LMO Tank Yard", "Automatic Manifold", "Bed Head Panels"],
  },
  {
    id: "clinics",
    icon: Stethoscope,
    name: "Private Clinics & Nursing Homes",
    badge: "Compact MGPS",
    description: "Space-efficient 2-to-4 cylinder manual and semi-automatic manifold setups tailored for 10-50 bed facilities.",
    tags: ["2-4 Cylinder Rack", "Wall Gas Outlets", "Emergency Backup"],
  },
  {
    id: "modular-ot",
    icon: Building2,
    name: "Modular Operation Theaters (OT)",
    badge: "NABH Compliant",
    description: "Surgical gas supply integration with ceiling pendants, shadowless lights, and sterile laminar air flow.",
    tags: ["Surgical Pendants", "NABH Compliant", "Laminar Air Flow"],
  },
  {
    id: "icu-trauma",
    icon: Siren,
    name: "ICUs & Emergency Trauma Care",
    badge: "24/7 Redundancy",
    description: "Uninterrupted high-pressure oxygen, medical air (4 bar/7 bar), and vacuum lines with zero downtime tolerance.",
    tags: ["Dual Manifolds", "Area Gas Alarms", "Continuous Vacuum"],
  },
  {
    id: "laboratories",
    icon: FlaskConical,
    name: "Diagnostic & Research Labs",
    badge: "High-Purity Lines",
    description: "High-purity gas delivery systems (Nitrogen, Helium, Carbon Dioxide) with precise pressure regulation.",
    tags: ["High-Purity Copper", "Needle Regulators", "Leak Sensors"],
  },
  {
    id: "institutes",
    icon: Microscope,
    name: "Medical Colleges & Institutes",
    badge: "Campus Infrastructure",
    description: "Turnkey MGPS infrastructure for teaching hospitals, central gas plant rooms, and campus-wide underground piping.",
    tags: ["Central Plant Room", "Campus Network", "AMC Support"],
  },
];

const industryStats = [
  { value: "150+", label: "Pipeline Projects" },
  { value: "50+", label: "Hospitals Served" },
  { value: "100%", label: "IS 7484 Compliance" },
  { value: "24/7", label: "Emergency Support" },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="section pb-6 sm:pb-8" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold shadow-xs"
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              <MapPin size={14} /> Ch. Sambhaji Nagar, Maharashtra • Serving Pan-India
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Industries <span className="text-gradient">We Serve</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Providing certified Medical Gas Pipeline Systems and hospital equipment across the healthcare ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-6 bg-white border-y border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {industryStats.map((stat, i) => (
              <div key={i} className="p-2.5 sm:p-4">
                <span
                  className="block text-2xl sm:text-3xl font-extrabold"
                  style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section pt-10 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industries.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 sm:p-7 border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary-light)",
                        boxShadow: "0 4px 12px rgba(21, 101, 192, 0.12)",
                      }}
                    >
                      <item.icon size={24} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: "var(--color-primary-light)",
                        color: "var(--color-primary)",
                        border: "1px solid rgba(21, 101, 192, 0.15)",
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-5">
                    {item.description}
                  </p>

                  {/* Feature Checklist List */}
                  <div className="space-y-2 mb-6">
                    {item.tags.map((tag, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60"
                      >
                        <CheckCircle2 size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 border-t border-[var(--color-border-light)] mt-auto">
                  <Link
                    href={`/contact?industry=${encodeURIComponent(item.name)}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-colors bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                  >
                    <span>Inquire for {item.name.split(" ")[0]}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
          >
            Planning Medical Gas Infrastructure for Your Facility?
          </h2>
          <p className="text-sm sm:text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Contact our technical team in Ch. Sambhaji Nagar for site evaluation, BOQ preparation, and IS 7484 safety guidance.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
            Request Technical Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
