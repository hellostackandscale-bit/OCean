// ============================================
// About Page — Ocean MGPS
// ============================================

"use client";

import { motion } from "framer-motion";
import { Award, Shield, Users, Clock, MapPin, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "Every product we supply meets Indian Standards specifications and hospital-grade safety requirements.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "We build lasting relationships with our clients by providing exceptional service and support.",
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "Our installations are built to last with 24/7 support and prompt maintenance services.",
  },
  {
    icon: Award,
    title: "Expertise",
    description: "With over a decade of experience, we bring unmatched technical knowledge to every project.",
  },
];

const milestones = [
  "Established in Aurangabad, Maharashtra",
  "First major hospital MGPS installation",
  "Expanded to modular OT solutions",
  "150+ successful project completions",
  "Pan-India service coverage",
  "Trusted by 50+ healthcare facilities",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              <MapPin size={14} /> Aurangabad, Maharashtra
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary-dark)",
              }}
            >
              About <span className="text-gradient">Ocean MGPS</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              We are a highly specialized stockist, supplier, and installer of Medical Gas Pipeline
              Systems and hospital equipment, dedicated to serving healthcare facilities across India
              with quality products and expert installation services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl font-bold mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary-dark)",
                }}
              >
                Our Story
              </h2>
              <div className="space-y-4" style={{ color: "var(--color-text-secondary)" }}>
                <p className="leading-relaxed">
                  Ocean MGPS Sales & Multi Services was founded with a singular mission — to provide
                  healthcare facilities across India with reliable, high-quality Medical Gas Pipeline
                  Systems and equipment. Based in Aurangabad, Maharashtra, we have grown into a trusted
                  name in the healthcare infrastructure industry.
                </p>
                <p className="leading-relaxed">
                  Under the leadership of <strong style={{ color: "var(--color-text-primary)" }}>Ganesh Khandale</strong>,
                  our team brings over a decade of hands-on experience in MGPS installation, hospital
                  equipment supply, and modular operation theater setup. We take pride in our &quot;Made in India&quot;
                  products and our commitment to quality.
                </p>
                <p className="leading-relaxed">
                  From supplying a single copper fitting to commissioning complete hospital gas pipeline
                  networks, we handle projects of every scale with the same dedication to excellence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-3">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white"
                    style={{ border: "1px solid var(--color-border-light)" }}
                  >
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }} />
                    <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {milestone}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl"
                style={{
                  background: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--color-primary-light)" }}
                >
                  <value.icon size={24} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  {value.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-6 sm:p-8 rounded-2xl bg-white"
            style={{
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              }}
            >
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                GK
              </span>
            </div>
            <h3
              className="text-xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary-dark)",
              }}
            >
              Ganesh Khandale
            </h3>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--color-primary)" }}>
              Founder & Managing Director
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              With over a decade of expertise in Medical Gas Pipeline Systems, Ganesh leads Ocean MGPS
              with a vision to make quality healthcare infrastructure accessible to every hospital across India.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
