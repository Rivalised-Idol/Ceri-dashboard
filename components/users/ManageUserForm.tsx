//components\users\ManageUserForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserMetadata } from "@/types/users";

export default function ManageUserForm({ user }: { user: UserMetadata }) {
  const router = useRouter();
  const [membershipStatus, setMembershipStatus] = useState<
    "active" | "inactive"
  >(user.meta.membership_status === "active" ? "active" : "inactive");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // 🟦 Save (update membership)
  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ membership_status: membershipStatus }),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Membership updated successfully!");
        router.push("/users");
      } else {
        alert("❌ Failed to update membership.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong while updating.");
    } finally {
      setSaving(false);
    }
  }

  // 🟥 Delete user
  async function handleDelete() {
    const confirmDelete = confirm(
      `Are you sure you want to delete user "${user.user_login}"?\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        alert("✅ User deleted successfully!");
        router.push("/users");
      } else {
        alert("❌ Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("⚠️ Something went wrong while deleting user.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-md space-y-6">
      <h1 className="text-xl font-semibold text-white">
        Manage User: <span className="text-blue-400">{user.user_login}</span>
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="text"
            value={user.user_email}
            readOnly
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">
            Membership Status
          </label>
          <select
            value={membershipStatus}
            onChange={(e) =>
              setMembershipStatus(
                e.target.value === "active" ? "active" : "inactive"
              )
            }
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
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

        <div className="border-t border-slate-700 pt-4 mt-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
              deleting
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {deleting ? "Deleting..." : "🗑 Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
