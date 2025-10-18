// api/fetchUsers.ts
'use client';

import { getSession } from 'next-auth/react';

export async function fetchUsers() {

  // to get active session
  const session = await getSession();
  const token = session?.accessToken; // Comes from NextAuth JWT callback in route.ts

  if (!token) {
    throw new Error('No Active Session found. Please log in.');
  }

  const res = await fetch("https://cerivpn.com/wp-json/custom/v1/admin/users/list", {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
    cache: "no-store", // Disable caching if needed
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data.users;
}



