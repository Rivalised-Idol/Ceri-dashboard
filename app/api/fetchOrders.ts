// //BEFORE API FILTER FETCHING
// //==============================================================
// // app/api/fetchOrders.ts
// 'use client';

// import { getSession } from 'next-auth/react';

// export interface OrderItem {
//   name: string;
//   quantity: number;
//   total: string;
//   sku: string;
//   plan: string;
// }

// export interface Order {
//   id: number;
//   status: string;
//   total: string;
//   currency: string;
//   date_created: string;
//   date_modified: string;
//   customer_id: number;
//   billing: {
//     first_name: string;
//     last_name: string;
//     email: string;
//   };
//   payment_method: string;
//   payment_method_title: string;
//   items: OrderItem[];
//   detected_plan: string;
// }

// export async function fetchOrders(): Promise<Order[]> {
//   // 🟢 Get session dynamically
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error('No active session found. Please log in again.');
//   }

//   // 🔐 Authenticated fetch
//   const res = await fetch(
//     'https://cerivpn.com/wp-json/custom/v1/admin/orders/list',
//     {
//       headers: {
//         Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
//       },
//       cache: 'no-store',
//     }
//   );

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error('❌ Failed to fetch orders:', errText);
//     throw new Error('Failed to fetch orders');
//   }

//   const data = await res.json();
//   return data.orders;
// }
