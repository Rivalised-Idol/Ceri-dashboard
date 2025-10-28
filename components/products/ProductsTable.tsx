'use client';

import { useState, useMemo } from "react";
import Link from "next/link";
import { View, UserPen } from "lucide-react";
import type { Product } from "@/types/products";

function Pill({
  children,
  tone = 'default',
}: {
  children: React.ReactNode;
  tone?: 'default' | 'green' | 'red' | 'blue' | 'yellow';
}) {
  const map: Record<string, string> = {
    default: 'bg-slate-700/60 border-slate-600 text-white',
    green: 'bg-emerald-900/60 border-emerald-700 text-emerald-50',
    red: 'bg-rose-900/60 border-rose-700 text-rose-50',
    blue: 'bg-blue-900/60 border-blue-700 text-blue-50',
    yellow: 'bg-yellow-900/60 border-yellow-700 text-yellow-50',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}>
      {children}
    </span>
  );
}

export default function ProductsTable({ initialProducts }: { initialProducts: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        product.product_name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.product_id.toString().includes(query);
      const matchesStock = stockFilter
        ? product.stock_status === stockFilter
        : true;
      return matchesSearch && matchesStock;
    });
  }, [initialProducts, searchQuery, stockFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setStockFilter('');
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by ID, name, or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
        >
          <option value="">All Stock Status</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
        </select>
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500 transition-colors duration-300">
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-slate-900/70 text-slate-400">
                {["Product ID", "Name", "Price (USD)", "Created Date", "Action"].map((h) => (
                  <th
                    key={h}
                    className="text-left font-medium px-4 py-3 border-b border-slate-800 sticky top-0 bg-slate-900/70 backdrop-blur-sm"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center px-4 py-8 text-slate-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, i) => (
                  <tr key={product.product_id} className={i % 2 === 0 ? 'bg-slate-950' : 'bg-slate-950/60'}>
                    <td className="px-4 py-3 border-b border-slate-800">{product.product_id}</td>
                    <td className="px-4 py-3 border-b border-slate-800 text-white">{product.product_name}</td>
                    <td className="px-4 py-3 border-b border-slate-800">
                      <Pill tone="green">{product.price.toFixed(2)}</Pill>
                    </td>
                    <td className="px-4 py-3 border-b border-slate-800">
                      {new Date(product.created_date).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 border-b border-slate-800">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${product.product_id}/view`}
                          className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
                          title="View Product"
                        >
                          <View size={18} strokeWidth={2} />
                        </Link>
                        <Link
                          href={`/products/${product.product_id}/manage`}
                          className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
                          title="Manage Product"
                        >
                          <UserPen size={18} strokeWidth={2} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
