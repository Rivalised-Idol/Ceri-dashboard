import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UsersListApiResponse } from "@/types/users";

/**
 * Fetch a paginated list of users from WordPress Admin API.
 * Runs securely on the server (token never exposed to client).
 */
export async function paginatedUsersList(
  page: number = 1,
  per_page: number = 5
): Promise<UsersListApiResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    `https://cerivpn.com/wp-json/custom/v1/admin/users/list?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch paginated users: ${errText}`);
  }

  const data = (await response.json()) as UsersListApiResponse;
  return data;
}
