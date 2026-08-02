// ============================================
// MGPS Information Page — Interactive & Modern UI
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  GitBranch,
  ShieldCheck,
  Plug,
  Settings,
  Monitor,
  CheckCircle2,
  Zap,
  Heart,
  BarChart3,
  X,
  Layers,
  Activity,
  ChevronRight,
} from "lucide-react";
import { MGPS_COMPONENTS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Gauge,
  GitBranch,
  ShieldCheck,
  Plug,
  Settings,
  Monitor,
};

const benefits = [
  {
    icon: Heart,
    title: "100% Patient Safety",
    description: "Continuous, uninterrupted medical gas supply with automatic dual-bank changeover systems.",
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description: "Centralized manifold room eliminates moving heavy gas cylinders into critical patient wards.",
  },
  {
    icon: ShieldCheck,
    title: "IS 7484 & NABH Compliant",
    description: "Designed, tested, and certified in strict adherence to Indian Standards and NABH guidelines.",
  },
  {
    icon: BarChart3,
    title: "Long-Term Cost Savings",
    description: "Eliminates gas leakage, reduces cylinder rental fees, and lowers maintenance overheads.",
  },
];

const systemFlow = [
  { step: "01", title: "Central Gas Source", desc: "Oxygen Manifold / LMO Tank Yard / Vacuum Pump / Compressor" },
  { step: "02", title: "Automatic Control Panel", desc: "Pressure reduction, dual bank changeover & line stabilization" },
  { step: "03", title: "Copper Pipeline Riser", desc: "Degreased medical copper pipes (IS 1545 / BS EN 13348 standard)" },
  { step: "04", title: "Zone Valves & Alarms", desc: "Floor-wise isolation valve boxes & digital area gas alarms" },
  { step: "05", title: "Terminal Outlets", desc: "Bed head panel units, OT ceiling pendants & wall gas sockets" },
];

export default function MGPSPage() {
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

  return (
    <>
      {/* Hero Header */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
            >
              <Gauge size={14} /> Hospital Infrastructure Guide
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Medical Gas Pipeline System <span className="text-gradient">(MGPS)</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Understanding central hospital gas supply architecture, IS 7484 safety standards, and pipeline components.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is MGPS */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[var(--color-border)] shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center">
                <Activity size={22} style={{ color: "var(--color-primary)" }} />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
              >
                What is an MGPS System?
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              <p>
                A <strong style={{ color: "var(--color-text-primary)" }}>Medical Gas Pipeline System (MGPS)</strong> is a
                centralized hospital infrastructure that safely delivers essential medical gases — including Oxygen (O₂), Nitrous Oxide (N₂O),
                Medical Air (4 Bar / 7 Bar), and Vacuum — directly to patient bedsides, ICUs, and Operation Theaters.
              </p>
              <p>
                By replacing cumbersome individual gas cylinders in wards with a centralized manifold plant and degreased copper pipeline network, MGPS ensures 24/7 continuous gas pressure, zero contamination, and instant emergency isolation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How MGPS Works — Flow Steps */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>How MGPS Works</h2>
            <p>The step-by-step central gas distribution pathway from manifold to bedside</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {systemFlow.map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl p-4 border border-[var(--color-border)] shadow-xs flex flex-col justify-between relative group hover:border-[var(--color-primary)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
                    >
                      Step {flow.step}
                    </span>
                    {i < systemFlow.length - 1 && (
                      <ChevronRight size={16} className="text-slate-300 hidden lg:block" />
                    )}
                  </div>
                  <h4
                    className="text-sm font-bold mb-1.5"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {flow.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {flow.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Key MGPS Components</h2>
            <p>The certified building blocks of a hospital gas pipeline network (Tap any for details)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {MGPS_COMPONENTS.map((component, i) => {
              const Icon = iconMap[component.icon] || Gauge;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedComponent(component)}
                  className="bg-white rounded-2xl p-6 cursor-pointer border border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: "var(--color-primary-light)",
                          boxShadow: "0 4px 12px rgba(21, 101, 192, 0.12)",
                        }}
                      >
                        <Icon size={24} style={{ color: "var(--color-primary)" }} />
                      </div>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Tap for specs →
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                    >
                      {component.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {component.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                    <span>Explore Component Scope</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Key Benefits for Healthcare Facilities</h2>
            <p>Why hospitals choose centralized gas pipeline systems</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[var(--color-border)] shadow-xs"
              >
                <div
                  className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center mt-0.5"
                  style={{
                    background: "var(--color-primary-light)",
                    boxShadow: "0 4px 12px rgba(21, 101, 192, 0.12)",
                  }}
                >
                  <benefit.icon size={24} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <h3
                    className="text-base sm:text-lg font-bold mb-1.5"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
          >
            Planning an MGPS Installation for Your Hospital?
          </h2>
          <p className="text-sm sm:text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Our engineering team in Ch. Sambhaji Nagar assists with architectural CAD planning, pipeline sizing, and BOQ estimation.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
            Request Technical Proposal <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Component Detail Modal */}
      <AnimatePresence>
        {selectedComponent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedComponent(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-4"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-light)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  MGPS Component Details
                </span>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                >
                  {selectedComponent.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {selectedComponent.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2 text-xs font-medium text-blue-900">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>Compliance & Safety Standards</span>
                </div>
                <p>
                  Manufactured & tested under IS 7484 / HTM 02-01 specifications. Degreased for high-purity medical oxygen service.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/contact?component=${encodeURIComponent(selectedComponent.title)}`}
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-primary btn-lg w-full justify-center text-sm"
                >
                  Inquire for {selectedComponent.title} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
