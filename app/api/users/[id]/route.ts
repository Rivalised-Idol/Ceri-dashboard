import { NextResponse } from "next/server";
import { updateMembershipStatus } from "@/lib/users/updateMembershipStatus";
import { deleteUser } from "@/lib/users/deleteUser";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { membership_status } = body;

    if (!id || !membership_status) {
      return NextResponse.json(
        { success: false, message: "Missing user ID or membership_status." },
        { status: 400 }
      );
    }

    const result = await updateMembershipStatus(Number(id), membership_status);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Update membership status error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unknown error while updating membership status.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  _context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await _context.params;
    const result = await deleteUser(Number(id));
    return NextResponse.json({
      success: true,
      message: "User deleted",
      result,
    });
  } catch (error: unknown) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown error while deleting user.",
      },
      { status: 500 }
    );
  }
}
