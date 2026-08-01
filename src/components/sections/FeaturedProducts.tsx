// ============================================
// Featured Products — Landing Page Section
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";

const featuredProducts = [
  { name: "Oxygen BPC Flow Meter", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Medical Gas Outlet Point", category: "Medical Gas Outlets", image: "/images/products/medical-gas-outlet.png" },
  { name: "Medical Gas Manifold System", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "Copper Fittings & Pipes", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Bed Head Panel Unit", category: "Bed Head Panels", image: "/images/products/bed-head-panel.png" },
  { name: "Digital Gas Alarm System", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Modular Operation Theater", category: "OT Equipment", image: "/images/products/modular-ot.png" },
  { name: "Vacuum Regulator with Jar", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
];

export default function FeaturedProducts() {
  return (
    <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="container">
        <div className="section-heading">
          <h2>Our Products</h2>
          <p>Complete range of hospital gas supply systems and equipment</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-white rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
              style={{
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Product Image */}
              <div
                className="w-full aspect-square rounded-lg flex items-center justify-center mb-4 overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
                style={{ background: "var(--color-primary-light)" }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package
                    size={32}
                    style={{ color: "var(--color-primary)" }}
                    className="opacity-50"
                  />
                )}
              </div>

              {/* Product Name */}
              <h4
                className="text-sm font-bold mb-1 line-clamp-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary-dark)",
                }}
              >
                {product.name}
              </h4>

              {/* Category Badge */}
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                {product.category}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn btn-outline">
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
