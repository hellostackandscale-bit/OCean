// ============================================
// Admin Layout — Auth Gate + Sidebar
// ============================================

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  // Login page — no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="text-center">
          <span className="spinner spinner-lg" />
          <p className="mt-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // Authenticated — show admin layout
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-secondary)" }}>
      <AdminSidebar />
      <main className="lg:ml-[260px] min-h-screen p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
