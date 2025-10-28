// lib/servers/createServer.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { CreateServerPayload, CreateServerResponse } from "@/types/servers";

/**
 * Create a new server in the WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function createServer(
  body: CreateServerPayload
): Promise<CreateServerResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    "https://cerivpn.com/wp-json/cerivpn/v1/admin/servers",
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
    throw new Error(`Failed to create server: ${errText}`);
  }

  const data = (await response.json()) as CreateServerResponse;
  return data;
}
