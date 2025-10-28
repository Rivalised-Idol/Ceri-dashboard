// // lib/products/fetchProducts.ts
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import type { ProductsApiResponse } from "@/types/products";

// /**
//  * Fetch all products from the WordPress Admin API.
//  * Runs only on the server (secure: token never exposed to client)
//  */
// export async function fetchProducts(): Promise<ProductsApiResponse> {
//   const session = await getServerSession(authOptions);
//   const token = session?.accessToken;

//   if (!token) {
//     throw new Error("No active session found. Please log in again.");
//   }

//   const response = await fetch(
//     "https://cerivpn.com/wp-json/cerivpn/v1/admin/products",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     const errText = await response.text().catch(() => "Unknown error");
//     throw new Error(`Failed to fetch products: ${errText}`);
//   }

//   const data = (await response.json()) as ProductsApiResponse;
//   return data;
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { ProductsApiResponse, Product } from "@/types/products";

/**
 * Fetch all products from the WordPress Admin API.
 * Runs only on the server (secure: token never exposed to client)
 */
export async function fetchProducts(): Promise<Product[]> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  if (!token) {
    throw new Error("No active session found. Please log in again.");
  }

  const response = await fetch(
    "https://cerivpn.com/wp-json/cerivpn/v1/admin/products",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errText = await response.text().catch(() => "Unknown error");
    throw new Error(`Failed to fetch products: ${errText}`);
  }

  const json = (await response.json()) as ProductsApiResponse;

  // ✅ Return only the actual array of products
  return json.data.products;
}
