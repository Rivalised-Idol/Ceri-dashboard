// /app/api/createServer.ts

'use client';

import { getSession } from 'next-auth/react';

export interface CreateServerResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    ip: string;
    country: string;
    city: string;
    protocol: string;
    is_private: boolean;
    is_active: boolean;
  };
}

export interface CreateServerPayload {
  country: string;
  city: string;
  ip: string;
  name: string;
  password?: string;
  protocol: string;
  config: string;
  is_private: boolean;
  is_active: boolean;
}

export async function createServer(
  body: CreateServerPayload
): Promise<CreateServerResponse> {
  // 🟢 Get the current session dynamically
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated request
  const res = await fetch(
    'https://cerivpn.com/wp-json/cerivpn/v1/admin/servers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('❌ Failed to create server:', errText);
    throw new Error('Failed to create server');
  }

  const data = (await res.json()) as CreateServerResponse;
  return data;
}
