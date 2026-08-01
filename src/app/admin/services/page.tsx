// Admin — Services Management
"use client";
import { useState } from "react";
import { Plus, Edit, Trash2, Wrench, Save, X } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { addDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { Service } from "@/types";
import toast from "react-hot-toast";

export default function AdminServicesPage() {
  const { data: services, loading, refetch } = useFirestore<Service>("services");
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    features: string[];
    order: number;
    status: "published" | "draft";
  }>({ title: "", shortDescription: "", fullDescription: "", icon: "Wrench", features: [""], order: 0, status: "published" });

  const handleSave = async () => {
    if (!form.title) return toast.error("Title required");
    try {
      if (editing) { await updateDocument("services", editing, { ...form, features: form.features.filter(f => f), images: [] }); toast.success("Updated"); }
      else { await addDocument("services", { ...form, features: form.features.filter(f => f), images: [] }); toast.success("Created"); }
      setEditing(null); setAdding(false); setForm({ title: "", shortDescription: "", fullDescription: "", icon: "Wrench", features: [""], order: 0, status: "published" });
      refetch();
    } catch { toast.error("Failed"); }
  };

  const startEdit = (s: Service) => {
    setForm({ title: s.title, shortDescription: s.shortDescription, fullDescription: s.fullDescription, icon: s.icon, features: s.features.length ? s.features : [""], order: s.order, status: s.status });
    setEditing(s.id); setAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Services</h1>
        {!adding && <button onClick={() => { setAdding(true); setEditing(null); setForm({ title: "", shortDescription: "", fullDescription: "", icon: "Wrench", features: [""], order: 0, status: "published" }); }} className="btn btn-primary btn-sm"><Plus size={16} /> Add Service</button>}
      </div>

      {adding && (
        <div className="bg-white rounded-xl p-6 mb-6" style={{ border: "1px solid var(--color-border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold" style={{ color: "var(--color-primary-dark)" }}>{editing ? "Edit Service" : "New Service"}</h3>
            <button onClick={() => { setAdding(false); setEditing(null); }} className="p-1 cursor-pointer" style={{ background: "transparent", border: "none", color: "var(--color-text-muted)" }}><X size={20} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group"><label>Title *</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" /></div>
            <div className="input-group"><label>Short Description</label><input value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className="input-field" /></div>
          </div>
          <div className="input-group"><label>Full Description</label><textarea value={form.fullDescription} onChange={e => setForm({ ...form, fullDescription: e.target.value })} rows={3} className="input-field" /></div>
          <div className="input-group">
            <label>Features</label>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={f} onChange={e => { const newF = [...form.features]; newF[i] = e.target.value; setForm({ ...form, features: newF }); }} className="input-field" placeholder="Feature..." />
                <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })} className="p-2 cursor-pointer" style={{ background: "transparent", border: "none", color: "var(--color-danger)" }}><X size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ""] })} className="text-sm font-medium cursor-pointer" style={{ color: "var(--color-primary)", background: "transparent", border: "none" }}>+ Add Feature</button>
          </div>
          <button onClick={handleSave} className="btn btn-primary mt-4"><Save size={16} /> {editing ? "Update" : "Save"}</button>
        </div>
      )}

      <div className="space-y-3">
        {loading ? <div className="p-12 text-center"><span className="spinner spinner-md" /></div> :
          services.length === 0 ? <div className="p-12 text-center bg-white rounded-xl" style={{ border: "1px solid var(--color-border)" }}><Wrench size={40} className="mx-auto mb-3 opacity-30" /><p style={{ color: "var(--color-text-secondary)" }}>No services yet</p></div> :
          services.map(s => (
            <div key={s.id} className="bg-white rounded-xl p-5 flex items-center justify-between" style={{ border: "1px solid var(--color-border)" }}>
              <div>
                <h3 className="font-bold text-sm" style={{ color: "var(--color-primary-dark)" }}>{s.title}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>{s.shortDescription}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(s)} className="p-2 rounded-lg hover:bg-[var(--color-primary-light)] cursor-pointer" style={{ color: "var(--color-primary)", background: "transparent", border: "none" }}><Edit size={16} /></button>
                <button onClick={async () => { if (confirm("Delete?")) { await deleteDocument("services", s.id); toast.success("Deleted"); refetch(); }}} className="p-2 rounded-lg hover:bg-red-50 cursor-pointer" style={{ color: "var(--color-danger)", background: "transparent", border: "none" }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
