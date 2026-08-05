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

const categories = ["All", "ICU & Diagnostics", "Flow Meters & Regulators", "Medical Gas Outlets", "Manifold Systems", "OT Equipment"];

const featuredProducts: ProductItem[] = [
  { name: "12-Channel ECG Machine", category: "ICU & Diagnostics", image: "/images/products/gas-alarm-system.png" },
  { name: "Multi-Para Patient Monitor", category: "ICU & Diagnostics", image: "/images/products/gas-alarm-system.png" },
  { name: "Volumetric Infusion Pump", category: "ICU & Diagnostics", image: "/images/products/vacuum-regulator.png" },
  { name: "Micro Syringe Pump", category: "ICU & Diagnostics", image: "/images/products/vacuum-regulator.png" },
  { name: "Advanced ICU Ventilator", category: "ICU & Diagnostics", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Infant Radiant Warmer", category: "Baby Care Equipment", image: "/images/products/bed-head-panel.png" },
  { name: "Oxygen BPC Flow Meter", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Medical Gas Outlet Point", category: "Medical Gas Outlets", image: "/images/products/medical-gas-outlet.png" },
  { name: "Medical Gas Manifold System", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "Copper Fittings & Pipes", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Bed Head Panel Unit", category: "Bed Head Panels", image: "/images/products/bed-head-panel.png" },
  { name: "Modular Operation Theater", category: "OT Equipment", image: "/images/products/modular-ot.png" },
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

        {/* Quick Filter Bar — Unboxed */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 justify-start sm:justify-center items-center scrollbar-none">
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                  style={{
                    background: isSelected ? "var(--color-primary)" : "rgba(226, 232, 240, 0.6)",
                    color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid — Open Flat Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-14">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Standalone Image Container — Borderless */}
                  <div
                    className="w-full aspect-square rounded-2xl flex items-center justify-center mb-3 overflow-hidden transition-all duration-300 group-hover:scale-[1.02] relative p-3 bg-slate-100/70"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <Package size={36} style={{ color: "var(--color-primary)" }} className="opacity-40" />
                    )}

                    {/* Stock Pill Badge */}
                    <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-0.5">
                      <Check size={9} /> IN STOCK
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-[var(--color-primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                        <Eye size={14} /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <span
                    className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80 inline-block mb-1"
                  >
                    {product.category}
                  </span>

                  {/* Product Title */}
                  <h4
                    className="text-xs sm:text-sm font-bold leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 text-slate-900"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {product.name}
                  </h4>
                </div>

                {/* Card Action Link — Borderless */}
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] group-hover:gap-2.5 transition-all">
                  <span>View Specs</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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
