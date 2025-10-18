'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchServerById } from '@/app/api/fetchServerById';
import { updateServer } from '@/app/api/updateServer';
import { deleteServer } from '@/app/api/deleteServer';
import { ArrowLeft } from 'lucide-react';

export default function ManageServerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [server, setServer] = useState<any>(null);
  const [originalServer, setOriginalServer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadServer() {
      try {
        const data = await fetchServerById(id as string);
        setServer(data);
        setOriginalServer(data);
      } catch (err) {
        console.error(err);
        alert('❌ Failed to load server details.');
      } finally {
        setLoading(false);
      }
    }
    loadServer();
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setServer((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        name: server.name,
        ip: server.ip,
        country: server.country,
        city: server.city,
        protocol: server.protocol,
        is_private: server.is_private,
        is_active: server.is_active,
      };

      const response = await updateServer(Number(id), body);
      if (response.success) {
        alert('✅ Server updated successfully!');
        router.push('/servers');
      } else {
        alert('⚠️ Failed to update server.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error updating server.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('⚠️ Are you sure you want to delete this server?')) return;
    setDeleting(true);
    try {
      const response = await deleteServer(Number(id));
      if (response.success) {
        alert('🗑️ ' + response.message);
        router.push('/servers');
      } else {
        alert('❌ Failed to delete server.');
      }
    } catch (err) {
      console.error(err);
      alert('⚠️ Error deleting server.');
    } finally {
      setDeleting(false);
    }
  }

  if (loading)
    return <div className="text-slate-400 p-6">Loading server details...</div>;

  if (!server)
    return <div className="text-red-500 p-6">Server not found.</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-md space-y-4">
      <button
        onClick={() => router.push('/servers')}
        className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-md transition-all hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        <span>Back to Servers</span>
      </button>    
      <h1 className="text-xl font-semibold text-white mb-4">Manage Server:</h1>

      <div>
        <label className="block text-slate-300 text-sm mb-1">Name</label>
        <input
          type="text"
          value={server.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-slate-300 text-sm mb-1">IP Address</label>
        <input
          type="text"
          value={server.ip || ''}
          onChange={(e) => handleInputChange('ip', e.target.value)}
          className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-slate-300 text-sm mb-1">Country</label>
        <input
          type="text"
          value={server.country || ''}
          onChange={(e) => handleInputChange('country', e.target.value)}
          className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-slate-300 text-sm mb-1">City</label>
        <input
          type="text"
          value={server.city || ''}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-slate-300 text-sm mb-1">Protocol</label>
        <select
          value={server.protocol || 'OpenVPN'}
          onChange={(e) => handleInputChange('protocol', e.target.value)}
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
            onChange={(e) => handleInputChange('is_private', e.target.checked)}
          />
          <span>Private</span>
        </label>

        <label className="flex items-center space-x-2 text-slate-300 text-sm">
          <input
            type="checkbox"
            checked={!!server.is_active}
            onChange={(e) => handleInputChange('is_active', e.target.checked)}
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
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {deleting ? 'Deleting...' : 'Delete Server'}
        </button>
        {/* 🔁 Discard Changes Button */}
        <button
          onClick={() => setServer({ ...originalServer })} // ✅ restore original state
          disabled={saving || deleting}
          className={`px-4 py-2 rounded-md font-medium ${
            saving || deleting
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-slate-600 hover:bg-slate-700 text-white'
          }`}
        >
          Discard Changes
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded-md font-medium ${
            saving
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
