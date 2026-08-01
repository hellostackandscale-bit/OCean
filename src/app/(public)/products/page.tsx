// ============================================
// Products Page — Filterable Grid
// ============================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Filter } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const staticProducts = [
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

  const filteredProducts = staticProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero */}
      <section className="section pb-0" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--color-text-secondary)" }}>
              Complete range of hospital gas supply systems and equipment
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section pt-6" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 mb-6 sm:mb-8 justify-start sm:justify-center items-center">
            <Filter size={18} className="flex-shrink-0" style={{ color: "var(--color-text-muted)" }} />
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
                style={{
                  background: activeCategory === cat ? "var(--color-primary)" : "var(--color-bg-secondary)",
                  color: activeCategory === cat ? "#FFFFFF" : "var(--color-text-secondary)",
                  border: `1px solid ${activeCategory === cat ? "var(--color-primary)" : "var(--color-border)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group bg-white rounded-xl p-5 transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="w-full aspect-square rounded-lg flex items-center justify-center mb-4 overflow-hidden"
                    style={{ background: "var(--color-primary-light)" }}
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Package size={32} style={{ color: "var(--color-primary)" }} className="opacity-40" />
                    )}
                  </div>
                  <h4
                    className="text-sm font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                  >
                    {product.name}
                  </h4>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
                  >
                    {product.category}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto mb-4 opacity-30" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                No products found
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Try a different search term or category
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
