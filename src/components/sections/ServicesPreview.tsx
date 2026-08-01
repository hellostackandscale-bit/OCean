// ============================================
// Services Preview — Landing Page Section
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, ShoppingBag, Settings, Stethoscope, Building2, Headphones } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "MGPS Installation",
    description: "End-to-end Medical Gas Pipeline System installation for hospitals and healthcare facilities with full compliance to IS standards.",
  },
  {
    icon: ShoppingBag,
    title: "Equipment Sales",
    description: "Complete range of hospital gas supply equipment — manifolds, regulators, outlets, copper pipes, valves, and more.",
  },
  {
    icon: Settings,
    title: "Modular OT Setup",
    description: "Design and installation of modular operation theaters with integrated gas supply, lighting, and panel systems.",
  },
  {
    icon: Stethoscope,
    title: "Repair & Maintenance",
    description: "Preventive maintenance and emergency repair services for existing MGPS installations and hospital equipment.",
  },
  {
    icon: Building2,
    title: "Turnkey Solutions",
    description: "Complete planning to commissioning solutions for new hospital construction projects requiring gas pipeline infrastructure.",
  },
  {
    icon: Headphones,
    title: "Consultation",
    description: "Expert consultation for hospital gas pipeline system planning, equipment selection, and compliance guidance.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="section" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Our Services</h2>
          <p>Comprehensive medical gas pipeline solutions for healthcare facilities</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 group cursor-pointer"
              style={{
                background: "var(--color-bg-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: "var(--color-primary-light)" }}
              >
                <service.icon size={22} style={{ color: "var(--color-primary)" }} />
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary-dark)",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
                {service.description}
              </p>

              {/* Link */}
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                style={{ color: "var(--color-primary)" }}
              >
                Learn More <ArrowRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn btn-outline">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
