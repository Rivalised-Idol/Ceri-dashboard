// // app/api/createOrder.ts
// 'use client';

// import { getSession } from 'next-auth/react';

// export interface CreateOrderBody {
//   user_id: number;
//   product_id: number;
//   quantity: number;
//   order_status: string;
//   payment_method: string;
//   order_total: number;
// }

// export interface CreatedOrderResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     order_id: number;
//     order_status: string;
//     user_id: number;
//     user_email: string;
//     product: {
//       product_id: number;
//       product_name: string;
//       product_price: string;
//       quantity: number;
//     };
//     order_total: number;
//     currency: string;
//     payment_method: string;
//     created_by: string;
//     created_at: string;
//     view_order_url: string;
//   };
// }

// export async function createOrder(
//   body: CreateOrderBody
// ): Promise<CreatedOrderResponse> {
//   // 🟢 Get the current session token dynamically
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error('No active session found. Please log in again.');
//   }

//   // 🔐 Authenticated API request using the session token
//   const res = await fetch(
//     'https://cerivpn.com/wp-json/cerivpn/v1/admin/orders/create',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`, // ✅ Dynamic token
//       },
//       body: JSON.stringify(body),
//       cache: 'no-store',
//     }
//   );

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error('❌ Failed to create new order:', errText);
//     throw new Error('Failed to create new order');
//   }

//   const data = (await res.json()) as CreatedOrderResponse;
//   return data;
// }
