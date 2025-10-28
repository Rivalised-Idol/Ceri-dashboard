// // lib/users/fetchUserMetadata.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { UserMetadataResponse } from "@/types/users";

// /**
//  * Fetch detailed user metadata by ID from WordPress Admin API.
//  * Runs only on the server.
//  */
// export async function fetchUserMetadata(id: string | number): Promise<UserMetadataResponse> {
//   const session = await getServerSession(authOptions);
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error("No active session found. Please log in again.");
//   }

//   const res = await fetch(
//     `https://cerivpn.com/wp-json/custom/v1/admin/users/${id}?ID=${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     const errText = await res.text().catch(() => "Unknown error");
//     throw new Error(`Failed to fetch user metadata for ID ${id}: ${errText}`);
//   }

//   const data = (await res.json()) as UserMetadataResponse;
//   return data;
// }

// lib/users/fetchUserMetadata.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { UserMetadata } from "@/types/users";

export async function fetchUserMetadata(id: string | number): Promise<UserMetadata> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No active session found.");

  const res = await fetch(
    `https://cerivpn.com/wp-json/custom/v1/admin/users/${id}?ID=${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error(`Failed to fetch user metadata for ID ${id}`);

  const data = await res.json();

  //   // 🔍 DEBUG: Log the raw response
  // console.log("=== RAW API RESPONSE ===");
  // console.log(JSON.stringify(data, null, 2));
  // console.log("========================");

  return data.user; // ✅ only return the user object
}
