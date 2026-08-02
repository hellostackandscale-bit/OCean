// ============================================
// Services Preview — Landing Page Section
// Mobile-First & Interactive Modal Preview
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wrench, ShoppingBag, Settings, Stethoscope, Building2, Headphones, Check, X, CheckCircle2, ShieldCheck } from "lucide-react";

const services = [
  {
    id: "mgps-installation",
    icon: Wrench,
    title: "MGPS Installation",
    description: "End-to-end Medical Gas Pipeline System installation for hospitals and healthcare facilities with full compliance to IS standards.",
    fullDescription: "We provide comprehensive, end-to-end Medical Gas Pipeline System (MGPS) design, procurement, installation, testing, and commissioning. Serving hospitals from 10 to 500+ beds with turnkey engineering.",
    features: [
      "Site survey & load capacity calculation",
      "Central pipeline network design & 3D CAD routing",
      "Medical-grade degreased copper pipe installation",
      "Zone valve box (ZVB) & digital gas alarm integration",
      "High-pressure manifold & automatic changeover setup",
      "Nitrogen purge testing, pressure hold & IS certification"
    ],
    tags: ["Pipeline Routing", "IS Standards", "Certification"],
    badge: "01",
  },
  {
    id: "equipment-sales",
    icon: ShoppingBag,
    title: "Equipment Sales",
    description: "Complete range of hospital gas supply equipment — manifolds, regulators, outlets, copper pipes, valves, and accessories.",
    fullDescription: "High-grade stockist and supplier of certified hospital gas pipeline equipment. We supply high-precision medical gas outlets, BPC flow meters, vacuum regulators, copper fittings, and bed head panels.",
    features: [
      "Manual & Automatic Gas Manifold Control Panels",
      "Medical Gas Outlets (BS / DIN / AFNOR standards)",
      "BPC Oxygen Flow Meters & Humidifier Bottles",
      "Vacuum Regulators & Suction Jar Units",
      "Seamless Copper Piping & Brass Fittings",
      "Digital Area & Master Gas Alarm Panels"
    ],
    tags: ["Manifold Systems", "Copper Tubing", "Outlets"],
    badge: "02",
  },
  {
    id: "modular-ot",
    icon: Settings,
    title: "Modular OT Setup",
    description: "Design and installation of state-of-the-art modular operation theaters with integrated gas supply, pendants, and lighting.",
    fullDescription: "Complete modular operation theater infrastructure. We design sterile surgical environments integrated with ceiling-mounted gas pendants, shadowless LED lights, laminar airflow, and anti-bacterial wall paneling.",
    features: [
      "Stainless steel & anti-bacterial wall/ceiling paneling",
      "Ceiling-mounted single & dual surgical pendants",
      "Laminar airflow units with HEPA filtration (Class 100)",
      "OT control panels & X-ray viewing screens",
      "Hermetically sealed sliding doors",
      "NABH & ISO compliant surgical theater setup"
    ],
    tags: ["NABH Compliant", "Pendants", "Laminar Flow"],
    badge: "03",
  },
  {
    id: "repair-maintenance",
    icon: Stethoscope,
    title: "Repair & Maintenance",
    description: "Preventive maintenance, leak detection, and 24/7 emergency repair services for existing MGPS and hospital gas systems.",
    fullDescription: "Round-the-clock emergency support and annual maintenance contracts (AMC) for hospital gas supply networks. We ensure 100% uptime for oxygen, vacuum, and medical air pipelines.",
    features: [
      "24/7 emergency repair & breakdown support",
      "Ultrasonic gas leak detection & pipe repair",
      "Manifold pressure calibration & cylinder testing",
      "Component replacement & outlet servicing",
      "Preventive quarterly maintenance visits",
      "Comprehensive AMC & Non-AMC packages"
    ],
    tags: ["24/7 Emergency", "Leak Testing", "AMC Coverage"],
    badge: "04",
  },
  {
    id: "turnkey-solutions",
    icon: Building2,
    title: "Turnkey Solutions",
    description: "Complete planning to commissioning solutions for new hospital construction projects requiring central gas infrastructure.",
    fullDescription: "Single-point project execution for new greenfield & brownfield hospital construction. We collaborate with architects and MEP consultants to deliver fully certified medical gas pipeline infrastructure.",
    features: [
      "Architectural coordination & MEP integration",
      "Central plant room & LMO tank yard design",
      "Complete pipeline network installation",
      "Third-party audit & safety certification",
      "Staff operation & safety training",
      "1-Year complimentary post-handover warranty"
    ],
    tags: ["Architectural Plan", "Commissioning", "Staff Training"],
    badge: "05",
  },
  {
    id: "consultation-audit",
    icon: Headphones,
    title: "Consultation & Audit",
    description: "Expert technical consultation for hospital gas pipeline system planning, equipment specification, and safety audits.",
    fullDescription: "Technical safety audits and consultation for existing hospital gas pipelines. We help healthcare administrators audit compliance with IS 7484 standards and optimize gas consumption.",
    features: [
      "IS 7484 safety & compliance audits",
      "Existing pipeline health & pressure drop analysis",
      "Equipment sizing & BOQ cost estimation",
      "Oxygen consumption optimization guidance",
      "Staff safety protocol training",
      "Detailed technical audit report & recommendations"
    ],
    tags: ["Safety Audits", "Cost Estimate", "Expert Guidance"],
    badge: "06",
  },
];

type ServiceItem = (typeof services)[number];

export default function ServicesPreview() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-bg-secondary)" }}>
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Our Services</h2>
          <p>Comprehensive medical gas pipeline solutions tailored for modern healthcare facilities</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header Row: Icon + Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs"
                  >
                    <service.icon size={24} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span
                    className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[var(--color-primary)] transition-colors"
                  >
                    {service.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-bold mb-2.5 transition-colors group-hover:text-[var(--color-primary)] text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed mb-5 text-slate-600">
                  {service.description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {service.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700"
                    >
                      <Check size={11} className="text-[var(--color-primary)]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Trigger Bar */}
              <div className="w-full mt-6 py-2.5 px-4 rounded-xl bg-blue-50/80 text-[var(--color-primary)] font-bold text-xs sm:text-sm flex items-center justify-between group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all shadow-xs">
                <span>Explore Full Info & Scope</span>
                <div className="w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4 sm:pt-6">
          <Link href="/services" className="btn btn-primary btn-lg w-full sm:w-auto font-bold shadow-md hover:shadow-lg transition-all px-8 py-3.5">
            View All Services & Specifications <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Interactive Detail Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              style={{ border: "1px solid var(--color-border)" }}
            >
              {/* Header Accent Bar */}
              <div
                className="h-2 w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
              />

              {/* Scrollable Content Container */}
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
                {/* Header & Close Button Row */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border-light)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary-light)",
                        boxShadow: "0 4px 12px rgba(21, 101, 192, 0.12)",
                      }}
                    >
                      <selectedService.icon size={24} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div>
                      <span
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1"
                        style={{
                          background: "var(--color-primary-light)",
                          color: "var(--color-primary)",
                        }}
                      >
                        Service Category #{selectedService.badge}
                      </span>
                      <h3
                        className="text-lg sm:text-2xl font-bold leading-tight"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                      >
                        {selectedService.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors flex-shrink-0 mt-0.5"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Section 1: Overview */}
                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                  >
                    Service Scope & Overview
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {selectedService.fullDescription}
                  </p>
                </div>

                {/* Section 2: Key Deliverables Card Box */}
                <div
                  className="p-4 sm:p-5 rounded-xl"
                  style={{
                    background: "var(--color-bg-tertiary)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={16} style={{ color: "var(--color-primary)" }} className="flex-shrink-0" />
                    <h4
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
                    >
                      Key Deliverables Included
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="btn btn-primary btn-lg w-full justify-center text-sm"
                  >
                    Enquire for {selectedService.title} <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
