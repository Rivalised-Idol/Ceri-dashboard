// /app/api/updateOrderStatus.ts

'use client';

import { getSession } from 'next-auth/react';

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  data?: {
    order_id: string;
    order_status: string;
  };
}

export async function updateOrderStatus(
  orderId: number,
  order_status: string
): Promise<UpdateOrderStatusResponse> {
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/orders/${orderId}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order_status }),
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to update order status for order ${orderId}`);
  }

  return res.json();
}
