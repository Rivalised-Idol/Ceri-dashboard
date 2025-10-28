// lib/users/fetchUsers.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UsersApiResponse } from "@/types/users";

/**
 * Fetch all users from WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function fetchUsers(): Promise<UsersApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in.");
  }

  const response = await fetch(
    "https://cerivpn.com/wp-json/custom/v1/admin/users/list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const message = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch users: ${message}`);
  }

  const data = (await response.json()) as UsersApiResponse;
  return data;
}
