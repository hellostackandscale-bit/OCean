// ============================================
// CTA Banner — Landing Page
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTABanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918699848386";
  const message = encodeURIComponent("Hello! I'd like to discuss a project with Ocean MGPS.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section className="section" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl p-10 md:p-16 relative overflow-hidden"
          style={{
            background: "var(--color-primary-light)",
            border: "1px solid rgba(21, 101, 192, 0.12)",
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20"
            style={{ background: "var(--color-primary)" }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-10"
            style={{ background: "var(--color-accent)" }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary-dark)",
              }}
            >
              Ready to Set Up Your Hospital&apos;s Gas Pipeline System?
            </h2>
            <p
              className="text-lg mb-8 max-w-[600px] mx-auto"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Get in touch with us for a free consultation. Our expert team will guide you
              through the entire process — from planning to commissioning.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Request a Quote <ArrowRight size={18} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                style={{
                  borderColor: "#25D366",
                  color: "#25D366",
                }}
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
