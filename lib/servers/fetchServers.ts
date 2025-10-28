// // lib/servers/fetchServers.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { ServersApiResponse } from "@/types/servers";

// /**
//  * Fetch all servers from the WordPress Admin API.
//  * Runs only on the server (secure: token never exposed to client)
//  */
// export async function fetchServers(): Promise<ServersApiResponse> {
//   const session = await getServerSession(authOptions);
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error("No active session found. Please log in again.");
//   }

//   const response = await fetch(
//     "https://cerivpn.com/wp-json/cerivpn/v1/admin/servers",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     const errText = await response.text().catch(() => "Unknown error");
//     throw new Error(`Failed to fetch servers: ${errText}`);
//   }

//   const data = (await response.json()) as ServersApiResponse;
//   return data;
// }


// lib/servers/fetchServers.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { Server } from "@/types/servers";
import type { ServersApiResponse } from "@/types/servers";

export async function fetchServers(): Promise<Server[]> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No active session found. Please log in again.");

  const response = await fetch(
    "https://cerivpn.com/wp-json/cerivpn/v1/admin/servers",
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch servers: ${errText}`);
  }

  const data = (await response.json()) as ServersApiResponse;
  // ✅ Return only the array part
  return data.data?.servers || [];
}
