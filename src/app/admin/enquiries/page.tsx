// Admin — Enquiries
"use client";
import { useState } from "react";
import { MessageSquare, Mail, Phone, Building2, Clock } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { updateDocument } from "@/lib/firestore";
import { Enquiry } from "@/types";
import toast from "react-hot-toast";

export default function AdminEnquiriesPage() {
  const { data: enquiries, loading, refetch } = useFirestore<Enquiry>("enquiries");
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = async (id: string, status: "read" | "replied") => {
    try { await updateDocument("enquiries", id, { status }); toast.success(`Marked as ${status}`); refetch(); }
    catch { toast.error("Failed"); }
  };

  const sorted = [...enquiries].sort((a, b) => {
    const dateA = a.createdAt instanceof Date ? a.createdAt : (a.createdAt as { toDate: () => Date })?.toDate?.() || new Date();
    const dateB = b.createdAt instanceof Date ? b.createdAt : (b.createdAt as { toDate: () => Date })?.toDate?.() || new Date();
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Enquiries</h1>
        <span className="badge badge-blue">{enquiries.filter(e => e.status === "new").length} new</span>
      </div>

      {loading ? <div className="p-12 text-center"><span className="spinner spinner-md" /></div> :
       enquiries.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl" style={{ border: "1px solid var(--color-border)" }}>
          <MessageSquare size={48} className="mx-auto mb-3 opacity-20" />
          <p style={{ color: "var(--color-text-secondary)" }}>No enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map(enq => (
            <div key={enq.id} className="bg-white rounded-xl overflow-hidden" style={{ border: `1px solid ${enq.status === "new" ? "var(--color-primary)" : "var(--color-border)"}` }}>
              <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === enq.id ? null : enq.id)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "var(--color-primary-light)" }}>
                    <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{enq.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: "var(--color-text-primary)" }}>{enq.name}</h3>
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{enq.email}</p>
                  </div>
                </div>
                <span className={`badge ${enq.status === "new" ? "badge-blue" : enq.status === "replied" ? "badge-green" : "badge-amber"}`}>
                  {enq.status}
                </span>
              </div>

              {expanded === enq.id && (
                <div className="px-5 pb-5" style={{ borderTop: "1px solid var(--color-border-light)" }}>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}><Phone size={14} /> {enq.phone}</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}><Building2 size={14} /> {enq.organization || "N/A"}</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}><Mail size={14} /> {enq.serviceInterest || "General"}</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}><Clock size={14} /> {enq.createdAt instanceof Date ? enq.createdAt.toLocaleDateString() : "Recent"}</div>
                  </div>
                  <div className="p-4 rounded-lg mb-4" style={{ background: "var(--color-bg-secondary)" }}>
                    <p className="text-sm" style={{ color: "var(--color-text-primary)" }}>{enq.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {enq.status !== "read" && <button onClick={() => updateStatus(enq.id, "read")} className="btn btn-ghost btn-sm">Mark as Read</button>}
                    {enq.status !== "replied" && <button onClick={() => updateStatus(enq.id, "replied")} className="btn btn-primary btn-sm">Mark as Replied</button>}
                    <a href={`mailto:${enq.email}?subject=Re: Your Enquiry — Ocean MGPS`} className="btn btn-outline btn-sm"><Mail size={14} /> Reply via Email</a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
