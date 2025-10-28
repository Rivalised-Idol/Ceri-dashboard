// lib/servers/deleteServer.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { DeleteServerResponse } from "@/types/servers";

/**
 * Delete a server from the WordPress Admin API by ID.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function deleteServer(
  serverId: number
): Promise<DeleteServerResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${serverId}`,
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
    throw new Error(`Failed to delete server ${serverId}: ${errText}`);
  }

  const data = (await response.json()) as DeleteServerResponse;
  return data;
}
