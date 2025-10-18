// app/api/fetchProducts.ts
'use client';

import { getSession } from 'next-auth/react';

export interface Product {
  product_id: number;
  product_name: string;
  slug: string;
  description: string;
  sku: string;
  price: number;
  regular_price: number;
  sale_price: number;
  on_sale: boolean;
  stock_status: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  categories: string[];
  product_url: string;
  edit_url: string;
  created_date: string;
}

export async function fetchProducts(): Promise<Product[]> {
  // 🟢 Get the active session
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated API request
  const res = await fetch(
    'https://cerivpn.com/wp-json/cerivpn/v1/admin/products',
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error('❌ Failed to fetch products:', errText);
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.data?.products || [];
}

