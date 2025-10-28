// 'use client';

// import { fetchUsers } from '@/app/api/fetchUsers';
// import { fetchServers } from '../api/fetchServers';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import {  View, UserPen } from 'lucide-react';


// interface User {
//   id: number;
//   user_login: string;
//   user_nicename: string;
//   user_email: string;
//   user_registered: string;
//   //user_status add later on this line
//   first_name: string;
//   last_name: string;
//   meta: {
//     membership_status: string;
//     active_membership_plan: string;
//     membership_expiry_date: string;
//   };
// }

// function Pill({
//   children,
//   tone = 'default',
// }: {
//   children: React.ReactNode;
//   tone?: 'default' | 'green' | 'yellow' | 'red' | 'blue';
// }) {
//   const map: Record<string, string> = {
//     default: 'bg-slate-700/60 border-slate-600 text-white',
//     green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
//     yellow: 'bg-amber-900/60 border-amber-700 text-amber-50',
//     red: 'bg-rose-900/60 border-rose-700 text-rose-50',
//     blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
//   };

//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [filterPlan, setFilterPlan] = useState('');
//   const [sortBy, setSortBy] = useState('id_desc');

//   useEffect(() => {
//     async function loadUsers() {
//       try {
//         const data = await fetchUsers();
//         setUsers(data);
//       } catch (error) {
//         console.error('Failed to load users:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadUsers();
//   }, []);

//   const filteredUsers = users
//     .filter((user) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         user.user_login.toLowerCase().includes(query) ||
//         user.user_nicename.toLowerCase().includes(query) ||
//         user.user_email.toLowerCase().includes(query) ||
//         user.meta.membership_status?.toLowerCase().includes(query) ||
//         user.meta.active_membership_plan?.toLowerCase().includes(query)
//       );
//     })
//     .filter((user) => {
//       if (filterStatus && user.meta.membership_status !== filterStatus) return false;

//       if (filterPlan) {
//         const plan = user.meta.active_membership_plan?.toLowerCase() || 'free';
//         if (plan !== filterPlan.toLowerCase()) return false;
//       }

//       return true;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'id_asc':
//           return a.id - b.id;
//         case 'id_desc':
//           return b.id - a.id;
//         default:
//           return 0;
//       }
//     });


//   const membershipStatusOptions = ['active', 'inactive', 'expired'];
//   const membershipPlanOptions = ['free', '1_week', '1_month', '3_months', '6_months', '1_year'];

//   const clearFilters = () => {
//     setSearchQuery('');
//     setFilterStatus('');
//     setFilterPlan('');
//     setSortBy('id_desc');
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Users</h1>

//       {/* Search + Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search ID, Username, Email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Statuses</option>
//           {membershipStatusOptions.map((status) => (
//             <option key={status} value={status}>
//               {status.toUpperCase()}
//             </option>
//           ))}
//         </select>
//         <select
//           value={filterPlan}
//           onChange={(e) => setFilterPlan(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Plans</option>
//           {membershipPlanOptions.map((plan) => (
//             <option key={plan} value={plan}>
//               {plan}
//             </option>
//           ))}
//         </select>
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="id_desc">ID ↓</option>
//           <option value="id_asc">ID ↑</option>
//         </select>
//         <button
//           onClick={clearFilters}
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Scrollable User Table */}
//       <div className="rounded-xl border border-slate-800 overflow-hidden">
//         <div
//           className="
//             overflow-x-auto overflow-y-auto max-h-[550px]
//             scrollbar-thin
//             scrollbar-thumb-slate-700
//             scrollbar-track-slate-900
//             hover:scrollbar-thumb-slate-500
//             transition-colors duration-300
//           "
//         >
//           <table className="w-full border-collapse text-sm min-w-[900px]">
//             <thead>
//               <tr className="bg-slate-900/70 text-slate-400">
//                 {[
//                   'Item #',
//                   'ID',
//                   'User Info',
//                   'Registered Date',
//                   'Membership Status',
//                   'Membership Type',
//                   'Private Server',
//                   'Currrent Plan Expiry',
//                   'Action',
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 z-10 bg-slate-900/70 backdrop-blur-sm"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((user, i) => {
//                   const statusTone = user.meta.membership_status === 'active' ? 'green' : 'red';
//                   const plan = user.meta.active_membership_plan?.toLowerCase();
//                   const planTone =
//                     plan === 'free'
//                       ? 'default'
//                       : plan === '1_week'
//                       ? 'yellow'
//                       : plan === '1_month'
//                       ? 'blue'
//                       : plan === '3_months'
//                       ? 'red'
//                       : plan === '6_months'
//                       ? 'blue'
//                       : plan === '1_year'
//                       ? 'green'
//                       : 'default';

//                   return (
//                     <tr key={user.id} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
//                       <td className="px-4 py-3 border-b border-slate-800">{i + 1}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{user.id}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex flex-col">
//                           <span className="text-white">
//                             <span className="font-normal text-slate-400 text-xs">Username: </span>
//                             <span className="font-semibold">{user.user_login}</span>
//                           </span>
//                           <span className="text-slate-400 text-xs">
//                             <span className="font-semibold">Email: </span>
//                             {user.user_email}
//                           </span>
//                           <span className="text-slate-400 text-xs">
//                             <span className="font-semibold">Full Name: </span>
//                             {user.first_name || ''} {user.last_name || ''}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {new Date(user.user_registered).toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={statusTone}>{user.meta.membership_status?.toUpperCase() || '-'}</Pill>
//                       </td>
//                       {/* Membership Type */}
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={planTone}>{user.meta.active_membership_plan || 'free'}</Pill>
//                       </td>
//                       {/* For Private Servers */}
//                       <td className="px-4 py-3 border-b border-slate-800">{'_'}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {user.meta.membership_expiry_date || '-'}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex items-center gap-4">
//                           <Link
//                             href={`/users/${user.id}/view`}
//                             className="text-blue-400 hover:text-blue-300 transition-colors"
//                             title="View User"
//                           >
//                             <View size={18} strokeWidth={2} />
//                           </Link>

//                           <Link
//                             href={`/users/${user.id}/manage`}
//                             className="text-yellow-400 hover:text-yellow-300 transition-colors"
//                             title="Manage User"
//                           >
//                             <UserPen size={18} strokeWidth={2} />
//                           </Link>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/users/page.tsx
import { fetchUsers } from "@/lib/users/fetchUsers";
import UsersTable from "@/components/users/UserTable";

export default async function UsersPage() {
  const { users } = await fetchUsers(); // server-side call (secure)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Users</h1>
      <UsersTable initialUsers={users} />
    </div>
  );
}
