// app/products/page.tsx
import { fetchProducts } from "@/lib/products/fetchProducts";
import ProductsTable from "@/components/products/ProductsTable";

export default async function ProductsPage() {
  const products = await fetchProducts(); // ✅ Secure server-side call

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Products</h1>
      <ProductsTable initialProducts={products} />
    </div>
  );
}
