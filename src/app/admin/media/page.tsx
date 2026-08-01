// Admin — Media Library
"use client";
import { useState } from "react";
import { Upload, Trash2, ImageIcon, Copy, Check } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { deleteFile } from "@/lib/storage";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { MediaItem } from "@/types";
import toast from "react-hot-toast";

export default function AdminMediaPage() {
  const { data: media, loading, refetch } = useFirestore<MediaItem>("media");
  const { upload, uploading, progress } = useMediaUpload();
  const [copied, setCopied] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      try { await upload(file, "general"); toast.success(`Uploaded ${file.name}`); refetch(); }
      catch { toast.error(`Failed: ${file.name}`); }
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm("Delete this file?")) return;
    try { await deleteFile(item.url); await deleteDocument("media", item.id); toast.success("Deleted"); refetch(); }
    catch { toast.error("Failed"); }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    toast.success("URL copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Media Library</h1>
        <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{media.length} files</span>
      </div>

      {/* Upload Area */}
      <label className="flex flex-col items-center gap-3 p-8 mb-6 rounded-xl border-2 border-dashed cursor-pointer bg-white transition-colors hover:border-[var(--color-primary)]" style={{ borderColor: "var(--color-border)" }}>
        <Upload size={32} style={{ color: "var(--color-text-muted)" }} />
        <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
          {uploading ? `Uploading... ${Math.round(progress)}%` : "Drag & drop or click to upload images and videos"}
        </span>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>JPG, PNG, WebP, MP4 — Max 10MB per image, 100MB per video</span>
        <input type="file" accept="image/*,video/*" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
      </label>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center"><span className="spinner spinner-md" /></div>
      ) : media.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
          <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
          <p className="font-medium" style={{ color: "var(--color-text-secondary)" }}>No media files yet</p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Upload your first file above</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {media.map(item => (
            <div key={item.id} className="group relative bg-white rounded-lg overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
              <div className="aspect-square">
                {item.type === "image" ? (
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--color-bg-secondary)" }}>
                    <span className="text-xs font-bold" style={{ color: "var(--color-text-muted)" }}>VIDEO</span>
                  </div>
                )}
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(item.url)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer" style={{ border: "none" }}>
                  {copied === item.url ? <Check size={14} style={{ color: "var(--color-success)" }} /> : <Copy size={14} />}
                </button>
                <button onClick={() => handleDelete(item)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer" style={{ border: "none" }}>
                  <Trash2 size={14} style={{ color: "var(--color-danger)" }} />
                </button>
              </div>
              <div className="p-2">
                <p className="text-[11px] truncate" style={{ color: "var(--color-text-secondary)" }}>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
