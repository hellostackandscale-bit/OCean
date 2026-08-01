// ============================================
// Industries Page
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hospital, FlaskConical, Microscope, Stethoscope, Siren, Building2 } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Hospital, FlaskConical, Microscope, Stethoscope, Siren, Building2,
};

export default function IndustriesPage() {
  return (
    <>
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Industries <span className="text-gradient">We Serve</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Providing medical gas pipeline solutions across the healthcare ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, i) => {
              const Icon = iconMap[industry.icon] || Hospital;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-6 sm:p-8 rounded-2xl bg-white text-center transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--color-primary-light)" }}
                  >
                    <Icon size={28} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {industry.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {industry.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Serving Your Industry?
            </h3>
            <p className="text-lg mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Get in touch to discuss how we can support your healthcare infrastructure needs.
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Contact Us <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
