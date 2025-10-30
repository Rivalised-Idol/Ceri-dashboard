// "use client";

// import { useState, useMemo } from "react";
// import Link from "next/link";
// import { View, UserPen } from "lucide-react";
// import type { UserData } from "@/types/users";

// interface UsersTableProps {
//   initialUsers: UserData[];
// }

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

// export default function UsersTable({ initialUsers }: UsersTableProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterPlan, setFilterPlan] = useState("");
//   const [sortBy, setSortBy] = useState("id_desc");

//   const filteredUsers = useMemo(() => {
//     return initialUsers
//       .filter((user) => {
//         const query = searchQuery.toLowerCase();
//         return (
//           user.user_login.toLowerCase().includes(query) ||
//           user.user_email.toLowerCase().includes(query) ||
//           user.meta.membership_status?.toLowerCase().includes(query) ||
//           user.meta.active_membership_plan?.toLowerCase().includes(query)
//         );
//       })
//       .filter((user) => {
//         if (filterStatus && user.meta.membership_status !== filterStatus)
//           return false;
//         if (
//           filterPlan &&
//           (user.meta.active_membership_plan?.toLowerCase() || "free") !==
//             filterPlan.toLowerCase()
//         )
//           return false;
//         return true;
//       })
//       .sort((a, b) =>
//         sortBy === "id_asc"
//           ? a.id - b.id
//           : sortBy === "id_desc"
//           ? b.id - a.id
//           : 0
//       );
//   }, [searchQuery, filterStatus, filterPlan, sortBy, initialUsers]);

//   const membershipStatusOptions = ["active", "inactive", "expired"];
//   const membershipPlanOptions = [
//     "free",
//     "1_week",
//     "1_month",
//     "3_months",
//     "6_months",
//     "1_year",
//   ];

//   function clearFilters() {
//     setSearchQuery("");
//     setFilterStatus("");
//     setFilterPlan("");
//     setSortBy("id_desc");
//   }

//   return (
//     <>
//       {/* Filters */}
//       <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search ID, Username, Email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Statuses</option>
//           {membershipStatusOptions.map((s) => (
//             <option key={s} value={s}>
//               {s.toUpperCase()}
//             </option>
//           ))}
//         </select>
//         <select
//           value={filterPlan}
//           onChange={(e) => setFilterPlan(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Plans</option>
//           {membershipPlanOptions.map((p) => (
//             <option key={p} value={p}>
//               {p}
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

//       {/* Table */}
//       <div className="rounded-xl border border-slate-800 overflow-hidden">
//         <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
//           <table className="w-full border-collapse text-sm min-w-[900px]">
//             <thead>
//               <tr className="bg-slate-900/70 text-slate-400">
//                 {[
//                   "Item #",
//                   "ID",
//                   "User Info",
//                   "Roles",
//                   "Registered Date",
//                   "Membership Status",
//                   "Membership Type",
//                   "Private Server",
//                   "Current Plan Expiry",
//                   "Action",
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
//               {filteredUsers.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="text-center px-4 py-8 text-slate-400"
//                   >
//                     No users found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((user, i) => {
//                   const statusTone =
//                     user.meta.membership_status === "active" ? "green" : "red";
//                   const plan = user.meta.active_membership_plan?.toLowerCase();
//                   const planTone =
//                     plan === "free"
//                       ? "default"
//                       : plan === "1_week"
//                       ? "yellow"
//                       : plan === "1_month"
//                       ? "blue"
//                       : plan === "3_months"
//                       ? "red"
//                       : plan === "6_months"
//                       ? "blue"
//                       : plan === "1_year"
//                       ? "green"
//                       : "default";

//                   return (
//                     <tr
//                       key={user.id}
//                       className={
//                         i % 2 === 0 ? "bg-slate-950" : "bg-slate-950/60"
//                       }
//                     >
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {i + 1}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {user.id}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex flex-col">
//                           <span className="text-white">
//                             <span className="font-normal text-slate-400 text-xs">
//                               Username:{" "}
//                             </span>
//                             <span className="font-semibold">
//                               {user.user_login}
//                             </span>
//                           </span>
//                           <span className="text-slate-400 text-xs">
//                             <span className="font-semibold">Email: </span>
//                             {user.user_email}
//                           </span>
//                           <span className="text-slate-400 text-xs">
//                             <span className="font-semibold">Full Name: </span>
//                             {user.first_name || ""} {user.last_name || ""}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {user.roles}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {new Date(user.user_registered).toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={statusTone}>
//                           {user.meta.membership_status?.toUpperCase() || "-"}
//                         </Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={planTone}>
//                           {user.meta.active_membership_plan || "free"}
//                         </Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">_</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {user.meta.membership_expiry_date || "-"}
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
//     </>
//   );
// }

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { View, UserPen } from "lucide-react";
import type { UserData, UsersListApiResponse } from "@/types/users";

interface UsersTableProps {
  initialUsers: UserData[];
}

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "yellow" | "red" | "blue";
}) {
  const map: Record<string, string> = {
    default: "bg-slate-700/60 border-slate-600 text-white",
    green: "bg-emerald-900/60 border-emerald-700 text-emerald-50",
    yellow: "bg-amber-900/60 border-amber-700 text-amber-50",
    red: "bg-rose-900/60 border-rose-700 text-rose-50",
    blue: "bg-blue-900/60 border-blue-700 text-blue-50",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export default function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [sortBy, setSortBy] = useState("id_desc");

  // 🔹 Fetch users from paginated endpoint
  async function loadUsers(currentPage: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/list?page=${currentPage}&per_page=5`);
      const data: UsersListApiResponse = await res.json();
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.pagination.total_pages);
        setPage(data.pagination.current_page);
      }
    } catch (err) {
      console.error("❌ Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🟦 When component mounts, load first page
  useEffect(() => {
    loadUsers(1);
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const q = searchQuery.toLowerCase();
        return (
          user.user_login.toLowerCase().includes(q) ||
          user.user_email.toLowerCase().includes(q) ||
          user.meta.membership_status?.toLowerCase().includes(q) ||
          user.meta.active_membership_plan?.toLowerCase().includes(q)
        );
      })
      .filter((user) => {
        if (filterStatus && user.meta.membership_status !== filterStatus)
          return false;
        if (
          filterPlan &&
          (user.meta.active_membership_plan?.toLowerCase() || "free") !==
            filterPlan.toLowerCase()
        )
          return false;
        return true;
      })
      .sort((a, b) =>
        sortBy === "id_asc"
          ? a.id - b.id
          : sortBy === "id_desc"
          ? b.id - a.id
          : 0
      );
  }, [users, searchQuery, filterStatus, filterPlan, sortBy]);

  function clearFilters() {
    setSearchQuery("");
    setFilterStatus("");
    setFilterPlan("");
    setSortBy("id_desc");
  }

  // 🟩 Pagination controls
  const handleNext = () => {
    if (page < totalPages) loadUsers(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) loadUsers(page - 1);
  };

  const handlePageClick = (p: number) => loadUsers(p);

  // 🧠 Options
  const membershipStatusOptions = ["active", "inactive", "expired"];
  const membershipPlanOptions = [
    "free",
    "1_week",
    "1_month",
    "3_months",
    "6_months",
    "1_year",
  ];

  return (
    <>
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search ID, Username, Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
        >
          <option value="">All Statuses</option>
          {membershipStatusOptions.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
        >
          <option value="">All Plans</option>
          {membershipPlanOptions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
        >
          <option value="id_desc">ID ↓</option>
          <option value="id_asc">ID ↑</option>
        </select>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500">
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-slate-900/70 text-slate-400">
                {[
                  "Item #",
                  "ID",
                  "User Info",
                  "Roles",
                  "Registered Date",
                  "Membership Status",
                  "Membership Type",
                  "Plan Expiry",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 z-10 bg-slate-900/70 backdrop-blur-sm"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center px-4 py-8 text-slate-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center px-4 py-8 text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => {
                  const statusTone =
                    user.meta.membership_status === "active" ? "green" : "red";
                  const plan = user.meta.active_membership_plan?.toLowerCase();
                  const planTone =
                    plan === "free"
                      ? "default"
                      : plan === "1_week"
                      ? "yellow"
                      : plan === "1_month"
                      ? "blue"
                      : plan === "3_months"
                      ? "red"
                      : plan === "6_months"
                      ? "blue"
                      : plan === "1_year"
                      ? "green"
                      : "default";

                  return (
                    <tr
                      key={user.id}
                      className={
                        i % 2 === 0 ? "bg-slate-950" : "bg-slate-950/60"
                      }
                    >
                      <td className="px-4 py-3 border-b border-slate-800">
                        {(page - 1) * 5 + (i + 1)}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {user.id}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold">
                            {user.user_login}
                          </span>
                          <span className="text-slate-400 text-xs">
                            {user.user_email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {user.roles.join(", ")}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {new Date(user.user_registered).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone={statusTone}>
                          {user.meta.membership_status?.toUpperCase() || "-"}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone={planTone}>
                          {user.meta.active_membership_plan || "free"}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {user.meta.membership_expiry_date || "-"}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/users/${user.id}/view`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View User"
                          >
                            <View size={18} strokeWidth={2} />
                          </Link>
                          <Link
                            href={`/users/${user.id}/manage`}
                            className="text-yellow-400 hover:text-yellow-300 transition-colors"
                            title="Manage User"
                          >
                            <UserPen size={18} strokeWidth={2} />
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

      {/* 🟨 Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          disabled={page <= 1}
          className="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
