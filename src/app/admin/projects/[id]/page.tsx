// Admin — Edit Project (similar pattern to product edit)
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Trash2 } from "lucide-react";
import { getDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { Project } from "@/types";
import toast from "react-hot-toast";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { upload, uploading, progress } = useMediaUpload();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({ title: "", client: "", description: "", location: "", completionDate: "", category: "", featured: false, status: "published" as "published" | "draft" });

  useEffect(() => {
    async function load() {
      const p = await getDocument<Project>("projects", id);
      if (p) { setForm({ title: p.title, client: p.client, description: p.description, location: p.location, completionDate: p.completionDate, category: p.category, featured: p.featured, status: p.status }); setImages(p.images || []); }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      try { const url = await upload(file, "projects"); setImages(prev => [...prev, url]); } catch { toast.error("Upload failed"); }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try { await updateDocument("projects", id, { ...form, images }); toast.success("Updated!"); router.push("/admin/projects"); } catch { toast.error("Failed"); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="spinner spinner-lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-[var(--color-primary-light)]" style={{ color: "var(--color-primary)" }}><ArrowLeft size={20} /></Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Edit Project</h1>
        </div>
        <button onClick={async () => { if (confirm("Delete?")) { await deleteDocument("projects", id); toast.success("Deleted"); router.push("/admin/projects"); }}} className="btn btn-danger btn-sm"><Trash2 size={14} /> Delete</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group"><label>Title *</label><input name="title" value={form.title} onChange={handleChange} required className="input-field" /></div>
              <div className="grid grid-cols-2 gap-4"><div className="input-group"><label>Client</label><input name="client" value={form.client} onChange={handleChange} className="input-field" /></div><div className="input-group"><label>Location</label><input name="location" value={form.location} onChange={handleChange} className="input-field" /></div></div>
              <div className="input-group"><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-field" /></div>
            </div>
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <label className="text-sm font-semibold block mb-3">Photos</label>
              <div className="grid grid-cols-3 gap-3 mb-4">{images.map((url, i) => (<div key={i} className="relative aspect-video rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}><img src={url} alt="" className="w-full h-full object-cover" /><button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer" style={{ border: "none" }}><X size={12} /></button></div>))}</div>
              <label className="flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer" style={{ borderColor: "var(--color-border)" }}><Upload size={24} style={{ color: "var(--color-text-muted)" }} /><span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{uploading ? `${Math.round(progress)}%` : "Add photos"}</span><input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} /></label>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
              <div className="input-group"><label>Category</label><select name="category" value={form.category} onChange={handleChange} className="input-field"><option value="">Select</option>{PROJECT_CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div className="input-group"><label>Completion Date</label><input name="completionDate" value={form.completionDate} onChange={handleChange} className="input-field" /></div>
              <div className="input-group"><label>Status</label><select name="status" value={form.status} onChange={handleChange} className="input-field"><option value="published">Published</option><option value="draft">Draft</option></select></div>
              <label className="flex items-center gap-2 cursor-pointer mt-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" /><span className="text-sm font-medium">Featured</span></label>
            </div>
            <button type="submit" disabled={saving} className="btn btn-primary w-full">{saving ? <><span className="spinner spinner-sm" /> Saving...</> : <><Save size={16} /> Update</>}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
