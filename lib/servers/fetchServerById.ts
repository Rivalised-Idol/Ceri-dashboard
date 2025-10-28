// // lib/servers/fetchServerById.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { ServerByIdResponse } from "@/types/servers";

// /**
//  * Fetch a single server by ID from the WordPress Admin API.
//  * Runs only on the server (secure: token never exposed to client)
//  */
// export async function fetchServerById(
//   id: string | number
// ): Promise<ServerByIdResponse> {
//   const session = await getServerSession(authOptions);
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error("No active session found. Please log in again.");
//   }

//   const response = await fetch(
//     `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     const errText = await response.text().catch(() => "Unknown error");
//     throw new Error(`Failed to fetch server with ID ${id}: ${errText}`);
//   }

//   const data = (await response.json()) as ServerByIdResponse;
//   return data;
// }


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Server } from "@/types/servers";
import type { ServerByIdResponse } from "@/types/servers";

export async function fetchServerById(id: string | number): Promise<Server> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No active session found. Please log in again.");

  const res = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/servers/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch server ${id}: ${errText}`);
  }

  const json = (await res.json()) as ServerByIdResponse;

  // ✅ Return only the actual server data
  return json.data;
}
