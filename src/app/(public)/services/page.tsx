// ============================================
// Services Page — Clean Non-Overlapping Mobile & Desktop Layout
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Wrench,
  ShoppingBag,
  Settings,
  Stethoscope,
  Building2,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  X,
  Filter,
  Sparkles,
} from "lucide-react";

const categories = ["All", "Installation", "Equipment", "Modular OT", "Maintenance", "Turnkey", "Consultation"];

const services = [
  {
    id: "mgps-installation",
    category: "Installation",
    icon: Wrench,
    title: "MGPS Installation",
    tagline: "End-to-end hospital gas pipeline engineering & IS 7484 certification",
    description:
      "Full-scope Medical Gas Pipeline System design, procurement, pipeline routing, and commissioning. Serving hospitals from 10 to 500+ beds with turnkey precision.",
    fullDetails:
      "We provide complete engineering for central hospital gas distribution networks. Our scope includes site load planning, 3D CAD pipeline routing, degreased medical copper piping installation, zone valve box (ZVB) setup, digital alarm panel integration, high-pressure manifold erection, nitrogen purge hold testing, and IS 7484 safety certification.",
    features: [
      "Site survey & load capacity calculation",
      "3D CAD central pipeline routing design",
      "Medical-grade degreased copper pipe installation",
      "Zone valve box (ZVB) & digital area gas alarms",
      "Automatic cylinder manifold & LMO tank setup",
      "Nitrogen purge testing, pressure hold & IS certification",
    ],
    badge: "Full Turnkey",
    leadTime: "10-30 Days",
  },
  {
    id: "equipment-sales",
    category: "Equipment",
    icon: ShoppingBag,
    title: "Equipment Sales & Distribution",
    tagline: "Certified stockist & supplier of hospital gas supply hardware",
    description:
      "Complete range of hospital gas supply equipment sourced directly from certified manufacturers. Stocked in Ch. Sambhaji Nagar for fast delivery.",
    fullDetails:
      "We stock and supply certified medical gas equipment for new hospital builds and pipeline expansions. Products include BS/DIN gas outlets, BPC flow meters with humidifier bottles, vacuum suction regulators, digital master alarms, automatic changeover manifold panels, and medical copper fittings.",
    features: [
      "Manual & Automatic Gas Manifold Control Panels",
      "BS 5682 / DIN / AFNOR Medical Gas Outlets",
      "BPC Oxygen Flow Meters & Humidifier Jars",
      "Vacuum Suction Regulators & Collection Trolleys",
      "Seamless Copper Tubing & Silver Brazing Rods",
      "Bed Head Panel Units & OT Gas Pendants",
    ],
    badge: "Certified Hardware",
    leadTime: "Immediate Stock",
  },
  {
    id: "modular-ot",
    category: "Modular OT",
    icon: Settings,
    title: "Modular Operation Theater Setup",
    tagline: "Sterile surgical environments with integrated gas supply & laminar flow",
    description:
      "Design and installation of state-of-the-art modular operation theaters with integrated gas supply, pendants, shadowless lighting, and HEPA air filtration.",
    fullDetails:
      "Complete turnkey modular OT construction complying with NABH guidelines. Includes stainless steel / anti-bacterial wall paneling, ceiling pendants with gas sockets & electrical points, Class 100 HEPA laminar airflow, OT touch control screens, and hermetically sealed sliding doors.",
    features: [
      "Anti-bacterial wall & ceiling panel systems",
      "Single & dual ceiling surgical pendants",
      "Class 100 HEPA filtered laminar air flow",
      "Integrated medical gas terminal outlets",
      "Digital OT control panels & X-ray viewing screens",
      "NABH & ISO compliant surgical theater setup",
    ],
    badge: "NABH Compliant",
    leadTime: "15-45 Days",
  },
  {
    id: "repair-maintenance",
    category: "Maintenance",
    icon: Stethoscope,
    title: "Repair & Maintenance (AMC)",
    tagline: "24/7 emergency repair & annual maintenance for 100% pipeline uptime",
    description:
      "Comprehensive preventive maintenance, ultrasonic leak detection, and 24/7 emergency repair services for existing hospital gas supply systems.",
    fullDetails:
      "Round-the-clock emergency support and customized Annual Maintenance Contracts (AMC) for hospital gas pipeline infrastructure. We conduct periodic pressure calibration, manifold servicing, leak rectification, and outlet seal replacements to ensure zero disruption to ICUs and OTs.",
    features: [
      "24/7 emergency breakdown repair helpline",
      "Ultrasonic gas leak detection & pipe repair",
      "Manifold pressure regulator calibration",
      "Outlet seal & component replacement",
      "Preventive quarterly maintenance visits",
      "Comprehensive AMC & Non-AMC packages",
    ],
    badge: "24/7 Emergency",
    leadTime: "Instant Helpline",
  },
  {
    id: "turnkey-solutions",
    category: "Turnkey",
    icon: Building2,
    title: "Turnkey Hospital Projects",
    tagline: "Complete architectural coordination & central plant commissioning",
    description: "End-to-end project management for new hospital builds requiring central medical gas pipeline infrastructure built into architectural plans.",
    fullDetails:
      "Single-point project execution for new greenfield & brownfield hospital construction. We collaborate with architects, MEP consultants, and civil contractors to design, install, and commission central gas infrastructure from ground up.",
    features: [
      "Architectural & MEP coordination",
      "Central plant room & LMO tank yard design",
      "Pipeline routing optimization & sizing",
      "Turnkey installation & project management",
      "Quality assurance & pressure hold tests",
      "Hospital staff training & handover certification",
    ],
    badge: "End-to-End",
    leadTime: "Project Based",
  },
  {
    id: "consultation-audit",
    category: "Consultation",
    icon: Headphones,
    title: "Consultation & Technical Audit",
    tagline: "IS 7484 compliance audits, BOQ estimates & safety consultations",
    description: "Expert technical guidance for hospital administrators planning to install, upgrade, or audit central medical gas pipeline infrastructure.",
    fullDetails:
      "Technical safety audits and consultation for existing hospital gas pipelines. We evaluate pressure drops, leak rates, safety valve calibration, and compliance with IS 7484 standards, delivering detailed BOQ estimates and technical audit reports.",
    features: [
      "IS 7484 safety & compliance audits",
      "Pipeline health & pressure drop analysis",
      "BOQ cost estimation & equipment selection",
      "Oxygen consumption optimization guidance",
      "Staff safety protocol training sessions",
      "Detailed technical audit report & recommendations",
    ],
    badge: "Expert Guidance",
    leadTime: "1-3 Days",
  },
];

type ServiceItem = (typeof services)[number];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = services.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-8 sm:pb-12" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold shadow-xs"
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              <ShieldCheck size={14} /> Certified Medical Gas Engineering
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Our Specialized <span className="text-gradient">Services</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              End-to-end medical gas pipeline installation, certified equipment supply, modular OT construction, and 24/7 maintenance across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Services List Section */}
      <section className="section pt-6 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          {/* Category Filter Scrollbar */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-10 sm:mb-12 justify-start sm:justify-center items-center pt-2 scrollbar-none">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-xs">
              <span className="p-2 text-slate-400 hidden sm:inline-flex items-center justify-center">
                <Filter size={16} />
              </span>
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                    style={{
                      background: isSelected ? "var(--color-primary)" : "transparent",
                      color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                      boxShadow: isSelected ? "0 4px 12px rgba(21, 101, 192, 0.2)" : "none",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid Cards */}
          <div className="flex flex-col gap-8 sm:gap-10 mb-10 sm:mb-12">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="bg-white rounded-3xl border border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_-8px_rgba(21,101,192,0.08)] transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left Column: Title, Description & Action Buttons */}
                  <div className="lg:w-7/12 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 shadow-xs"
                          >
                            <service.icon size={22} />
                          </div>
                          <div>
                            <span
                              className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-50 text-[var(--color-primary)] inline-block mb-1"
                            >
                              {service.category}
                            </span>
                            <h2
                              className="text-lg sm:text-2xl font-bold leading-tight text-slate-900"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {service.title}
                            </h2>
                          </div>
                        </div>

                        <span
                          className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-[var(--color-primary)] transition-colors duration-300 flex-shrink-0"
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Tagline & Description */}
                      <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-3 leading-relaxed">
                        {service.tagline}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-100">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="btn btn-primary btn-lg w-full sm:w-auto text-xs sm:text-sm justify-center rounded-xl py-3.5 px-6 shadow-xs hover:shadow-md transition-all font-bold"
                      >
                        Enquire for {service.title.split(" ")[0]}
                        <ArrowRight size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="btn btn-outline btn-lg w-full sm:w-auto text-xs sm:text-sm justify-center rounded-xl py-3.5 px-6 transition-all font-bold cursor-pointer"
                      >
                        <Sparkles size={14} /> Full Scope & Specs
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables Checklist Box */}
                  <div
                    className="lg:w-5/12 p-6 sm:p-8 rounded-2xl flex flex-col justify-between bg-slate-50/70 border border-slate-200/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/60">
                        <h4
                          className="text-xs font-bold uppercase tracking-wider text-slate-900"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Key Deliverables
                        </h4>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-500 border border-slate-200 shadow-xs">
                          {service.leadTime}
                        </span>
                      </div>

                      <ul className="space-y-3">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-600">
                            <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
            Need a Customized Solution for Your Hospital?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed">
            Contact our engineering team in Ch. Sambhaji Nagar for site evaluation, BOQ preparation, and competitive pricing.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 btn btn-primary btn-lg w-full sm:w-auto justify-center rounded-full px-8 py-4 font-bold shadow-md hover:shadow-lg transition-all">
            Request Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Detail Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div
                className="h-2 w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
              />

              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
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
                        {selectedService.category} • {selectedService.badge}
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
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors flex-shrink-0 mt-0.5 cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                  >
                    Comprehensive Service Scope
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {selectedService.fullDetails}
                  </p>
                </div>

                <div
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={16} style={{ color: "var(--color-primary)" }} className="flex-shrink-0" />
                    <h4
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
                    >
                      Technical Deliverables & Specifications
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="btn btn-primary btn-lg w-full justify-center text-sm rounded-xl py-3 font-bold"
                  >
                    Enquire for {selectedService.title} <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm rounded-xl py-3 font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
