// ============================================
// FAQ Page — Accordion
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "var(--color-bg-primary)",
        border: `1px solid ${isOpen ? "var(--color-primary)" : "var(--color-border)"}`,
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        style={{ background: "transparent" }}
      >
        <span
          className="text-base font-semibold pr-4"
          style={{ color: isOpen ? "var(--color-primary)" : "var(--color-text-primary)" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} style={{ color: "var(--color-primary)" }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{
                color: "var(--color-text-secondary)",
                borderTop: "1px solid var(--color-border-light)",
                paddingTop: "16px",
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <>
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
            >
              <HelpCircle size={14} /> Have Questions?
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Everything you need to know about our MGPS products and services
            </p>
          </motion.div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 rounded-2xl"
            style={{ background: "var(--color-primary-light)" }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Still have questions?
            </h3>
            <p className="text-sm mb-5" style={{ color: "var(--color-text-secondary)" }}>
              Can&apos;t find the answer you&apos;re looking for? Reach out to our team.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
