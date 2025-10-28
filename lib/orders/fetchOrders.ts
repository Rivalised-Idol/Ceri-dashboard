import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { OrdersApiResponse, Order } from "@/types/orders";

/**
 * Fetch all orders from the WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function fetchOrders(): Promise<Order[]> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    "https://cerivpn.com/wp-json/custom/v1/admin/orders/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch orders: ${errText}`);
  }

  const data = (await response.json()) as OrdersApiResponse;

  // ✅ Return only the actual orders array
  return data.orders;
}
