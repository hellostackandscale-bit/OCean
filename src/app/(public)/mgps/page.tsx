// ============================================
// MGPS Information Page
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, GitBranch, ShieldCheck, Plug, Settings, Monitor, CheckCircle2, Zap, Heart, BarChart3 } from "lucide-react";
import { MGPS_COMPONENTS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Gauge, GitBranch, ShieldCheck, Plug, Settings, Monitor,
};

const benefits = [
  { icon: Heart, title: "Patient Safety", description: "Continuous, uninterrupted medical gas supply with automatic changeover systems." },
  { icon: Zap, title: "Operational Efficiency", description: "Centralized supply eliminates the need for individual gas cylinders in each ward." },
  { icon: ShieldCheck, title: "Regulatory Compliance", description: "Designed and installed in compliance with IS 7484 and other relevant Indian standards." },
  { icon: BarChart3, title: "Cost Effective", description: "Reduced wastage, lower maintenance costs, and efficient gas utilization over time." },
];

export default function MGPSPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
            >
              <Gauge size={14} /> Technical Information
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Medical Gas Pipeline System <span className="text-gradient">(MGPS)</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              A comprehensive guide to understanding how Medical Gas Pipeline Systems work,
              their components, and why they are essential for modern healthcare facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is MGPS */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>
              What is MGPS?
            </h2>
            <div className="space-y-4" style={{ color: "var(--color-text-secondary)" }}>
              <p className="leading-relaxed">
                A <strong style={{ color: "var(--color-text-primary)" }}>Medical Gas Pipeline System (MGPS)</strong> is a
                centralized infrastructure that supplies medical gases — including Oxygen (O₂), Nitrous Oxide (N₂O),
                Medical Air, and Vacuum — to various clinical areas within a hospital through a network of copper pipelines.
              </p>
              <p className="leading-relaxed">
                Instead of relying on individual gas cylinders at each bedside, MGPS provides a safe, continuous, and efficient
                delivery system from a central manifold room to every outlet point in the facility — operating theaters,
                ICUs, wards, emergency rooms, and recovery areas.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Components */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Components of MGPS</h2>
            <p>The building blocks of a reliable medical gas pipeline system</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MGPS_COMPONENTS.map((component, i) => {
              const Icon = iconMap[component.icon] || Gauge;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-6"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "var(--color-primary-light)" }}
                  >
                    <Icon size={22} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>
                    {component.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {component.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" style={{ background: "var(--color-primary-light)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Benefits of MGPS</h2>
            <p>Why hospitals choose centralized gas pipeline systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-5 sm:p-6 rounded-xl bg-white"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: "var(--color-primary-light)" }}
                >
                  <benefit.icon size={20} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>
            Need MGPS for Your Hospital?
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Our expert team will help you plan, design, and install a complete Medical Gas Pipeline System tailored to your facility.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
