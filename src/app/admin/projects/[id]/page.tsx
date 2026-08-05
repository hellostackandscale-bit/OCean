// Admin — Edit Project (Photos & Videos)
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Trash2, Film, Image as ImageIcon, Video, Plus } from "lucide-react";
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
  const [videos, setVideos] = useState<string[]>([]);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [form, setForm] = useState({
    title: "",
    client: "",
    description: "",
    location: "",
    completionDate: "",
    category: "",
    featured: false,
    status: "published" as "published" | "draft",
  });

  useEffect(() => {
    async function load() {
      const p = await getDocument<Project>("projects", id);
      if (p) {
        setForm({
          title: p.title || "",
          client: p.client || "",
          description: p.description || "",
          location: p.location || "",
          completionDate: p.completionDate || "",
          category: p.category || "",
          featured: Boolean(p.featured),
          status: p.status || "published",
        });
        setImages(p.images || []);
        setVideos(p.videos || []);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isVideo = false) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      try {
        const url = await upload(file, "projects");
        if (isVideo || file.type.startsWith("video/")) {
          setVideos((prev) => [...prev, url]);
          toast.success(`Video uploaded: ${file.name}`);
        } else {
          setImages((prev) => [...prev, url]);
          toast.success(`Photo uploaded: ${file.name}`);
        }
      } catch {
        toast.error("Upload failed");
      }
    }
  };

  const handleAddVideoUrl = () => {
    if (!videoUrlInput.trim()) return;
    setVideos((prev) => [...prev, videoUrlInput.trim()]);
    setVideoUrlInput("");
    toast.success("Video URL added");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDocument("projects", id, { ...form, images, videos });
      toast.success("Project updated with photos and videos!");
      router.push("/admin/projects");
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <span className="spinner spinner-lg" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Edit Past Project
          </h1>
        </div>
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this project?")) {
              await deleteDocument("projects", id);
              toast.success("Project deleted");
              router.push("/admin/projects");
            }
          }}
          className="btn btn-danger btn-sm"
        >
          <Trash2 size={14} /> Delete Project
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Project Overview</h3>
            <div className="input-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required className="input-field" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="input-group">
                <label>Client</label>
                <input name="client" value={form.client} onChange={handleChange} className="input-field" />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} className="input-field" />
              </div>
            </div>
            <div className="input-group">
              <label>Description & Technical Scope</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="input-field" />
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon size={16} className="text-blue-600" /> Project Site Photos ({images.length})
            </h3>
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center cursor-pointer shadow-md"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all">
              <Upload size={24} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-600">
                {uploading ? `Uploading... ${Math.round(progress)}%` : "Add Site Photos (JPEG, PNG)"}
              </span>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFileUpload(e, false)} className="hidden" disabled={uploading} />
            </label>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Video size={16} className="text-indigo-600" /> Project Site Videos ({videos.length})
            </h3>
            {videos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {videos.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group">
                    {url.includes("youtube.com") || url.includes("youtu.be") ? (
                      <iframe src={url} className="w-full h-full" title={`Video ${i + 1}`} />
                    ) : (
                      <video src={url} controls className="w-full h-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => setVideos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md z-10"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 transition-all">
                <Film size={24} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-600">
                  {uploading ? `Uploading... ${Math.round(progress)}%` : "Upload Site Video File (MP4, WEBM)"}
                </span>
                <input type="file" accept="video/*" multiple onChange={(e) => handleFileUpload(e, true)} className="hidden" disabled={uploading} />
              </label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="url"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  placeholder="Or paste video link / YouTube URL..."
                  className="input-field text-xs py-2.5"
                />
                <button
                  type="button"
                  onClick={handleAddVideoUrl}
                  className="btn btn-outline btn-sm py-2.5 px-4 font-bold text-xs whitespace-nowrap flex-shrink-0"
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="input-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="input-field">
                <option value="">Select Category</option>
                {PROJECT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Completion Date</label>
              <input name="completionDate" value={form.completionDate} onChange={handleChange} className="input-field" />
            </div>
            <div className="input-group">
              <label>Publish Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="input-field">
                <option value="published">Published</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600"
              />
              <span className="text-xs font-bold text-slate-700">Showcase on Homepage</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg w-full justify-center rounded-xl py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            {saving ? (
              <>
                <span className="spinner spinner-sm" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
