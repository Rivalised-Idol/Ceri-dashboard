// // lib/users/updateMembershipStatus.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { MembershipStatusResponse } from "@/types/users";

// /**
//  * Update the membership status of a user (active/inactive)
//  * through the WordPress Admin API.
//  * Runs only on the server (secure: token never exposed to client)
//  */
// export async function updateMembershipStatus(
//   userId: number | string,
//   newStatus: "active" | "inactive"
// ): Promise<MembershipStatusResponse> {
//   const session = await getServerSession(authOptions);
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error("No active session found. Please log in again.");
//   }

//   const response = await fetch(
//     `https://cerivpn.com/wp-json/cerivpn/v1/admin/membership-status/user/${userId}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ membership_status: newStatus }),
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     const errText = await response.text().catch(() => "Unknown error");
//     throw new Error(
//       `Failed to update membership status for user ${userId}: ${errText}`
//     );
//   }

//   const data = (await response.json()) as MembershipStatusResponse;
//   return data;
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function updateMembershipStatus(
  userId: number,
  membership_status: string
) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) throw new Error("No active session found. Please log in again.");

  const wpResponse = await fetch(
    `https://cerivpn.com/wp-json/cerivpn/v1/admin/membership-status/user/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ membership_status }),
      cache: "no-store",
    }
  );

  const text = await wpResponse.text();
  console.log("🧩 WP API response:", text);

  if (!wpResponse.ok) {
    throw new Error(`WordPress update failed: ${text}`);
  }

  return JSON.parse(text);
}
