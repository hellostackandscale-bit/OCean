// ============================================
// Contact Page — Form + Google Maps
// ============================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Clock, Send, CheckCircle2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { DEFAULT_SETTINGS, SERVICE_INTERESTS } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceInterest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Submit to Web3Forms
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: `New Enquiry from ${formData.name} — Ocean MGPS`,
          from_name: formData.name,
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Enquiry submitted successfully!");
        setFormData({ name: "", email: "", phone: "", organization: "", serviceInterest: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918699848386";

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
              Have a project in mind? Reach out and we&apos;ll respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: DEFAULT_SETTINGS.address },
                    { icon: Phone, label: "Phone", value: DEFAULT_SETTINGS.phones.map(p => `+91 ${p}`).join("\n") },
                    { icon: Mail, label: "Email", value: DEFAULT_SETTINGS.email },
                    { icon: Globe, label: "Website", value: DEFAULT_SETTINGS.website },
                    { icon: Clock, label: "Business Hours", value: DEFAULT_SETTINGS.businessHours },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--color-primary-light)" }}
                      >
                        <item.icon size={18} style={{ color: "var(--color-primary)" }} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                          {item.label}
                        </span>
                        <p className="text-sm whitespace-pre-line" style={{ color: "var(--color-text-primary)" }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello! I'd like to enquire about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl no-underline transition-all duration-200 hover:shadow-[var(--shadow-md)]"
                style={{ background: "#E8F5E9", border: "1px solid #C8E6C9" }}
              >
                <MessageCircle size={24} style={{ color: "#25D366" }} />
                <div>
                  <span className="text-sm font-bold" style={{ color: "#1B5E20" }}>Chat on WhatsApp</span>
                  <p className="text-xs" style={{ color: "#388E3C" }}>We typically reply within minutes</p>
                </div>
              </a>
            </motion.div>

            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="text-center p-12 rounded-2xl" style={{ background: "var(--color-primary-light)" }}>
                  <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: "var(--color-success)" }} />
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>
                    Thank You!
                  </h3>
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    Your enquiry has been submitted. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-primary mt-6">
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-8 rounded-2xl"
                  style={{ background: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
                >
                  <h3
                    className="text-lg font-bold mb-6"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    Send Us an Enquiry
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="input-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="input-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        className="input-field"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div className="input-group">
                      <label>Organization</label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Hospital or company name"
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Service Interest</label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service</option>
                      {SERVICE_INTERESTS.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="input-field"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary btn-lg w-full mt-2"
                    style={{ opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner spinner-sm" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section style={{ background: "var(--color-bg-primary)" }}>
        <div className="container pb-16">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.0!2d75.35!3d19.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzQ4LjAiTiA3NcKwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ocean MGPS Location — Aurangabad"
            />
          </div>
        </div>
      </section>
    </>
  );
}
