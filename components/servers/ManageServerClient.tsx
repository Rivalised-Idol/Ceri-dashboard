"use client";

import { useState } from "react";
import type { Server } from "@/types/servers";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  initialServer: Server;
};

export default function ManageServerClient({ initialServer }: Props) {
  const router = useRouter();
  const [server, setServer] = useState<Server>(initialServer);
  const [originalServer] = useState<Server>(initialServer);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleInputChange<K extends keyof Server>(
    field: K,
    value: Server[K]
  ) {
    setServer((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/servers/${server.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: server.name,
          ip: server.ip,
          country: server.country,
          city: server.city,
          protocol: server.protocol,
          is_private: server.is_private,
          is_active: server.is_active,
        }),
      });

      const data: { success: boolean; message: string } = await res.json();
      if (!res.ok || !data.success) {
        alert(`⚠️ Failed to update server. ${data?.message ?? ""}`);
        return;
      }
      alert("✅ Server updated successfully!");
      router.push("/servers");
    } catch (e) {
      console.error(e);
      alert("❌ Error updating server.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("⚠️ Are you sure you want to delete this server?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/servers/${server.id}`, {
        method: "DELETE",
      });
      const data: { success: boolean; message: string } = await res.json();

      if (!res.ok || !data.success) {
        alert(`❌ Failed to delete server. ${data?.message ?? ""}`);
        return;
      }
      alert("🗑️ Server deleted successfully!");
      router.push("/servers");
    } catch (e) {
      console.error(e);
      alert("⚠️ Error deleting server.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-md space-y-4">
      <button
        onClick={() => router.push("/servers")}
        className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-md transition-all hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        <span>Back to Servers</span>
      </button>

      <h1 className="text-xl font-semibold text-white mb-4">
        Manage Server: <span className="text-blue-400">{server.name}</span>
      </h1>

      {(["name", "ip", "country", "city"] as const).map((field) => (
        <div key={field}>
          <label className="block text-slate-300 text-sm mb-1 capitalize">
            {field}
          </label>
          <input
            type="text"
            value={server[field] as string}
            onChange={(e) =>
              handleInputChange(field, e.target.value as Server[typeof field])
            }
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
          />
        </div>
      ))}

      <div>
        <label className="block text-slate-300 text-sm mb-1">Protocol</label>
        <select
          value={server.protocol}
          onChange={(e) => handleInputChange("protocol", e.target.value)}
          className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
        >
          <option value="OpenVPN">OpenVPN</option>
          <option value="V2Ray">V2Ray</option>
        </select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center space-x-2 text-slate-300 text-sm">
          <input
            type="checkbox"
            checked={!!server.is_private}
            onChange={(e) => handleInputChange("is_private", e.target.checked)}
          />
          <span>Private</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 text-sm">
          <input
            type="checkbox"
            checked={!!server.is_active}
            onChange={(e) => handleInputChange("is_active", e.target.checked)}
          />
          <span>Active</span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`px-4 py-2 rounded-md font-medium ${
            deleting
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {deleting ? "Deleting..." : "Delete Server"}
        </button>

        <button
          onClick={() => setServer({ ...originalServer })}
          disabled={saving || deleting}
          className={`px-4 py-2 rounded-md font-medium ${
            saving || deleting
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-slate-600 hover:bg-slate-700 text-white"
          }`}
        >
          Discard Changes
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-md font-medium ${
            saving
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
