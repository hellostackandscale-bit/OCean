// ============================================
// Admin Sidebar — Navy Blue
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
  { icon: Wrench, label: "Services", href: "/admin/services" },
  { icon: ImageIcon, label: "Media Library", href: "/admin/media" },
  { icon: MessageSquare, label: "Enquiries", href: "/admin/enquiries" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/admin/login");
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Logo variant="light" size="md" />
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
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[260px] h-screen fixed left-0 top-0"
        style={{ background: "#0D47A1" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white"
        style={{ boxShadow: "var(--shadow-md)", border: "1px solid var(--color-border)" }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="lg:hidden fixed left-0 top-0 z-50 flex flex-col w-[260px] h-screen"
            style={{ background: "#0D47A1" }}
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </>
  );
}
