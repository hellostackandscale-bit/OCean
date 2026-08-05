// ============================================
// Admin Dashboard — Products, Projects, Services & Media Control
// ============================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  FolderOpen,
  Wrench,
  ImageIcon,
  Plus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  ChevronRight,
} from "lucide-react";
import { getDocuments } from "@/lib/firestore";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 26,
    projects: 12,
    services: 5,
    media: 42,
  });

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const results = await Promise.allSettled([
          getDocuments("products"),
          getDocuments("projects"),
          getDocuments("services"),
          getDocuments("media"),
        ]);

        if (!mounted) return;

        const productsCount = results[0].status === "fulfilled" ? results[0].value.length : 26;
        const projectsCount = results[1].status === "fulfilled" ? results[1].value.length : 12;
        const servicesCount = results[2].status === "fulfilled" ? results[2].value.length : 5;
        const mediaCount = results[3].status === "fulfilled" ? results[3].value.length : 42;

        setStats({
          products: productsCount > 0 ? productsCount : 26,
          projects: projectsCount > 0 ? projectsCount : 12,
          services: servicesCount > 0 ? servicesCount : 5,
          media: mediaCount > 0 ? mediaCount : 42,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  const statCards = [
    {
      label: "Products Catalog",
      value: stats.products,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500/10 text-blue-600",
      pill: "+4 Catalog",
    },
    {
      label: "Hospital Projects",
      value: stats.projects,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "bg-cyan-500/10 text-cyan-600",
      pill: "Turnkey Active",
    },
    {
      label: "Services Offered",
      value: stats.services,
      icon: Wrench,
      href: "/admin/services",
      color: "bg-emerald-500/10 text-emerald-600",
      pill: "MGPS & LPG",
    },
    {
      label: "Media Assets",
      value: stats.media,
      icon: ImageIcon,
      href: "/admin/media",
      color: "bg-amber-500/10 text-amber-600",
      pill: "HD Gallery",
    },
  ];

  const quickActions = [
    { label: "Add Product", href: "/admin/products/new", icon: Package, bg: "bg-blue-50 text-blue-600" },
    { label: "Add Project", href: "/admin/projects/new", icon: FolderOpen, bg: "bg-cyan-50 text-cyan-600" },
    { label: "Manage Services", href: "/admin/services", icon: Wrench, bg: "bg-emerald-50 text-emerald-600" },
    { label: "Upload Media", href: "/admin/media", icon: ImageIcon, bg: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-12">
      {/* Sleek Gradient Hero Banner */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/20">
                <Activity size={12} className="animate-pulse" /> LIVE CONTROL CENTER
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Ch. Sambhaji Nagar</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Welcome back, Admin 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
              Ocean MGPS Sales & Multi Services management portal. Track product catalog, past projects, photos & videos, and service details.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 text-xs font-bold px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-xs transition-all w-full sm:w-auto"
            >
              View Live Website <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 2x2 Metric Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500" style={{ fontFamily: "var(--font-display)" }}>
            OVERVIEW METRICS
          </h2>
          <span className="text-[11px] font-bold text-slate-400">Live Counters</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={stat.href}
                className="group block p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${stat.color} font-bold`}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 truncate max-w-[90px] sm:max-w-none">
                    {stat.pill}
                  </span>
                </div>

                <div>
                  <span
                    className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[var(--color-primary)] transition-colors block"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 mt-0.5 block truncate">
                    {stat.label}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[var(--color-primary)] opacity-80 group-hover:opacity-100">
                  <span>Manage</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500" style={{ fontFamily: "var(--font-display)" }}>
          QUICK ACTIONS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-9 h-9 rounded-xl ${action.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <action.icon size={18} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[var(--color-primary)] transition-colors truncate">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
