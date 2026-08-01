// ============================================
// Admin Projects List & CRUD
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, FolderOpen } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { Project } from "@/types";
import toast from "react-hot-toast";

export default function AdminProjectsPage() {
  const { data: projects, loading, refetch } = useFirestore<Project>("projects");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteDocument("projects", id);
      toast.success("Project deleted");
      refetch();
    } catch { toast.error("Failed to delete"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Projects</h1>
        <Link href="/admin/projects/new" className="btn btn-primary btn-sm"><Plus size={16} /> Add Project</Link>
      </div>
      <div className="relative max-w-sm mb-6">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-text-muted)" }} />
        <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
      </div>
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
        {loading ? (
          <div className="p-12 text-center"><span className="spinner spinner-md" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--color-text-muted)" }} />
            <p className="font-medium" style={{ color: "var(--color-text-secondary)" }}>No projects yet</p>
            <Link href="/admin/projects/new" className="btn btn-primary btn-sm mt-4"><Plus size={14} /> Add Project</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th className="text-left text-xs font-semibold uppercase px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Project</th>
                  <th className="text-left text-xs font-semibold uppercase px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Client</th>
                  <th className="text-left text-xs font-semibold uppercase px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Location</th>
                  <th className="text-right text-xs font-semibold uppercase px-5 py-3" style={{ color: "var(--color-text-muted)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-[var(--color-bg-secondary)]" style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                    <td className="px-5 py-3 text-sm font-medium">{project.title}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>{project.client}</td>
                    <td className="px-5 py-3 text-sm" style={{ color: "var(--color-text-secondary)" }}>{project.location}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/${project.id}`} className="p-2 rounded-lg hover:bg-[var(--color-primary-light)]" style={{ color: "var(--color-primary)" }}><Edit size={16} /></Link>
                        <button onClick={() => handleDelete(project.id)} className="p-2 rounded-lg hover:bg-red-50 cursor-pointer" style={{ color: "var(--color-danger)", border: "none", background: "transparent" }}><Trash2 size={16} /></button>
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
