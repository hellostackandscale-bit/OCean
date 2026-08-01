// ============================================
// Admin Products List
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Trash2, Edit, Package } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { Product } from "@/types";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const { data: products, loading, refetch } = useFirestore<Product>("products");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      await deleteDocument("products", id);
      toast.success("Product deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
        >
          Products
        </h1>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
        {loading ? (
          <div className="p-12 text-center">
            <span className="spinner spinner-md" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Package size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--color-text-muted)" }} />
            <p className="font-medium" style={{ color: "var(--color-text-secondary)" }}>
              {products.length === 0 ? "No products yet" : "No matching products"}
            </p>
            {products.length === 0 && (
              <Link href="/admin/products/new" className="btn btn-primary btn-sm mt-4">
                <Plus size={14} /> Add Your First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Product</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Category</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Status</th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-[var(--color-bg-secondary)]"
                    style={{ borderBottom: "1px solid var(--color-border-light)" }}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: "var(--color-primary-light)" }}
                        >
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          ) : (
                            <Package size={16} style={{ color: "var(--color-primary)" }} />
                          )}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="badge badge-blue">{product.category}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge ${product.status === "published" ? "badge-green" : "badge-amber"}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 rounded-lg transition-colors hover:bg-[var(--color-primary-light)]"
                          style={{ color: "var(--color-primary)" }}
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50 cursor-pointer"
                          style={{ color: "var(--color-danger)", border: "none", background: "transparent" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
