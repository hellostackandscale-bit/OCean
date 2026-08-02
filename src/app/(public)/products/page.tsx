// ============================================
// Products Page — Ultra Premium Grid & Modal
// ============================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Filter, Eye, Check, ArrowRight, X } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import ProductModal, { ProductItem } from "@/components/ui/ProductModal";

const staticProducts: ProductItem[] = [
  { name: "Oxygen BPC Flow Meter", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Oxygen Pressure Regulator", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Vacuum Regulator with Jar", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Medical Gas Outlet Point", category: "Medical Gas Outlets", image: "/images/products/medical-gas-outlet.png" },
  { name: "Self Sealing Valve", category: "Valves & Safety", image: "/images/products/medical-gas-outlet.png" },
  { name: "Medical Grade Copper Pipes & Fittings", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Copper Tail Pipe", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Flexible Tail Pipe", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "S Bracket & Pipeline Supports", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Medical Gas Manifold System", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "NRV Manifold", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "Conax Valve", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Oxygen Isolation Valve", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Zone Valve Box Assembly", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Medical Valve Box", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Digital Gas Alarm System", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Semi-Automatic Control Panel", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Automatic Digital Control Panel", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Vacuum Suction Jar", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Vacuum Suction Trolley", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Medical Air Compressor", category: "Vacuum Systems", image: "/images/products/manifold-system.png" },
  { name: "Pipeline Pressure Gauge", category: "Pressure Gauges", image: "/images/products/pressure-gauge.png" },
  { name: "Bed Head Panel Unit", category: "Bed Head Panels", image: "/images/products/bed-head-panel.png" },
  { name: "Modular Operation Theater", category: "OT Equipment", image: "/images/products/modular-ot.png" },
  { name: "OT Surgical Light", category: "OT Equipment", image: "/images/products/modular-ot.png" },
  { name: "Medical Gas Pendant", category: "OT Equipment", image: "/images/products/modular-ot.png" },
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = staticProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-4 sm:pb-6" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-base sm:text-lg mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Complete range of hospital gas supply systems & equipment. Tap any item to inspect technical specifications.
            </p>

            {/* Search Bar Wrapper */}
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <div className="relative w-full max-w-xl" style={{ margin: "0 auto" }}>
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-primary)" }}
                />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3 sm:py-3.5 text-sm sm:text-base font-medium rounded-full bg-white border border-[var(--color-border)] shadow-md outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  style={{
                    paddingLeft: "3rem",
                    paddingRight: search ? "2.75rem" : "1.25rem",
                    color: "var(--color-text-primary)",
                  }}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Count Pill */}
            {search && (
              <p className="text-xs font-semibold text-[var(--color-primary)] mb-2">
                Showing {filteredProducts.length} matching result{filteredProducts.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid Section */}
      <section className="section pt-4 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          {/* Category Filter Scrollbar */}
          <div className="flex overflow-x-auto pb-3 gap-2 mb-8 justify-start sm:justify-center items-center pt-2">
            <Filter size={18} className="flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
            {PRODUCT_CATEGORIES.map((cat) => (
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

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
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

                        {/* Hover Overlay */}
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

                      {/* Title */}
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

                    {/* Action Footer */}
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
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-[var(--color-border)]">
              <Package size={48} className="mx-auto mb-4 opacity-30" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                No products found
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Try a different search term or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
