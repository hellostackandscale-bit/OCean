// ============================================
// Featured Products — Landing Page Section
// Premium Interactive Cards & Quick View Modal
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, Eye, ShieldCheck, Check } from "lucide-react";
import ProductModal, { ProductItem } from "@/components/ui/ProductModal";

const categories = ["All", "Flow Meters & Regulators", "Medical Gas Outlets", "Manifold Systems", "Copper Fittings & Pipes", "OT Equipment"];

const featuredProducts: ProductItem[] = [
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
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = featuredProducts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Our Products & Equipment</h2>
          <p>Hospital-grade medical gas pipeline equipment engineered to IS 7484 safety standards</p>
        </div>

        {/* Quick Filter Bar */}
        <div className="flex overflow-x-auto pb-3 gap-2 mb-8 justify-start sm:justify-center items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
              style={{
                background: activeCategory === cat ? "var(--color-primary)" : "#FFFFFF",
                color: activeCategory === cat ? "#FFFFFF" : "var(--color-text-secondary)",
                border: `1px solid ${activeCategory === cat ? "var(--color-primary)" : "var(--color-border)"}`,
                boxShadow: activeCategory === cat ? "0 4px 12px rgba(21, 101, 192, 0.2)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[var(--color-border)] flex flex-col justify-between"
            >
              <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Image Container */}
                  <div
                    className="w-full aspect-square rounded-xl flex items-center justify-center mb-3 overflow-hidden transition-all duration-300 group-hover:scale-[1.02] relative border border-[var(--color-border-light)] p-2"
                    style={{ background: "var(--color-bg-tertiary)" }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package size={36} style={{ color: "var(--color-primary)" }} className="opacity-40" />
                    )}

                    {/* Stock Pill Badge */}
                    <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-0.5">
                      <Check size={9} /> IN STOCK
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-[var(--color-primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye size={14} /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <span
                    className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[var(--color-primary)] inline-block mb-1.5"
                  >
                    {product.category}
                  </span>

                  {/* Product Title */}
                  <h4
                    className="text-xs sm:text-sm font-bold leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-primary-dark)",
                    }}
                  >
                    {product.name}
                  </h4>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-[var(--color-border-light)] flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                  <span>View Specs</span>
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight size={12} style={{ color: "var(--color-primary)" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center pt-4 sm:pt-6">
          <Link href="/products" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
            Explore All 26+ Certified Products & Specs <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Product Quick View Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
