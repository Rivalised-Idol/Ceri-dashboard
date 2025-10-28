// app/api/orders/[id]/status/route.ts
import { NextResponse, NextRequest } from "next/server";
import { updateOrderStatus } from "@/lib/orders/updateOrderStatus";
import type { UpdateOrderStatusResponse } from "@/types/orders";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const orderId = Number(id);

    if (Number.isNaN(orderId)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    const { order_status } = (await request.json()) as { order_status: string };

    const result: UpdateOrderStatusResponse = await updateOrderStatus(
      orderId,
      order_status
    );

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to update order status";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
