// app/api/products/list/route.ts

import { NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products/fetchProducts";

export async function GET() {
  try {
    // ✅ Server-side call (fetchProducts internally handles session & token)
    const data = await fetchProducts();

    return NextResponse.json({ success: true, products: data });
  } catch (err: unknown) {
    console.error("❌ Failed to fetch products:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unknown error while fetching products.",
        products: [],
      },
      { status: 500 }
    );
  }
}
