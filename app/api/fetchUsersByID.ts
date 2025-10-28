// // lib/fetchUserById.ts
// 'use client';

// import { getSession } from 'next-auth/react';

// export async function fetchUserById(id: string) {
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error('No active session found. Please log in again.');
//   }

//   const res = await fetch(
//     `https://cerivpn.com/wp-json/custom/v1/admin/users/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: 'no-store',
//     }
//   );

//   if (!res.ok) throw new Error('Failed to fetch user');
//   return res.json();
// }
