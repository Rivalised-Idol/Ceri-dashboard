import { fetchProducts } from "@/lib/products/fetchProducts";
import { notFound } from "next/navigation";
import type { Product } from "@/types/products";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: { id: string };
}

export default async function ViewProductPage({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  let products: Product[] = [];
  try {
    products = await fetchProducts();
  } catch (err) {
    console.error(err);
    return notFound();
  }

  const product = products.find((p) => p.product_id === id);
  if (!product) return notFound();

  return (
    <div className="p-6 text-white max-w-3xl mx-auto space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-4 py-2 rounded-md transition-all hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <h1 className="text-2xl font-bold">
        Product Details: {product.product_name}
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <InfoRow label="Product ID" value={product.product_id.toString()} />
        <InfoRow label="Slug" value={product.slug} />
        <InfoRow label="SKU" value={product.sku} />
        <InfoRow label="Price" value={`$${product.price}`} />
        <InfoRow label="Regular Price" value={`$${product.regular_price}`} />
        <InfoRow label="Sale Price" value={`$${product.sale_price}`} />
        <InfoRow label="On Sale" value={product.on_sale ? "Yes" : "No"} />
        <InfoRow label="Stock Status" value={product.stock_status} />
        <InfoRow
          label="Manage Stock"
          value={product.manage_stock ? "Yes" : "No"}
        />
        <InfoRow
          label="Stock Quantity"
          value={product.stock_quantity?.toString() || "-"}
        />
        <InfoRow label="Categories" value={product.categories.join(", ")} />
        <InfoRow
          label="Created Date"
          value={new Date(product.created_date).toLocaleString()}
        />
        <InfoRow label="Product URL" value={product.product_url} />
        <InfoRow label="Edit URL" value={product.edit_url} />
        <InfoRow label="Description" value={product.description || "-"} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-base font-medium text-white break-all">
        {value || "-"}
      </p>
    </div>
  );
}
