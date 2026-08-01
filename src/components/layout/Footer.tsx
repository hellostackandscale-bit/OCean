// ============================================
// Footer — White with 4-Column Grid
// ============================================

import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/constants";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "MGPS Systems", href: "/mgps" },
  { label: "Our Products", href: "/products" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "MGPS Installation", href: "/services" },
  { label: "Equipment Sales", href: "/services" },
  { label: "Modular OT Setup", href: "/services" },
  { label: "Repair & Maintenance", href: "/services" },
  { label: "Consultation", href: "/services" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      {/* Main Footer */}
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 no-underline mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              >
                <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                  O
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold leading-tight"
                  style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
                >
                  OCEAN MGPS
                </span>
                <span className="text-[10px] font-medium tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                  SALES & MULTI SERVICES
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--color-text-secondary)" }}>
              Highly specialized stockist, supplier & installer of Medical Gas Pipeline Systems and hospital equipment.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span
                className="px-3 py-1 text-xs font-semibold rounded-full"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                Made in India 🇮🇳
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline flex items-center gap-1 transition-colors hover:translate-x-1 duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <ArrowUpRight size={12} style={{ color: "var(--color-primary)" }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline flex items-center gap-1 transition-colors hover:translate-x-1 duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    <ArrowUpRight size={12} style={{ color: "var(--color-primary)" }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: "var(--color-primary-dark)" }}
            >
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {DEFAULT_SETTINGS.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <div className="flex flex-col">
                  {DEFAULT_SETTINGS.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+91${phone}`}
                      className="text-sm no-underline"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      +91 {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <a
                  href={`mailto:${DEFAULT_SETTINGS.email}`}
                  className="text-sm no-underline"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {DEFAULT_SETTINGS.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe size={16} className="flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {DEFAULT_SETTINGS.website}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="py-4"
        style={{ borderTop: "1px solid var(--color-border-light)", background: "var(--color-bg-secondary)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {currentYear} Ocean MGPS Sales & Multi Services. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Crafted by{" "}
            <a
              href="https://stackandscale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium no-underline"
              style={{ color: "var(--color-primary)" }}
            >
              Stack & Scale
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
