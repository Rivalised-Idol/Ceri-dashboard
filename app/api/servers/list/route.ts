//app/api/servers/list/route.ts

import { NextResponse } from "next/server";
import { fetchServers } from "@/lib/servers/fetchServers";

export async function GET() {
  try {
    const data = await fetchServers(); // ✅ secure server-side call
    return NextResponse.json({ success: true, servers: data });
  } catch (err: unknown) {
    console.error("Failed to fetch servers:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unknown error while fetching servers.", // have to specify what error later
        servers: [],
      },
      { status: 500 }
    );
  }
}
