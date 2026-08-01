// Admin — Settings
"use client";
import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import { getDocument, updateDocument, addDocument } from "@/lib/firestore";
import { SiteSettings } from "@/types";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const doc = await getDocument<SiteSettings & { id: string }>("settings", "main");
        if (doc) { setSettings(doc); setSettingsId("main"); }
      } catch { /* use defaults */ }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settingsId) { await updateDocument<SiteSettings>("settings", settingsId, settings); }
      else {
        const { doc, setDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        await setDoc(doc(db, "settings", "main"), { ...settings, updatedAt: new Date() });
        setSettingsId("main");
      }
      toast.success("Settings saved!");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="spinner spinner-lg" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}>Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
          {saving ? <><span className="spinner spinner-sm" /> Saving...</> : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
          <h3 className="font-bold mb-4" style={{ color: "var(--color-primary-dark)" }}>Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group"><label>Company Name</label><input value={settings.companyName} onChange={e => setSettings({ ...settings, companyName: e.target.value })} className="input-field" /></div>
            <div className="input-group"><label>Tagline</label><input value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} className="input-field" /></div>
          </div>
          <div className="input-group"><label>About</label><textarea value={settings.about} onChange={e => setSettings({ ...settings, about: e.target.value })} rows={3} className="input-field" /></div>
          <div className="input-group"><label>Address</label><input value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} className="input-field" /></div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
          <h3 className="font-bold mb-4" style={{ color: "var(--color-primary-dark)" }}>Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group"><label>Email</label><input value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} className="input-field" /></div>
            <div className="input-group"><label>WhatsApp Number</label><input value={settings.whatsapp} onChange={e => setSettings({ ...settings, whatsapp: e.target.value })} className="input-field" /></div>
            <div className="input-group"><label>Website</label><input value={settings.website} onChange={e => setSettings({ ...settings, website: e.target.value })} className="input-field" /></div>
            <div className="input-group"><label>Business Hours</label><input value={settings.businessHours} onChange={e => setSettings({ ...settings, businessHours: e.target.value })} className="input-field" /></div>
          </div>
          <div className="input-group">
            <label>Phone Numbers</label>
            {settings.phones.map((phone, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={phone} onChange={e => { const p = [...settings.phones]; p[i] = e.target.value; setSettings({ ...settings, phones: p }); }} className="input-field" />
                {settings.phones.length > 1 && <button type="button" onClick={() => setSettings({ ...settings, phones: settings.phones.filter((_, idx) => idx !== i) })} className="p-2 cursor-pointer" style={{ background: "transparent", border: "none", color: "var(--color-danger)" }}><X size={16} /></button>}
              </div>
            ))}
            <button type="button" onClick={() => setSettings({ ...settings, phones: [...settings.phones, ""] })} className="text-sm font-medium cursor-pointer" style={{ color: "var(--color-primary)", background: "transparent", border: "none" }}><Plus size={14} className="inline" /> Add Phone</button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid var(--color-border)" }}>
          <h3 className="font-bold mb-4" style={{ color: "var(--color-primary-dark)" }}>Homepage Stats</h3>
          {settings.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-3 gap-3 mb-3">
              <input value={stat.label} onChange={e => { const s = [...settings.stats]; s[i] = { ...s[i], label: e.target.value }; setSettings({ ...settings, stats: s }); }} className="input-field" placeholder="Label" />
              <input type="number" value={stat.value} onChange={e => { const s = [...settings.stats]; s[i] = { ...s[i], value: parseInt(e.target.value) || 0 }; setSettings({ ...settings, stats: s }); }} className="input-field" placeholder="Value" />
              <input value={stat.suffix} onChange={e => { const s = [...settings.stats]; s[i] = { ...s[i], suffix: e.target.value }; setSettings({ ...settings, stats: s }); }} className="input-field" placeholder="Suffix (+, etc.)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
