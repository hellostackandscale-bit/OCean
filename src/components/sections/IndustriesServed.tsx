// ============================================
// Industries Served — Landing Page Section
// Clean Buttons & Structured Spacing
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
  CheckCircle2,
} from "lucide-react";

const industries = [
  {
    icon: Hospital,
    name: "Multi-Specialty & Govt Hospitals",
    description: "Centralized liquid oxygen (LMO) tank yards, automatic manifold plants, and floor-wise piping for 100+ bed facilities.",
    badge: "100+ Beds Setup",
    tags: ["LMO Tank Yard", "Automatic Manifold", "Bed Head Panels"],
  },
  {
    icon: Stethoscope,
    name: "Private Clinics & Nursing Homes",
    description: "Space-efficient 2-to-4 cylinder manual and semi-automatic manifold setups tailored for 10-50 bed facilities.",
    badge: "Compact MGPS",
    tags: ["2-4 Cylinder Rack", "Wall Gas Outlets", "Emergency Backup"],
  },
  {
    icon: Building2,
    name: "Modular Operation Theaters (OT)",
    description: "Surgical gas supply integration with ceiling pendants, shadowless lights, and sterile laminar air flow.",
    badge: "NABH Compliant",
    tags: ["Surgical Pendants", "NABH Compliant", "Laminar Air Flow"],
  },
  {
    icon: Siren,
    name: "ICUs & Emergency Trauma Care",
    description: "Uninterrupted high-pressure oxygen, medical air (4 bar/7 bar), and vacuum lines with zero downtime tolerance.",
    badge: "24/7 Redundancy",
    tags: ["Dual Manifolds", "Area Gas Alarms", "Continuous Vacuum"],
  },
  {
    icon: FlaskConical,
    name: "Diagnostic & Research Labs",
    description: "High-purity gas delivery systems (Nitrogen, Helium, Carbon Dioxide) with precise pressure regulation.",
    badge: "High-Purity Lines",
    tags: ["High-Purity Copper", "Needle Regulators", "Leak Sensors"],
  },
  {
    icon: Microscope,
    name: "Medical Colleges & Institutes",
    description: "Turnkey MGPS infrastructure for teaching hospitals, central gas plant rooms, and campus-wide underground piping.",
    badge: "Campus Network",
    tags: ["Central Plant Room", "Campus Network", "AMC Support"],
  },
];

export default function IndustriesServed() {
  return (
    <section className="section" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Industries We Serve</h2>
          <p>Delivering certified medical gas pipeline solutions across the healthcare ecosystem</p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {industries.map((item, i) => (
            <motion.div
              key={item.name}
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

        {/* View Page Link */}
        <div className="text-center pt-4 sm:pt-6">
          <Link href="/industries" className="btn btn-outline btn-lg w-full sm:w-auto justify-center">
            Explore All Healthcare Ecosystem Solutions <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
