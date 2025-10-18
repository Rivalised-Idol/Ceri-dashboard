//===================== COPY CONFIG ADDED ==================================
// /app/servers/page.tsx

// import { fetchServers } from '@/app/api/fetchServers';
// import CopyButton from '../components/CopyButton';

// function Pill({
//   children,
//   tone = "default",
// }: {
//   children: React.ReactNode;
//   tone?: "default" | "green" | "yellow" | "red" | "blue";
// }) {
//   const map: Record<string, string> = {
//     default: "bg-slate-700/60 border-slate-600 text-white",
//     green: "bg-emerald-900/60 border-emerald-700 text-emerald-50",
//     yellow: "bg-amber-900/60 border-amber-700 text-amber-50",
//     red: "bg-rose-900/60 border-rose-700 text-rose-50",
//     blue: "bg-blue-900/60 border-blue-700 text-blue-50",
//   };
//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default async function ServersPage() {
//   const servers = await fetchServers();

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Servers</h1>

//       <div className="rounded-xl border border-slate-800 overflow-hidden">
//         <table className="w-full border-collapse text-sm">
//           <thead>
//             <tr className="bg-slate-900/70 text-slate-400">
//               {["ID", "Name", "IP", "Protocol", "Access Type", "Country", "City", "Config"].map((h) => (
//                 <th
//                   key={h}
//                   className="text-left font-medium px-4 py-3 border-b border-slate-800"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {servers.map((s: any, i: number) => {
//               const accessTone =
//                 s.access_type === "public"
//                   ? "green"
//                   : s.access_type === "private"
//                   ? "red"
//                   : "default";

//               return (
//                 <tr
//                   key={s.ID}
//                   className={i % 2 === 0 ? "bg-slate-950" : "bg-slate-950/60"}
//                 >
//                   <td className="px-4 py-3 border-b border-slate-800">{s.ID}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">{s.name}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">{s.ip}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">{s.protocol}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">
//                     <Pill tone={accessTone}>{s.access_type}</Pill>
//                   </td>
//                   <td className="px-4 py-3 border-b border-slate-800">{s.country}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">{s.city}</td>
//                   <td className="px-4 py-3 border-b border-slate-800">
//                     <CopyButton text={s.config} />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // /app/servers/page.tsx
// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { fetchServers } from '@/app/api/fetchServers';
// import Link from 'next/link';
// import CopyButton from '../components/CopyButton';
// import { View, UserPen } from 'lucide-react';

// type Server = {
//   ID: number;
//   name: string;
//   ip: string;
//   protocol: string;             // e.g., "OpenVPN", "WireGuard"
//   access_type: 'public' | 'private';
//   country: string;
//   city: string;
//   config: string;
//   is_active?: boolean;          // if present from API
// };

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
//     <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}>
//       {children}
//     </span>
//   );
// }

// export default function ServersPage() {
//   const [servers, setServers] = useState<Server[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [protocolFilter, setProtocolFilter] = useState('');
//   const [accessFilter, setAccessFilter] = useState('');
//   const [activeFilter, setActiveFilter] = useState(''); // '', 'active', 'inactive'

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await fetchServers();
//         setServers(data);
//       } catch (err) {
//         console.error('Failed to load servers', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   // Unique protocol list (from data) for dropdown
//   const protocolOptions = useMemo(() => {
//     const set = new Set<string>();
//     servers.forEach((s) => s?.protocol && set.add(s.protocol));
//     return Array.from(set);
//   }, [servers]);

//   const filtered = useMemo(() => {
//     const q = searchQuery.trim().toLowerCase();

//     return servers.filter((s) => {
//       // search by id, name, ip, country, city
//       const matchesSearch =
//         q === '' ||
//         s.ID.toString().includes(q) ||
//         s.name?.toLowerCase().includes(q) ||
//         s.ip?.toLowerCase().includes(q) ||
//         s.country?.toLowerCase().includes(q) ||
//         s.city?.toLowerCase().includes(q);

//       const matchesProtocol = protocolFilter ? s.protocol?.toLowerCase() === protocolFilter : true;

//       const matchesAccess = accessFilter ? s.access_type?.toLowerCase() === accessFilter : true;

//       const matchesActive =
//         activeFilter === ''
//           ? true
//           : activeFilter === 'active'
//           ? s.is_active === true
//           : s.is_active === false;

//       return matchesSearch && matchesProtocol && matchesAccess && matchesActive;
//     });
//   }, [servers, searchQuery, protocolFilter, accessFilter, activeFilter]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setProtocolFilter('');
//     setAccessFilter('');
//     setActiveFilter('');
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Servers</h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by ID, name, IP, country, city…"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={protocolFilter}
//           onChange={(e) => setProtocolFilter(e.target.value.toLowerCase())}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Protocols</option>
//           {protocolOptions.map((p) => (
//             <option key={p} value={p.toLowerCase()}>
//               {p}
//             </option>
//           ))}
//         </select>

//         <select
//           value={accessFilter}
//           onChange={(e) => setAccessFilter(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Access Types</option>
//           <option value="public">Public</option>
//           <option value="private">Private</option>
//         </select>

//         <select
//           value={activeFilter}
//           onChange={(e) => setActiveFilter(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Status</option>
//           <option value="active">Active</option>
//           <option value="inactive">Inactive</option>
//         </select>

//         <button
//           onClick={clearFilters}
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Scrollable Table */}
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
//           <table className="w-full border-collapse text-sm min-w-[1000px]">
//             <thead>
//               <tr className="bg-slate-900/70 text-slate-400">
//                 {['ID', 'Name', 'IP', 'Protocol', 'Access Type', 'Country', 'City', 'Config', 'Action'].map((h) => (
//                   <th
//                     key={h}
//                     className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/70 backdrop-blur-sm"
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
//               ) : filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
//                     No servers found.
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((s, i) => {
//                   const accessTone =
//                     s.access_type === 'public' ? 'green' : s.access_type === 'private' ? 'red' : 'default';

//                   return (
//                     <tr key={s.ID} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.ID}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.name}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.ip}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.protocol}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={accessTone}>{s.access_type}</Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.country}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.city}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <CopyButton text={s.config} />
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex items-center gap-4">
//                           <Link
//                             href={`/servers/${s.ID}/view`}
//                             className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
//                             title="View Server"
//                           >
//                             <View size={18} strokeWidth={2} />
//                           </Link>
//                           <Link
//                             href={`/servers/${s.ID}/manage`}
//                             className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
//                             title="Manage Server"
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


// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { fetchServers } from '@/app/api/fetchServers';
// import { createServer } from '@/app/api/createServer';
// import Link from 'next/link';
// import CopyButton from '../components/CopyButton';
// import { Eye, Wrench, X } from 'lucide-react';

// type Server = {
//   ID: number;
//   name: string;
//   ip: string;
//   protocol: string;
//   access_type: 'public' | 'private';
//   country: string;
//   city: string;
//   config: string;
//   is_private?: boolean;
//   is_active?: boolean;
// };

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

// export default function ServersPage() {
//   const [servers, setServers] = useState<Server[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔍 filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [protocolFilter, setProtocolFilter] = useState('');
//   const [accessFilter, setAccessFilter] = useState('');
//   const [activeFilter, setActiveFilter] = useState('');

//   // ➕ modal states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newServer, setNewServer] = useState({
//     country: '',
//     city: '',
//     ip: '',
//     name: '',
//     password: '',
//     protocol: '',
//     config: '',
//     is_private: false,
//     is_active: true,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiMessage, setApiMessage] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         const data = await fetchServers();
//         setServers(data);
//       } catch (err) {
//         console.error('Failed to load servers', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   const protocolOptions = useMemo(() => {
//     const set = new Set<string>();
//     servers.forEach((s) => s.protocol && set.add(s.protocol));
//     return Array.from(set);
//   }, [servers]);

//   const filtered = useMemo(() => {
//     const q = searchQuery.toLowerCase().trim();
//     return servers.filter((s) => {
//       const matchesSearch =
//         !q ||
//         s.ID.toString().includes(q) ||
//         s.name?.toLowerCase().includes(q) ||
//         s.ip?.toLowerCase().includes(q) ||
//         s.country?.toLowerCase().includes(q) ||
//         s.city?.toLowerCase().includes(q);
//       const matchesProtocol = protocolFilter
//         ? s.protocol?.toLowerCase() === protocolFilter
//         : true;
//       const matchesAccess = accessFilter
//         ? s.access_type?.toLowerCase() === accessFilter
//         : true;
//       const matchesActive =
//         activeFilter === ''
//           ? true
//           : activeFilter === 'active'
//           ? s.is_active
//           : !s.is_active;
//       return matchesSearch && matchesProtocol && matchesAccess && matchesActive;
//     });
//   }, [servers, searchQuery, protocolFilter, accessFilter, activeFilter]);

//   const clearFilters = () => {
//     setSearchQuery('');
//     setProtocolFilter('');
//     setAccessFilter('');
//     setActiveFilter('');
//   };

//   // 🟢 submit new server
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setApiMessage('');
//     try {
//       const res = await createServer(newServer);
//       if (res.success) {
//         setApiMessage('✅ Server created successfully!');
//         setIsModalOpen(false);
//         setServers((prev) => [
//           {
//             ID: res.data?.id || Date.now(),
//             name: newServer.name,
//             ip: newServer.ip,
//             protocol: newServer.protocol,
//             access_type: newServer.is_private ? 'private' : 'public',
//             country: newServer.country,
//             city: newServer.city,
//             config: newServer.config,
//             is_active: newServer.is_active,
//           },
//           ...prev,
//         ]);
//       } else {
//         setApiMessage('❌ Failed to create server.');
//       }
//     } catch (err) {
//       console.error(err);
//       setApiMessage('⚠️ Error creating server.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Servers</h1>

//       {/* Filters + Add button */}
//       <div className="mb-4">
//         <div className="flex justify-end mb-2">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200"
//           >
//             + Add New Server
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           <input
//             type="text"
//             placeholder="Search by ID, name, IP..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {/* Protocol Dropdown */}
//           <select
//             value={newServer.protocol}
//             onChange={(e) => setNewServer({ ...newServer, protocol: e.target.value })}
//             required
//             className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//           >
//             <option value="">Select Protocol</option>
//             <option value="OpenVPN">OpenVPN</option>
//             <option value="V2Ray">V2Ray</option>
//           </select>
//           <select
//             value={accessFilter}
//             onChange={(e) => setAccessFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Access</option>
//             <option value="public">Public</option>
//             <option value="private">Private</option>
//           </select>
//           <select
//             value={activeFilter}
//             onChange={(e) => setActiveFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Table */}
//       <div className="rounded-xl border border-slate-800 overflow-hidden">
//         <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500 transition-colors duration-300">
//           <table className="w-full border-collapse text-sm min-w-[1000px]">
//             <thead>
//               <tr className="bg-slate-900/70 text-slate-400">
//                 {['ID', 'Name', 'IP', 'Protocol', 'Access', 'Country', 'City', 'Config', 'Action'].map((h) => (
//                   <th key={h} className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/70 backdrop-blur-sm">
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
//               ) : filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
//                     No servers found.
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((s, i) => {
//                   const tone = s.access_type === 'public' ? 'green' : 'red';
//                   return (
//                     <tr key={s.ID} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.ID}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.name}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.ip}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.protocol}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={tone}>{s.access_type}</Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.country}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">{s.city}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <CopyButton text={s.config} />
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex items-center gap-4">
//                           <Link
//                             href={`/servers/${s.ID}/view`}
//                             className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
//                             title="View Server"
//                           >
//                             <Eye size={18} strokeWidth={2} />
//                           </Link>
//                           <Link
//                             href={`/servers/${s.ID}/manage`}
//                             className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
//                             title="Manage Server"
//                           >
//                             <Wrench size={18} strokeWidth={2} />
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

//       {/* 🟦 Add Server Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative shadow-lg">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-slate-400 hover:text-white"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-xl font-semibold mb-4 text-white">Add New Server</h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input type="text" placeholder="Name" value={newServer.name} onChange={(e) => setNewServer({ ...newServer, name: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <input type="text" placeholder="IP Address" value={newServer.ip} onChange={(e) => setNewServer({ ...newServer, ip: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <input type="text" placeholder="Country" value={newServer.country} onChange={(e) => setNewServer({ ...newServer, country: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <input type="text" placeholder="City" value={newServer.city} onChange={(e) => setNewServer({ ...newServer, city: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <input type="text" placeholder="Protocol" value={newServer.protocol} onChange={(e) => setNewServer({ ...newServer, protocol: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <textarea placeholder="Config data..." value={newServer.config} onChange={(e) => setNewServer({ ...newServer, config: e.target.value })} required rows={4} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center text-slate-300 text-sm gap-2">
//                   <input type="checkbox" checked={newServer.is_private} onChange={(e) => setNewServer({ ...newServer, is_private: e.target.checked })} />
//                   Private Server
//                 </label>
//                 <label className="flex items-center text-slate-300 text-sm gap-2">
//                   <input type="checkbox" checked={newServer.is_active} onChange={(e) => setNewServer({ ...newServer, is_active: e.target.checked })} />
//                   Active
//                 </label>
//               </div>
//               <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white disabled:opacity-50">
//                 {isSubmitting ? 'Creating...' : 'Create Server'}
//               </button>
//             </form>
//             {apiMessage && <p className="text-center mt-3 text-slate-300">{apiMessage}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchServers } from '@/app/api/fetchServers';
import { createServer } from '@/app/api/createServer';
import Link from 'next/link';
import CopyButton from '../components/CopyButton';
import { Eye, Wrench, X } from 'lucide-react';

type Server = {
  id: number;
  name: string;
  ip: string;
  protocol: string;
  country: string;
  city: string;
  config?: string;
  is_private: boolean;
  is_active: boolean;
};

function Pill({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'green' | 'yellow' | 'red' | 'blue';
}) {
  const map: Record<string, string> = {
    default: 'bg-slate-700/60 border-slate-600 text-white',
    green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
    yellow: 'bg-[oklch(85.2%_0.199_91.936)] border-[oklch(85.2%_0.199_91.936)] text-black',
    red: 'bg-rose-900/60 border-rose-700 text-rose-50',
    blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [protocolFilter, setProtocolFilter] = useState('');
  const [isPrivateFilter, setIsPrivateFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServer, setNewServer] = useState({
    country: '',
    city: '',
    ip: '',
    name: '',
    password: '',
    protocol: '',
    config: '',
    is_private: false,
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  async function loadServers() {
    try {
      const servers: Server[] = await fetchServers();
      setServers(servers);
    } catch (err) {
      console.error('Failed to load servers', err);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadServers();
  }, []);

  const protocolOptions = useMemo(() => {
    console.log('Servers: ', servers)
    const set = new Set<string>();
    servers.forEach((s) => s.protocol && set.add(s.protocol));
    return Array.from(set);
  }, [servers]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return servers.filter((s) => {
      const matchesSearch =
        !q ||
        s.id.toString().includes(q) ||
        s.name?.toLowerCase().includes(q) ||
        s.ip?.toLowerCase().includes(q) ||
        s.country?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q);
      const matchesProtocol = protocolFilter
        ? s.protocol?.toLowerCase() === protocolFilter
        : true;
      const matchesAccess =
        isPrivateFilter === ''
        ? true
        : isPrivateFilter === 'private'
        ? s.is_private
        : !s.is_private;

      const matchesActive =
        activeFilter === ''
          ? true
          : activeFilter === 'active'
          ? s.is_active
          : !s.is_active;
      return matchesSearch && matchesProtocol && matchesAccess && matchesActive;
    });
  }, [servers, searchQuery, protocolFilter, isPrivateFilter, activeFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setProtocolFilter('');
    setIsPrivateFilter('');
    setActiveFilter('');
  };

  // Create new server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiMessage('');
    try {
      const res = await createServer(newServer);
      if (res.success) {  
        setApiMessage('✅ Server created successfully!');
        setIsModalOpen(false);
        // setServers((prev) => [
        //   {
        //     id: res.data?.id || Date.now(),
        //     name: newServer.name,
        //     ip: newServer.ip,
        //     protocol: newServer.protocol,
        //     access_type: newServer.is_private ? 'private' : 'public',
        //     country: newServer.country,
        //     city: newServer.city,
        //     config: newServer.config,
        //     is_private: newServer.is_private, // ✅ add this line
        //     is_active: newServer.is_active,
        //   },
        //   ...prev,
        // ]);
        // ✅ Reload the full list from the API (always consistent)
        await loadServers();
      } else {
        setApiMessage('❌ Failed to create server.');
      }
    } catch (err) {
      console.error(err);
      setApiMessage('⚠️ Error creating server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Servers</h1>

      {/* Filters + Add button */}
      <div className="mb-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200"
          >
            + Add New Server
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Search by ID, name, IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={protocolFilter}
            onChange={(e) => setProtocolFilter(e.target.value.toLowerCase())}
            className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
          >
            <option value="">All Protocols</option>
            {protocolOptions.map((p) => (
              <option key={p} value={p.toLowerCase()}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={isPrivateFilter}
            onChange={(e) => setIsPrivateFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
          >
            <option value="">All Access</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500 transition-colors duration-300">
          <table className="w-full border-collapse text-sm min-w-[1000px]">
            <thead>
              <tr className="bg-slate-900/70 text-slate-400">
                {['ID', 'Name', 'IP', 'Protocol', 'Access Type', 'Country', 'City', 'Config', 'Action'].map((h) => (
                  <th key={h} className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/70 backdrop-blur-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center px-4 py-8 text-slate-400">
                    No servers found.
                  </td>
                </tr>
              ) : (
                filtered.map((s, i) => {
                  const tone = s.is_private ? 'yellow' : 'green';
                  const accessType = s.is_private ? 'Private' : 'Public';
                  return (
                    <tr key={s.id} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
                      <td className="px-4 py-3 border-b border-slate-800">{s.id}</td>
                      <td className="px-4 py-3 border-b border-slate-800">{s.name}</td>
                      <td className="px-4 py-3 border-b border-slate-800">{s.ip}</td>
                      <td className="px-4 py-3 border-b border-slate-800">{s.protocol}</td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone={tone}>{accessType}</Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">{s.country}</td>
                      <td className="px-4 py-3 border-b border-slate-800">{s.city}</td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <CopyButton text={s.config ?? ''} />
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/servers/${s.id}/view`}
                            className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
                            title="View Server"
                          >
                            <Eye size={18} strokeWidth={2} />
                          </Link>
                          <Link
                            href={`/servers/${s.id}/manage`}
                            className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
                            title="Manage Server"
                          >
                            <Wrench size={18} strokeWidth={2} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Server Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-white">Add New Server</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Name" value={newServer.name} onChange={(e) => setNewServer({ ...newServer, name: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
              <input type="text" placeholder="IP Address" value={newServer.ip} onChange={(e) => setNewServer({ ...newServer, ip: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
              <input type="text" placeholder="Country" value={newServer.country} onChange={(e) => setNewServer({ ...newServer, country: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />
              <input type="text" placeholder="City" value={newServer.city} onChange={(e) => setNewServer({ ...newServer, city: e.target.value })} required className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />

              {/* 🔽 Protocol Dropdown */}
              <select
                value={newServer.protocol}
                onChange={(e) => setNewServer({ ...newServer, protocol: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
              >
                <option value="">Select Protocol</option>
                <option value="OpenVPN">OpenVPN</option>
                <option value="V2Ray">V2Ray</option>
              </select>

              <textarea placeholder="Config data..." value={newServer.config} onChange={(e) => setNewServer({ ...newServer, config: e.target.value })} required rows={4} className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md" />

              <div className="flex items-center justify-between">
                <label className="flex items-center text-slate-300 text-sm gap-2">
                  <input type="checkbox" checked={newServer.is_private} onChange={(e) => setNewServer({ ...newServer, is_private: e.target.checked })} />
                  Private Server
                </label>
                <label className="flex items-center text-slate-300 text-sm gap-2">
                  <input type="checkbox" checked={newServer.is_active} onChange={(e) => setNewServer({ ...newServer, is_active: e.target.checked })} />
                  Active
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white disabled:opacity-50">
                {isSubmitting ? 'Creating...' : 'Create Server'}
              </button>
            </form>

            {apiMessage && <p className="text-center mt-3 text-slate-300">{apiMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
