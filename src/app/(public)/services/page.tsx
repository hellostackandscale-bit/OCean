// ============================================
// Services Page
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, ShoppingBag, Settings, Stethoscope, Building2, Headphones, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "MGPS Installation",
    description: "End-to-end Medical Gas Pipeline System installation for hospitals and healthcare facilities. We handle everything from planning and design to procurement, installation, testing, and commissioning.",
    features: ["Site survey & planning", "Pipeline network design", "Copper pipe installation", "Zone valve & alarm setup", "Testing & commissioning", "Compliance certification"],
  },
  {
    icon: ShoppingBag,
    title: "Equipment Sales & Distribution",
    description: "Complete range of hospital gas supply equipment sourced from certified manufacturers. We stock and supply everything needed for a functional MGPS.",
    features: ["Manifold systems", "Copper pipes & fittings", "Medical gas outlets", "Regulators & flow meters", "Valves & safety equipment", "Bed head panels & OT lights"],
  },
  {
    icon: Settings,
    title: "Modular Operation Theater Setup",
    description: "Design and installation of state-of-the-art modular operation theaters with integrated gas supply, lighting, control panels, and ventilation systems.",
    features: ["Modular wall & ceiling panels", "OT lighting systems", "Integrated gas outlets", "Control panel setup", "Laminar air flow systems", "Turnkey OT solutions"],
  },
  {
    icon: Stethoscope,
    title: "Repair & Maintenance",
    description: "Comprehensive maintenance and emergency repair services for existing MGPS installations, ensuring uninterrupted gas supply to critical care areas.",
    features: ["Preventive maintenance", "Emergency repairs", "Gas leak detection & fix", "Pressure calibration", "Component replacement", "Annual maintenance contracts"],
  },
  {
    icon: Building2,
    title: "Turnkey Hospital Solutions",
    description: "Complete planning-to-commissioning solutions for new hospital construction projects. We integrate MGPS into the building design from the ground up.",
    features: ["Architectural coordination", "Pipeline routing design", "Equipment specification", "Installation management", "Quality assurance", "Handover & training"],
  },
  {
    icon: Headphones,
    title: "Consultation & Support",
    description: "Expert consultation for hospitals planning to install or upgrade their medical gas pipeline infrastructure. We provide guidance on standards, equipment, and best practices.",
    features: ["IS standard compliance", "System design review", "Equipment selection guidance", "Cost estimation", "Vendor management", "24/7 technical support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Comprehensive medical gas pipeline solutions from planning to commissioning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8"
                style={{
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                <div className="md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--color-primary-light)" }}
                    >
                      <service.icon size={22} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                    >
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-secondary)" }}>
                    {service.description}
                  </p>
                  <Link href="/contact" className="btn btn-primary btn-sm">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="md:w-1/3">
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-muted)" }}>
                    What&apos;s Included
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-primary)" }}>
                        <CheckCircle2 size={14} style={{ color: "var(--color-primary)" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
