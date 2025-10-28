// lib/orders/createOrder.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { CreateOrderBody, CreatedOrderResponse } from "@/types/orders";

/**
 * Create a new order through the WordPress Admin API.
 * Runs only on the server (secure, token never exposed).
 */
export async function createOrder(
  body: CreateOrderBody
): Promise<CreatedOrderResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    "https://cerivpn.com/wp-json/cerivpn/v1/admin/orders/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to create new order: ${errText}`);
  }

  const data = (await response.json()) as CreatedOrderResponse;
  return data;
}
