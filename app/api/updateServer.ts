// // /app/api/updateServer.ts

// 'use client';

// import { getSession } from 'next-auth/react';

// export interface UpdateServerResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     id: number;
//     city?: string;
//     is_active?: boolean;
//   };
// }

// export interface UpdateServerPayload {
//   city?: string;
//   country?: string;
//   name?: string;
//   ip?: string;
//   protocol?: string;
//   config?: string;
//   is_private?: boolean;
//   is_active?: boolean;
// }

// export async function updateServer(
//   serverId: number,
//   body: UpdateServerPayload
// ): Promise<UpdateServerResponse> {
//   const session = await getSession();
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error('No active session found. Please log in again.');
//   }

//   const res = await fetch(
//     `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${serverId}`,
//     {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(body),
//       cache: 'no-store',
//     }
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to update server ${serverId}`);
//   }

//   return res.json();
// }
