// Admin — Add New Project
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { addDocument } from "@/lib/firestore";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function NewProjectPage() {
  const router = useRouter();
  const { upload, uploading, progress } = useMediaUpload();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({ title: "", client: "", description: "", location: "", completionDate: "", category: "", featured: false, status: "published" as "published" | "draft" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      try { const url = await upload(file, "projects"); setImages(prev => [...prev, url]); } catch { toast.error(`Failed: ${file.name}`); }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return toast.error("Title required");
    setSaving(true);
    try {
      await addDocument("projects", { ...form, images, videos: [] });
      toast.success("Project created!"); router.push("/admin/projects");
    } catch { toast.error("Failed"); } finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-[var(--color-primary-light)]" style={{ color: "var(--color-primary)" }}><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Add New Project</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group"><label>Project Title *</label><input name="title" value={form.title} onChange={handleChange} required className="input-field" placeholder="e.g., MGPS Installation — City Hospital" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group"><label>Client</label><input name="client" value={form.client} onChange={handleChange} className="input-field" placeholder="Hospital name" /></div>
                <div className="input-group"><label>Location</label><input name="location" value={form.location} onChange={handleChange} className="input-field" placeholder="City, State" /></div>
              </div>
              <div className="input-group"><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-field" /></div>
            </div>
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <label className="text-sm font-semibold block mb-3">Project Photos</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center bg-red-500 text-white cursor-pointer" style={{ border: "none" }}><X size={12} /></button>
                  </div>
                ))}
              </div>
              <label className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer hover:border-[var(--color-primary)]" style={{ borderColor: "var(--color-border)" }}>
                <Upload size={24} style={{ color: "var(--color-text-muted)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{uploading ? `Uploading... ${Math.round(progress)}%` : "Upload photos"}</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group"><label>Category</label><select name="category" value={form.category} onChange={handleChange} className="input-field"><option value="">Select</option>{PROJECT_CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div className="input-group"><label>Completion Date</label><input name="completionDate" value={form.completionDate} onChange={handleChange} className="input-field" placeholder="e.g., March 2025" /></div>
              <div className="input-group"><label>Status</label><select name="status" value={form.status} onChange={handleChange} className="input-field"><option value="published">Published</option><option value="draft">Draft</option></select></div>
              <label className="flex items-center gap-2 cursor-pointer mt-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" /><span className="text-sm font-medium">Featured on homepage</span></label>
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary w-full">{saving ? <><span className="spinner spinner-sm" /> Saving...</> : <><Save size={16} /> Save Project</>}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
