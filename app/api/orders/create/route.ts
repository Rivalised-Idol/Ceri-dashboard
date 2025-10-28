// // app/api/orders/create/route.ts
// import { NextResponse } from "next/server";
// import { createOrder } from "@/lib/orders/createOrder";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // 🔒 Secure call to the lib server-side function
//     const result = await createOrder(body);

//     return NextResponse.json(result);
//   } catch (error: any) {
//     console.error("❌ Error creating order:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/orders/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders/createOrder";
import type { CreateOrderBody, CreatedOrderResponse } from "@/types/orders";

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderBody = await request.json();
    const result: CreatedOrderResponse = await createOrder(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create new order";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
