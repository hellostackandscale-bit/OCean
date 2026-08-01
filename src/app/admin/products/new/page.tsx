// ============================================
// Admin — Add New Product
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { addDocument } from "@/lib/firestore";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const { upload, uploading, progress } = useMediaUpload();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    specifications: "",
    featured: false,
    status: "published" as "published" | "draft",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        const url = await upload(file, "products");
        setImages((prev) => [...prev, url]);
        toast.success(`Uploaded ${file.name}`);
      } catch {
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return toast.error("Product name is required");

    setSaving(true);
    try {
      await addDocument("products", {
        ...form,
        images,
        order: 0,
      });
      toast.success("Product created!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg transition-colors hover:bg-[var(--color-primary-light)]"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={20} />
        </Link>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
        >
          Add New Product
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group">
                <label>Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required className="input-field" placeholder="e.g., Oxygen BPC Flow Meter" />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-field" placeholder="Product description..." />
              </div>
              <div className="input-group">
                <label>Specifications</label>
                <textarea name="specifications" value={form.specifications} onChange={handleChange} rows={3} className="input-field" placeholder="Technical specifications..." />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <label className="text-sm font-semibold block mb-3" style={{ color: "var(--color-text-primary)" }}>
                Product Images
              </label>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center bg-red-500 text-white cursor-pointer"
                      style={{ border: "none" }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <label
                className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors hover:border-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Upload size={24} style={{ color: "var(--color-text-muted)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  {uploading ? `Uploading... ${Math.round(progress)}%` : "Click to upload images"}
                </span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field">
                  <option value="">Select category</option>
                  {PRODUCT_CATEGORIES.filter(c => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange} className="input-field">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Featured on homepage
                </span>
              </label>
            </div>

            <button type="submit" disabled={saving} className="btn btn-primary w-full">
              {saving ? (
                <><span className="spinner spinner-sm" /> Saving...</>
              ) : (
                <><Save size={16} /> Save Product</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
