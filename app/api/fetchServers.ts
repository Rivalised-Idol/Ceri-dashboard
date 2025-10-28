// // /lib/fetchServers.ts

// 'use client';

// import { getSession } from 'next-auth/react';

// export interface Server {
//   id: number;
//   name: string;
//   ip: string;
//   protocol: string;
//   country: string;
//   city: string;
//   is_private: boolean;
//   is_active: boolean;
//   config?: string;
//   password?: string;
// }

// export async function fetchServers(): Promise<Server[]> {
//   // 🟢 Retrieve active session token
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error('No active session found. Please log in again.');
//   }

//   // 🔐 Authenticated API call
//   const res = await fetch('https://cerivpn.com/wp-json/cerivpn/v1/admin/servers', {
//     headers: {
//       Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
//     },
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     console.error('❌ Failed to fetch servers:', errText);
//     throw new Error('Failed to fetch servers');
//   }

//   const json = await res.json();
//   return json.data?.servers || [];
// }
