// ============================================
// Admin Dashboard
// ============================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, FolderOpen, MessageSquare, ImageIcon, Plus, ArrowRight, Eye } from "lucide-react";
import { getDocuments } from "@/lib/firestore";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    enquiries: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [products, projects, enquiries, media] = await Promise.all([
          getDocuments("products"),
          getDocuments("projects"),
          getDocuments("enquiries"),
          getDocuments("media"),
        ]);
        setStats({
          products: products.length,
          projects: projects.length,
          enquiries: enquiries.length,
          media: media.length,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    { label: "Products", value: stats.products, icon: Package, href: "/admin/products", color: "#1565C0" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, href: "/admin/projects", color: "#0288D1" },
    { label: "Enquiries", value: stats.enquiries, icon: MessageSquare, href: "/admin/enquiries", color: "#16A34A" },
    { label: "Media Files", value: stats.media, icon: ImageIcon, href: "/admin/media", color: "#D97706" },
  ];

  const quickActions = [
    { label: "Add Product", href: "/admin/products/new", icon: Package },
    { label: "Add Project", href: "/admin/projects/new", icon: FolderOpen },
    { label: "View Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Upload Media", href: "/admin/media", icon: ImageIcon },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
        >
          Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
          Here&apos;s what&apos;s happening with your website today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={stat.href}
              className="block bg-white rounded-xl p-5 no-underline transition-all duration-200 hover:shadow-[var(--shadow-md)]"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${stat.color}15` }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <ArrowRight size={14} style={{ color: "var(--color-text-muted)" }} />
              </div>
              <span
                className="text-2xl font-bold block"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
              >
                {loading ? "—" : stat.value}
              </span>
              <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                {stat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex items-center gap-3 bg-white rounded-xl p-4 no-underline transition-all duration-200 hover:shadow-[var(--shadow-sm)]"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "var(--color-primary-light)" }}
              >
                <action.icon size={16} style={{ color: "var(--color-primary)" }} />
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* View Website */}
      <div
        className="bg-white rounded-xl p-6 flex items-center justify-between"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <div>
          <h3 className="font-bold" style={{ color: "var(--color-text-primary)" }}>
            View Your Website
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            See how your site looks to visitors
          </p>
        </div>
        <Link href="/" target="_blank" className="btn btn-outline btn-sm">
          <Eye size={14} />
          View Site
        </Link>
      </div>
    </div>
  );
}
