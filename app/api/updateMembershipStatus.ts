// /app/api/updateMembershipStatus.ts

'use client';

import { getSession } from 'next-auth/react';

export interface MembershipStatusResponse {
  success: boolean;
  message: string;
  data?: {
    user_id: string;
    user_email: string;
    user_login: string;
    old_membership_status: string;
    new_membership_status: string;
    active_membership_plan: string;
    membership_expiry_date: string;
    updated_by: string;
    updated_at: string;
  };
}

export async function updateMembershipStatus(
  userId: number | string,
  newStatus: 'active' | 'inactive'
): Promise<MembershipStatusResponse> {
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/membership-status/user/${userId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        membership_status: newStatus,
      }),
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to update membership status for user ${userId}`);
  }

  return res.json();
}

