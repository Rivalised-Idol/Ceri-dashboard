// // /app/users/[id]/manage/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { fetchUserMetadata } from '@/app/api/fetchUserMetadata';
// import { updateMembershipStatus } from '@/app/api/updateMembershipStatus';

// export default function ManageUserPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ type the state as a union, not string
//   const [membershipStatus, setMembershipStatus] = useState<'active' | 'inactive'>('inactive');
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const data = await fetchUserMetadata(id as string);

//         // ✅ normalize anything that's not 'active' to 'inactive'
//         const raw = data?.meta?.membership_status?.toLowerCase();
//         const normalized: 'active' | 'inactive' = raw === 'active' ? 'active' : 'inactive';

//         setUser(data);
//         setMembershipStatus(normalized);
//       } catch (error) {
//         console.error('Failed to fetch user metadata:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadUser();
//   }, [id]);

//   async function handleSave() {
//     setSaving(true);
//     try {
//       // ✅ membershipStatus now matches the function's expected type
//       const response = await updateMembershipStatus(id as string, membershipStatus);

//       if (response.success) {
//         alert('✅ ' + response.message);
//         router.push('/users');
//       } else {
//         alert('❌ Failed to update: ' + (response.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error(error);
//       alert('❌ Something went wrong while updating.');
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <div className="text-slate-400 p-6">Loading user details...</div>;
//   if (!user) return <div className="text-red-500 p-6">User not found.</div>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-md">
//       <h1 className="text-xl font-semibold text-white mb-6">
//         Manage User: <span className="text-blue-400">{user.user_login}</span>
//       </h1>

//       <div className="space-y-4">
//         <div>
//           <label className="block text-slate-300 text-sm font-medium mb-1">Email</label>
//           <input
//             type="text"
//             value={user.user_email}
//             readOnly
//             className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
//           />
//         </div>

//         <div>
//           <label className="block text-slate-300 text-sm font-medium mb-1">Membership Status</label>
//           <select
//             value={membershipStatus}
//             onChange={(e) => setMembershipStatus(e.target.value === 'active' ? 'active' : 'inactive')}
//             className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className={`px-4 py-2 rounded-md font-medium ${
//               saving ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
//             }`}
//           >
//             {saving ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// /app/users/[id]/manage/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchUserMetadata } from '@/app/api/fetchUserMetadata';
import { updateMembershipStatus } from '@/app/api/updateMembershipStatus';
import { deleteUser } from '@/app/api/deleteUser'; // 🆕 import delete API

export default function ManageUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<'active' | 'inactive'>('inactive');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false); // 🆕 new state

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchUserMetadata(id as string);
        const raw = data?.meta?.membership_status?.toLowerCase();
        const normalized: 'active' | 'inactive' = raw === 'active' ? 'active' : 'inactive';

        setUser(data);
        setMembershipStatus(normalized);
      } catch (error) {
        console.error('Failed to fetch user metadata:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [id]);

  // 🟦 Save (update membership)
  async function handleSave() {
    setSaving(true);
    try {
      const response = await updateMembershipStatus(id as string, membershipStatus);

      if (response.success) {
        alert('✅ ' + response.message);
        router.push('/users');
      } else {
        alert('❌ Failed to update: ' + (response.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('❌ Something went wrong while updating.');
    } finally {
      setSaving(false);
    }
  }

  // 🟥 Delete User Logic
  async function handleDelete() {
    const confirmDelete = confirm(
      `Are you sure you want to delete user "${user?.user_login}"?\n\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      const res = await deleteUser(Number(id));
      if (res.success) {
        alert('✅ User deleted successfully!');
        router.push('/users');
      } else {
        alert('❌ Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('⚠️ Something went wrong while deleting user.');
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="text-slate-400 p-6">Loading user details...</div>;
  if (!user) return <div className="text-red-500 p-6">User not found.</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-md space-y-6">
      <h1 className="text-xl font-semibold text-white">
        Manage User: <span className="text-blue-400">{user.user_login}</span>
      </h1>

      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            value={user.user_email}
            readOnly
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700"
          />
        </div>

        {/* Membership Status Dropdown */}
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1">
            Membership Status
          </label>
          <select
            value={membershipStatus}
            onChange={(e) =>
              setMembershipStatus(e.target.value === 'active' ? 'active' : 'inactive')
            }
            className="w-full bg-slate-800 text-white px-3 py-2 rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end">
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

        {/* 🟥 Delete Section */}
        <div className="border-t border-slate-700 pt-4 mt-4">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 ${
              deleting
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {deleting ? 'Deleting...' : '🗑 Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
}
