// ============================================
// Admin Login Page
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { signIn } from "@/lib/auth";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success("Welcome back!");
      router.push("/admin/dashboard");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              boxShadow: "var(--shadow-blue)",
            }}
          >
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              O
            </span>
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
          >
            Ocean MGPS
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            Admin Panel
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8"
          style={{
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <h2 className="text-lg font-bold mb-6" style={{ color: "var(--color-text-primary)" }}>
            Sign in to your account
          </h2>

          <div className="input-group">
            <label>Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-11"
                placeholder="admin@oceanmgps.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full mt-4"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <span className="spinner spinner-sm" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "var(--color-text-muted)" }}>
          © Ocean MGPS Sales & Multi Services
        </p>
      </motion.div>
    </div>
  );
}
