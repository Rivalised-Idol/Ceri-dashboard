'use client';

import { getSession } from 'next-auth/react';

export interface Server {
  id: number;
  name: string;
  ip: string;
  protocol: string;
  country: string;
  city: string;
  is_private: boolean;
  is_active: boolean;
  config?: string;
  password?: string;
}

export async function fetchServerById(id: string | number): Promise<Server> {
  // 🟢 Get the current session
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated fetch request
  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Failed to fetch server with ID ${id}:`, errText);
    throw new Error(`Failed to fetch server with ID ${id}`);
  }

  const json = await res.json();
  return json.data; // ✅ Return only the relevant data block
}

