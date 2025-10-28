//=====================================================================
//WITHOUT API FILTERING (NORMAL FILTERING)
//=====================================================================
// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchOrders, Order } from '@/app/api/fetchOrders';
// import { View, UserPen} from 'lucide-react';

// function Pill({
//   children,
//   tone = 'default',
// }: {
//   children: React.ReactNode;
//   tone?:
//     | 'default'
//     | 'green'
//     | 'yellow'
//     | 'yellow1'
//     | 'red'
//     | 'blue'
//     | 'emerald'
//     | 'orange'
//     | 'brown'
//     | 'purple'
//     | 'blue1'
//     | 'green1';
// }) {
//   const map: Record<string, string> = {
//     default: 'bg-slate-700/60 border-slate-600 text-white',
//     green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
//     yellow: 'bg-[oklch(90.5%_0.182_98.111)] border-[oklch(94.5%_0.129_101.54)] text-black',
//     red: 'bg-rose-900/60 border-rose-700 text-rose-50',
//     blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
//     emerald: 'bg-[oklch(96.2%_0.044_156.743)] border-[oklch(96.2%_0.044_156.743)] text-black',
//     // plan colors
//     orange: 'bg-[oklch(70.5%_0.213_47.604)] border-[oklch(70.5%_0.213_47.604)] text-black',
//     yellow1: 'bg-[oklch(85.2%_0.199_91.936)] border-[oklch(85.2%_0.199_91.936)] text-black',
//     brown: 'bg-[oklch(42.1%_0.095_57.708)] border-[oklch(42.1%_0.095_57.708)] text-white',
//     purple: 'bg-[oklch(51.8%_0.253_323.949)] border-[oklch(51.8%_0.253_323.949)] text-white',
//     blue1: 'bg-[oklch(74.6%_0.16_232.661)] border-[oklch(74.6%_0.16_232.661)] text-black',
//     green1: 'bg-[oklch(84.1%_0.238_128.85)] border-[oklch(84.1%_0.238_128.85)] text-black',
//   };

//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   // filter states
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [planFilter, setPlanFilter] = useState('');

//   useEffect(() => {
//     async function loadOrders() {
//       try {
//         const data = await fetchOrders();
//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to load orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadOrders();
//   }, []);

//   // filtering logic
//   const filteredOrders = orders.filter((order) => {
//     const query = searchQuery.toLowerCase();

//     // search by ID, name, email
//     const matchesSearch =
//       order.id.toString().includes(query) ||
//       order.billing.first_name.toLowerCase().includes(query) ||
//       order.billing.last_name.toLowerCase().includes(query) ||
//       order.billing.email.toLowerCase().includes(query);

//     // status filter
//     const matchesStatus = statusFilter
//       ? order.status.toLowerCase() === statusFilter
//       : true;

//     // plan filter
//     const matchesPlan = planFilter
//       ? order.detected_plan?.toLowerCase() === planFilter
//       : true;

//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   // reset filters
//   const clearFilters = () => {
//     setSearchQuery('');
//     setStatusFilter('');
//     setPlanFilter('');
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Orders</h1>

//       {/* 🔎 Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by ID, name, or email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Statuses</option>
//           <option value="completed">Completed</option>
//           <option value="pending">Pending</option>
//           <option value="on-hold">On Hold</option>
//           <option value="failed">Failed</option>
//         </select>

//         <select
//           value={planFilter}
//           onChange={(e) => setPlanFilter(e.target.value)}
//           className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//         >
//           <option value="">All Plans</option>
//           <option value="1_week">1 Week</option>
//           <option value="1_month">1 Month</option>
//           <option value="3_months">3 Months</option>
//           <option value="6_months">6 Months</option>
//           <option value="1_year">1 Year</option>
//           <option value="2_years">2 Years</option>
//         </select>

//         {/* Clear Filters Button */}
//         <button
//           onClick={clearFilters}
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border border-slate-800 overflow-hidden">
//         <table className="w-full border-collapse text-sm">
//           <thead>
//             <tr className="bg-slate-900/70 text-slate-400">
//               {['ID', 'Customer', 'Date', 'Status', 'Total', 'Plan'].map((h) => (
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
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="text-center px-4 py-8 text-slate-400">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredOrders.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center px-4 py-8 text-slate-400">
//                   No orders found.
//                 </td>
//               </tr>
//             ) : (
//               filteredOrders.map((order, i) => {
//                 const normalizedStatus = order.status.toLowerCase().replace(/\s+/g, '-');
//                 const statusTone =
//                   normalizedStatus === 'completed'
//                     ? 'green'
//                     : normalizedStatus === 'failed'
//                     ? 'red'
//                     : normalizedStatus === 'pending'
//                     ? 'yellow'
//                     : normalizedStatus === 'on-hold'
//                     ? 'yellow'
//                     : 'default';

//                 const plan = order.detected_plan?.toLowerCase();
//                 const detected_planTone =
//                   plan === '1_week'
//                     ? 'orange'
//                     : plan === '1_month'
//                     ? 'brown'
//                     : plan === '3_months'
//                     ? 'purple'
//                     : plan === '6_months'
//                     ? 'blue1'
//                     : plan === '1_year'
//                     ? 'green1'
//                     : plan === '2_years'
//                     ? 'yellow1'
//                     : 'default';

//                 return (
//                   <tr
//                     key={order.id}
//                     className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}
//                   >
//                     <td className="px-4 py-3 border-b border-slate-800">{order.id}</td>
//                     <td className="px-4 py-3 border-b border-slate-800">
//                       {order.billing.first_name} {order.billing.last_name}
//                       <br />
//                       <span className="text-slate-400 text-xs">
//                         {order.billing.email}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 border-b border-slate-800">
//                       {new Date(order.date_created).toLocaleString()}
//                     </td>
//                     <td className="px-4 py-3 border-b border-slate-800">
//                       <Pill tone={statusTone}>{order.status.toUpperCase()}</Pill>
//                     </td>
//                     <td className="px-4 py-3 border-b border-slate-800">
//                       <Pill tone="emerald">
//                         {order.total} {order.currency}
//                       </Pill>
//                     </td>
//                     <td className="px-4 py-3 border-b border-slate-800 text-black">
//                       <Pill tone={detected_planTone}>
//                         {order.detected_plan || '-'}
//                       </Pill>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//NEW BEFORE ADD NEW BUTTON API INTEG

// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchOrders, Order } from '@/app/api/fetchOrders';
// import {createOrder} from '@/app/api/createOrder';
// import Link from 'next/link';
// import { X, View, UserPen } from 'lucide-react'; //

// function Pill({
//   children,
//   tone = 'default',
// }: {
//   children: React.ReactNode;
//   tone?:
//     | 'default'
//     | 'green'
//     | 'yellow'
//     | 'yellow1'
//     | 'red'
//     | 'blue'
//     | 'emerald'
//     | 'orange'
//     | 'brown'
//     | 'purple'
//     | 'blue1'
//     | 'green1';
// }) {
//   const map: Record<string, string> = {
//     default: 'bg-slate-700/60 border-slate-600 text-white',
//     green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
//     yellow: 'bg-[oklch(90.5%_0.182_98.111)] border-[oklch(94.5%_0.129_101.54)] text-black',
//     red: 'bg-rose-900/60 border-rose-700 text-rose-50',
//     blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
//     emerald: 'bg-[oklch(96.2%_0.044_156.743)] border-[oklch(96.2%_0.044_156.743)] text-black',
//     // plan colors
//     orange: 'bg-[oklch(70.5%_0.213_47.604)] border-[oklch(70.5%_0.213_47.604)] text-black',
//     yellow1: 'bg-[oklch(85.2%_0.199_91.936)] border-[oklch(85.2%_0.199_91.936)] text-black',
//     brown: 'bg-[oklch(42.1%_0.095_57.708)] border-[oklch(42.1%_0.095_57.708)] text-white',
//     purple: 'bg-[oklch(51.8%_0.253_323.949)] border-[oklch(51.8%_0.253_323.949)] text-white',
//     blue1: 'bg-[oklch(74.6%_0.16_232.661)] border-[oklch(74.6%_0.16_232.661)] text-black',
//     green1: 'bg-[oklch(84.1%_0.238_128.85)] border-[oklch(84.1%_0.238_128.85)] text-black',
//   };

//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   // filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [planFilter, setPlanFilter] = useState('');

//   useEffect(() => {
//     async function loadOrders() {
//       try {
//         const data = await fetchOrders();
//         setOrders(data);
//       } catch (error) {
//         console.error('Failed to load orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadOrders();
//   }, []);

//   const filteredOrders = orders.filter((order) => {
//     const query = searchQuery.toLowerCase();
//     const matchesSearch =
//       order.id.toString().includes(query) ||
//       order.billing.first_name.toLowerCase().includes(query) ||
//       order.billing.last_name.toLowerCase().includes(query) ||
//       order.billing.email.toLowerCase().includes(query);

//     const matchesStatus = statusFilter
//       ? order.status.toLowerCase() === statusFilter
//       : true;

//     const matchesPlan = planFilter
//       ? order.detected_plan?.toLowerCase() === planFilter
//       : true;

//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   const clearFilters = () => {
//     setSearchQuery('');
//     setStatusFilter('');
//     setPlanFilter('');
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Orders</h1>

//       {/* 🔎 Filters + Add Order Button */}
//       <div className="mb-4">
//         <div className="flex justify-end mb-2">
//           <button
//             className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200"
//           >
//             + Add New Order
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search by ID, name, or email..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Statuses</option>
//             <option value="completed">Completed</option>
//             <option value="pending">Pending</option>
//             <option value="on-hold">On Hold</option>
//             <option value="failed">Failed</option>
//           </select>

//           <select
//             value={planFilter}
//             onChange={(e) => setPlanFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Plans</option>
//             <option value="1_week">1 Week</option>
//             <option value="1_month">1 Month</option>
//             <option value="3_months">3 Months</option>
//             <option value="6_months">6 Months</option>
//             <option value="1_year">1 Year</option>
//             <option value="2_years">2 Years</option>
//           </select>

//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* 📜 Scrollable Table */}
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
//                 {['ID', 'Customer', 'Date', 'Status', 'Total', 'Plan', 'Action'].map((h) => (
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
//                   <td colSpan={7} className="text-center px-4 py-8 text-slate-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center px-4 py-8 text-slate-400">
//                     No orders found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredOrders.map((order, i) => {
//                   const normalizedStatus = order.status.toLowerCase().replace(/\s+/g, '-');
//                   const statusTone =
//                     normalizedStatus === 'completed'
//                       ? 'green'
//                       : normalizedStatus === 'failed'
//                       ? 'red'
//                       : normalizedStatus === 'pending'
//                       ? 'yellow'
//                       : normalizedStatus === 'on-hold'
//                       ? 'yellow'
//                       : 'default';

//                   const plan = order.detected_plan?.toLowerCase();
//                   const detected_planTone =
//                     plan === '1_week'
//                       ? 'orange'
//                       : plan === '1_month'
//                       ? 'brown'
//                       : plan === '3_months'
//                       ? 'purple'
//                       : plan === '6_months'
//                       ? 'blue1'
//                       : plan === '1_year'
//                       ? 'green1'
//                       : plan === '2_years'
//                       ? 'yellow1'
//                       : 'default';

//                   return (
//                     <tr key={order.id} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
//                       <td className="px-4 py-3 border-b border-slate-800">{order.id}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {order.billing.first_name} {order.billing.last_name}
//                         <br />
//                         <span className="text-slate-400 text-xs">{order.billing.email}</span>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {new Date(order.date_created).toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={statusTone}>{order.status.toUpperCase()}</Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone="emerald">
//                           {order.total} {order.currency}
//                         </Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800 text-black">
//                         <Pill tone={detected_planTone}>
//                           {order.detected_plan || '-'}
//                         </Pill>
//                       </td>

//                       {/* 👇 Added Action Icons */}
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex items-center gap-4">
//                           <Link
//                             href={`/orders/${order.id}/view`}
//                             className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
//                             title="View Order"
//                           >
//                             <View size={18} strokeWidth={2} />
//                           </Link>
//                           <Link
//                             href={`/orders/${order.id}/manage`}
//                             className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
//                             title="Manage Order"
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

//=====================================================After API MODAL INTEG========================================================================
// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchOrders, Order } from '@/app/api/fetchOrders';
// import { createOrder } from '@/app/api/createOrder';
// import { fetchProducts, products } from '@/lib/products/fetchProducts';
// import Link from 'next/link';
// import { X, View, UserPen } from 'lucide-react';

// function Pill({
//   children,
//   tone = 'default',
// }: {
//   children: React.ReactNode;
//   tone?:
//     | 'default'
//     | 'green'
//     | 'yellow'
//     | 'yellow1'
//     | 'red'
//     | 'blue'
//     | 'emerald'
//     | 'orange'
//     | 'brown'
//     | 'purple'
//     | 'blue1'
//     | 'green1';
// }) {
//   const map: Record<string, string> = {
//     default: 'bg-slate-700/60 border-slate-600 text-white',
//     green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
//     yellow: 'bg-[oklch(90.5%_0.182_98.111)] border-[oklch(94.5%_0.129_101.54)] text-black',
//     red: 'bg-rose-900/60 border-rose-700 text-rose-50',
//     blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
//     emerald: 'bg-[oklch(96.2%_0.044_156.743)] border-[oklch(96.2%_0.044_156.743)] text-black',
//     orange: 'bg-[oklch(70.5%_0.213_47.604)] border-[oklch(70.5%_0.213_47.604)] text-black',
//     yellow1: 'bg-[oklch(85.2%_0.199_91.936)] border-[oklch(85.2%_0.199_91.936)] text-black',
//     brown: 'bg-[oklch(42.1%_0.095_57.708)] border-[oklch(42.1%_0.095_57.708)] text-white',
//     purple: 'bg-[oklch(51.8%_0.253_323.949)] border-[oklch(51.8%_0.253_323.949)] text-white',
//     blue1: 'bg-[oklch(74.6%_0.16_232.661)] border-[oklch(74.6%_0.16_232.661)] text-black',
//     green1: 'bg-[oklch(84.1%_0.238_128.85)] border-[oklch(84.1%_0.238_128.85)] text-black',
//   };

//   return (
//     <span
//       className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [planFilter, setPlanFilter] = useState('');

//   const [products, setProducts] = useState<Product[]>([]);

//   // 🟩 Modal States
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newOrder, setNewOrder] = useState({
//     user_id: '',
//     product_id: 0,
//     quantity: 1,
//     order_status: 'on-hold',
//     payment_method: 'manual',
//     order_total: 0,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiMessage, setApiMessage] = useState('');

//   // 🟨 New: Handle product selection logic
//   const handleProductChange = (productId: string) => {
//     const product = products.find((p) => p.product_id === Number(productId));
//     if (product) {
//       setNewOrder({
//         ...newOrder,
//         product_id: product.product_id,
//         order_total: product.price,
//       });
//     }
//   };

//   useEffect(() => {
//     async function loadOrdersAndProducts() {
//       try {
//         const [ordersData, productsData] = await Promise.all([
//           fetchOrders(),
//           fetchProducts(),
//         ]);
//         setOrders(ordersData);
//         setProducts(productsData);
//       } catch (error) {
//         console.error('Failed to load data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadOrdersAndProducts();
//   }, []);

//   const filteredOrders = orders.filter((order) => {
//     const query = searchQuery.toLowerCase();
//     const matchesSearch =
//       order.id.toString().includes(query) ||
//       order.billing.first_name.toLowerCase().includes(query) ||
//       order.billing.last_name.toLowerCase().includes(query) ||
//       order.billing.email.toLowerCase().includes(query);

//     const matchesStatus = statusFilter
//       ? order.status.toLowerCase() === statusFilter
//       : true;

//     const matchesPlan = planFilter
//       ? order.detected_plan?.toLowerCase() === planFilter
//       : true;

//     return matchesSearch && matchesStatus && matchesPlan;
//   });

//   const clearFilters = () => {
//     setSearchQuery('');
//     setStatusFilter('');
//     setPlanFilter('');
//   };

//   // 🟢 Submit new order
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setApiMessage('');

//     try {
//       const body = {
//         user_id: Number(newOrder.user_id),
//         product_id: Number(newOrder.product_id),
//         quantity: Number(newOrder.quantity),
//         order_status: newOrder.order_status,
//         payment_method: newOrder.payment_method,
//         order_total: Number(newOrder.order_total),
//       };

//       const response = await createOrder(body);
//       if (response.success) {
//         setApiMessage('✅ Order created successfully!');
//         setIsModalOpen(false);
//         // Update table immediately
//         setOrders((prev) => [
//           {
//             id: response.data?.order_id ?? 0,
//             status: response.data?.order_status ?? 'on-hold',
//             total: response.data?.order_total.toString() ?? '0',
//             currency: response.data?.currency ?? 'USD',
//             date_created: response.data?.created_at ?? new Date().toISOString(),
//             date_modified: response.data?.created_at ?? new Date().toISOString(),
//             customer_id: response.data?.user_id ?? 0,
//             billing: {
//               first_name: '',
//               last_name: '',
//               email: response.data?.user_email ?? '',
//             },
//             payment_method: response.data?.payment_method ?? 'manual',
//             payment_method_title: '',
//             items: [],
//             detected_plan: response.data?.product?.product_name ?? '',
//           },
//           ...prev,
//         ]);
//       } else {
//         setApiMessage('❌ Failed to create order.');
//       }
//     } catch (err) {
//       console.error(err);
//       setApiMessage('⚠️ Error creating order.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-semibold">Orders</h1>

//       {/* 🔎 Filters + Add Order Button */}
//       <div className="mb-4">
//         <div className="flex justify-end mb-2">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200"
//           >
//             + Add New Order
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             type="text"
//             placeholder="Search by ID, name, or email..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Statuses</option>
//             <option value="completed">Completed</option>
//             <option value="pending">Pending</option>
//             <option value="on-hold">On Hold</option>
//             <option value="failed">Failed</option>
//           </select>

//           <select
//             value={planFilter}
//             onChange={(e) => setPlanFilter(e.target.value)}
//             className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
//           >
//             <option value="">All Plans</option>
//             <option value="1_week">1 Week</option>
//             <option value="1_month">1 Month</option>
//             <option value="3_months">3 Months</option>
//             <option value="6_months">6 Months</option>
//             <option value="1_year">1 Year</option>
//             <option value="2_years">2 Years</option>
//           </select>

//           <button
//             onClick={clearFilters}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </div>

//       {/* 📜 Scrollable Table */}
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
//                 {['ID', 'Customer', 'Date', 'Status', 'Total', 'Plan', 'Action'].map((h) => (
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
//                   <td colSpan={7} className="text-center px-4 py-8 text-slate-400">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : filteredOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center px-4 py-8 text-slate-400">
//                     No orders found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredOrders.map((order, i) => {
//                   const normalizedStatus = order.status.toLowerCase().replace(/\s+/g, '-');
//                   const statusTone =
//                     normalizedStatus === 'completed'
//                       ? 'green'
//                       : normalizedStatus === 'failed'
//                       ? 'red'
//                       : normalizedStatus === 'pending'
//                       ? 'yellow'
//                       : normalizedStatus === 'on-hold'
//                       ? 'yellow'
//                       : 'default';

//                   const plan = order.detected_plan?.toLowerCase();
//                   const detected_planTone =
//                     plan === '1_week'
//                       ? 'orange'
//                       : plan === '1_month'
//                       ? 'brown'
//                       : plan === '3_months'
//                       ? 'purple'
//                       : plan === '6_months'
//                       ? 'blue1'
//                       : plan === '1_year'
//                       ? 'green1'
//                       : plan === '2_years'
//                       ? 'yellow1'
//                       : 'default';

//                   return (
//                     <tr key={order.id} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
//                       <td className="px-4 py-3 border-b border-slate-800">{order.id}</td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {order.billing.first_name} {order.billing.last_name}
//                         <br />
//                         <span className="text-slate-400 text-xs">{order.billing.email}</span>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         {new Date(order.date_created).toLocaleString()}
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone={statusTone}>{order.status.toUpperCase()}</Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <Pill tone="emerald">
//                           {order.total} {order.currency}
//                         </Pill>
//                       </td>
//                       <td className="px-4 py-3 border-b border-slate-800 text-black">
//                         <Pill tone={detected_planTone}>
//                           {order.detected_plan || '-'}
//                         </Pill>
//                       </td>

//                       {/* 👇 Added Action Icons */}
//                       <td className="px-4 py-3 border-b border-slate-800">
//                         <div className="flex items-center gap-4">
//                           <Link
//                             href={`/orders/${order.id}/view`}
//                             className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
//                             title="View Order"
//                           >
//                             <View size={18} strokeWidth={2} />
//                           </Link>
//                           <Link
//                             href={`/orders/${order.id}/manage`}
//                             className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
//                             title="Manage Order"
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

//       {/* 🟦 Add New Order Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative shadow-lg">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-slate-400 hover:text-white"
//             >
//               <X size={20} />
//             </button>

//             <h2 className="text-xl font-semibold mb-4 text-white">Add New Order</h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="number"
//                 placeholder="User ID"
//                 value={newOrder.user_id}
//                 onChange={(e) => setNewOrder({ ...newOrder, user_id: e.target.value })}
//                 required
//                 className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//               />
//               <select
//                 value={newOrder.product_id || ''}
//                 onChange={(e) => handleProductChange(e.target.value)}
//                 required
//                 className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//               >
//                 <option value="">Select Product</option>
//                 {products.map((p) => (
//                   <option key={p.product_id} value={p.product_id}>
//                     {p.product_name} (${p.price})
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 min={1}
//                 value={newOrder.quantity}
//                 onChange={(e) =>
//                   setNewOrder({
//                     ...newOrder,
//                     quantity: Number.isNaN(e.currentTarget.valueAsNumber)
//                       ? 0
//                       : e.currentTarget.valueAsNumber,
//                   })
//                 }
//                 required
//                 className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//               />
//               <select
//                 value={newOrder.order_status}
//                 onChange={(e) => setNewOrder({ ...newOrder, order_status: e.target.value })}
//                 className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//               >
//                 <option value="on-hold">On Hold</option>
//                 <option value="completed">Completed</option>
//                 <option value="pending">Pending</option>
//                 <option value="failed">Failed</option>
//               </select>
//               <select
//                 value={newOrder.payment_method}
//                 onChange={(e) => setNewOrder({ ...newOrder, payment_method: e.target.value })}
//                 className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
//               >
//                 <option value="manual">Manual</option>
//                 <option value="bacs">Bank Transfer</option>
//                 <option value="paypal">PayPal</option>
//               </select>
//               <input
//                 type="number"
//                 placeholder="Order Total"
//                 value={newOrder.order_total}
//                 readOnly
//                 className="w-full px-3 py-2 bg-slate-900 text-gray-400 border border-slate-700 rounded-md"
//               />
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white disabled:opacity-50"
//               >
//                 {isSubmitting ? 'Creating...' : 'Create Order'}
//               </button>
//             </form>

//             {apiMessage && (
//               <p className="text-center mt-3 text-slate-300">{apiMessage}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { fetchOrders } from "@/lib/orders/fetchOrders";
import { fetchProducts } from "@/lib/products/fetchProducts";
import OrdersTable from "@/components/orders/OrdersTable";

export default async function OrdersPage() {
  try {
    // 🧠 Server-side data fetching (secure — token never exposed to client)
    const [orders, products] = await Promise.all([
      fetchOrders(),
      fetchProducts(),
    ]);

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        {/* ✅ Pass initial data to client-side table */}
        <OrdersTable initialOrders={orders} availableProducts={products} />
      </div>
    );
  } catch (err) {
    console.error("❌ Failed to load orders page:", err);
    return (
      <div className="p-6 text-red-400">
        ⚠️ Failed to load orders data. Please check your API or login session.
      </div>
    );
  }
}
