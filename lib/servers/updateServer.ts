// lib/servers/updateServer.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UpdateServerPayload, UpdateServerResponse } from "@/types/servers";

/**
 * Update an existing server in the WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function updateServer(
  serverId: number,
  body: UpdateServerPayload
): Promise<UpdateServerResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${serverId}`,
    {
      method: "PATCH",
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
    throw new Error(`Failed to update server ${serverId}: ${errText}`);
  }

  const data = (await response.json()) as UpdateServerResponse;
  return data;
}
