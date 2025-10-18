// /app/api/deleteUser.ts

'use client';

import { getSession } from 'next-auth/react';

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data?: {
    user_id: number | string;
  };
}

export async function deleteUser(userId: number): Promise<DeleteUserResponse> {
  // 🟢 Get the active session token dynamically
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated DELETE request
  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/users/${userId}`,
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
    console.error(`❌ Failed to delete user ${userId}:`, errText);
    throw new Error(`Failed to delete user with ID ${userId}`);
  }

  const data = (await res.json()) as DeleteUserResponse;
  return data;
}

