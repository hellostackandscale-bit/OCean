// ============================================
// WhatsApp Floating Button
// ============================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918699848386";
  const message = encodeURIComponent(
    "Hello Ocean MGPS! I'm interested in your Medical Gas Pipeline System services. Please share more details."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="bg-white rounded-xl px-4 py-3 max-w-[220px]"
            style={{
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Chat with us! 👋
              </span>
              <button
                onClick={() => setShowTooltip(false)}
                className="p-0.5 rounded"
                style={{ color: "var(--color-text-muted)" }}
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
              We typically reply within minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer"
        style={{
          background: "#25D366",
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, repeatType: "loop" },
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} color="#FFFFFF" fill="#FFFFFF" />
      </motion.a>
    </div>
  );
}
