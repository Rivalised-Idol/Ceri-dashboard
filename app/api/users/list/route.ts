import { NextResponse } from "next/server";
import { paginatedUsersList } from "@/lib/users/paginatedUsersList";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const per_page = Number(searchParams.get("per_page")) || 5;

    const data = await paginatedUsersList(page, per_page);
    return NextResponse.json(data);
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error("❌ Error fetching paginated users:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
