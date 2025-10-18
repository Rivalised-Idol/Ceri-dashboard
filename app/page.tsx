'use client';

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '@/app/api/fetchUsers'; // use your existing import,




export default function DashboardPage() {

  
  const [userCount, setUserCount] = useState<number | null>(null);
  const [serverCount, setServerCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const users = await fetchUsers();
        setUserCount(users.length);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUserCount(0);
      }
    }

    fetchUserCount();
  }, []);

  

  const cards = [
    { label: 'Total Users', value: userCount !== null ? userCount.toLocaleString() : 'Loading...' }, // This is the line giving errors upon pagination
    { label: 'Active Memberships', value: '-' },
    { label: 'Servers Online', value: '-' },
    { label: 'Tickets Open', value: '-' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <div className="text-sm text-slate-400">{c.label}</div>
            <div className="mt-2 text-3xl font-bold">{c.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h2 className="text-lg font-semibold mb-2">Quick Overview</h2>
        <p className="text-slate-300">
          Welcome to the CeriVPN Admin. Use the sidebar to navigate. Start with{' '}
          <span className="font-semibold"> Customers </span> to view current accounts.
        </p>
      </section>
    </div>
  );
}
