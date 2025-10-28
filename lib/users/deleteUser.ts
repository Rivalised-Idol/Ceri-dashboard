// lib/users/deleteUser.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { DeleteUserResponse } from "@/types/users";

/**
 * Delete a user from the WordPress Admin API by ID.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function deleteUser(userId: number): Promise<DeleteUserResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to delete user ${userId}: ${errText}`);
  }

  const data = (await response.json()) as DeleteUserResponse;
  return data;
}
