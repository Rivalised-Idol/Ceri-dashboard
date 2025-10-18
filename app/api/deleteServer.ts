// /app/api/deleteServer.ts

'use client';

import { getSession } from 'next-auth/react';

export interface DeleteServerResponse {
  success: boolean;
  message: string;
  data?: {
    server_id: number | string;
  };
}

export async function deleteServer(
  serverId: number
): Promise<DeleteServerResponse> {
  // 🟢 Retrieve active session token
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated DELETE request
  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${serverId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Failed to delete server ${serverId}:`, errText);
    throw new Error(`Failed to delete server ${serverId}`);
  }

  const data = (await res.json()) as DeleteServerResponse;
  return data;
}
