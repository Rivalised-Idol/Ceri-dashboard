// lib/orders/updateOrderStatus.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UpdateOrderStatusResponse } from "@/types/orders";

/**
 * Update the status of an existing order through the WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function updateOrderStatus(
  orderId: number,
  order_status: string
): Promise<UpdateOrderStatusResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/orders/${orderId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order_status }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to update order status for order ${orderId}: ${errText}`);
  }

  const data = (await response.json()) as UpdateOrderStatusResponse;
  return data;
}
