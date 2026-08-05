// ============================================
// Admin Sidebar — Navy Blue
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Wrench,
  ImageIcon,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import Logo from "@/components/ui/Logo";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: FolderOpen, label: "Past Projects", href: "/admin/projects" },
  { icon: Package, label: "Products Catalog", href: "/admin/products" },
  { icon: Wrench, label: "Manage Services", href: "/admin/services" },
  { icon: ImageIcon, label: "Media (Photos & Videos)", href: "/admin/media" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    localStorage.removeItem("ocean_admin_logged_in");
    await signOut();
    toast.success("Signed out");
    window.location.href = "/admin/login";
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo variant="light" size="md" href="/admin/dashboard" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-2">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium no-underline transition-all duration-200"
              style={{
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                borderLeft: isActive ? "3px solid var(--color-accent)" : "3px solid transparent",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="px-3 pb-5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
          style={{
            color: "rgba(255,255,255,0.65)",
            background: "transparent",
            border: "none",
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Navigation Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-14 px-4 bg-slate-900 border-b border-slate-800 text-white shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors flex-shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="truncate">
            <Logo variant="light" size="sm" href="/admin/dashboard" />
          </div>
        </div>
        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap flex-shrink-0">
          Admin Portal
        </span>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0 shadow-lg"
        style={{ background: "#0F172A" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 z-50 flex flex-col w-[270px] h-screen shadow-2xl"
              style={{ background: "#0F172A" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
