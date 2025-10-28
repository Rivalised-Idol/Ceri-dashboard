"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { View, UserPen } from "lucide-react";
import Pill from "@/components/common/Pill";
import AddOrderModal from "@/components/orders/AddOrderModal";

import type { Order } from "@/types/orders";
import type { Product } from "@/types/products";

interface OrdersTableProps {
  initialOrders: Order[];
  availableProducts: Product[];
}

export default function OrdersTable({
  initialOrders,
  availableProducts,
}: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🧩 Add new order callback (called by AddOrderModal)
  function handleOrderCreated(newOrder: Order) {
    setOrders((prev) => [newOrder, ...prev]);
  }

  const filteredOrders = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toString().includes(q) ||
        o.billing.first_name.toLowerCase().includes(q) ||
        o.billing.last_name.toLowerCase().includes(q) ||
        o.billing.email.toLowerCase().includes(q);

      const matchesStatus = statusFilter
        ? o.status.toLowerCase() === statusFilter
        : true;

      const matchesPlan = planFilter
        ? o.detected_plan?.toLowerCase() === planFilter
        : true;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [orders, searchQuery, statusFilter, planFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setPlanFilter("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Orders</h1>

      {/* 🔎 Filters + Add Order Button */}
      <div className="mb-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-sm font-semibold shadow-md transition-all duration-200"
          >
            + Add New Order
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by ID, name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-800 text-white rounded-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
          >
            <option value="">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="on-hold">On Hold</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-md text-sm"
          >
            <option value="">All Plans</option>
            <option value="1_week">1 Week</option>
            <option value="1_month">1 Month</option>
            <option value="3_months">3 Months</option>
            <option value="6_months">6 Months</option>
            <option value="1_year">1 Year</option>
            <option value="2_years">2 Years</option>
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* 🧾 Orders Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500 transition-colors duration-300">
          <table className="w-full border-collapse text-sm min-w-[900px]">
            <thead>
              <tr className="bg-slate-900/70 text-slate-400">
                {[
                  "ID",
                  "Customer",
                  "Date",
                  "Status",
                  "Total",
                  "Plan",
                  "Action",
                ].map((h) => (
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center px-4 py-8 text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order, i) => {
                  const statusTone =
                    order.status === "completed"
                      ? "green"
                      : order.status === "failed"
                      ? "red"
                      : order.status === "pending"
                      ? "yellow"
                      : "default";

                  return (
                    <tr
                      key={order.id}
                      className={
                        i % 2 === 0 ? "bg-slate-950" : "bg-slate-950/60"
                      }
                    >
                      <td className="px-4 py-3 border-b border-slate-800">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {order.billing.first_name} {order.billing.last_name}
                        <br />
                        <span className="text-slate-400 text-xs">
                          {order.billing.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        {new Date(order.date_created).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone={statusTone}>
                          {order.status.toUpperCase()}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone="emerald">
                          {order.total} {order.currency}
                        </Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <Pill tone="blue">{order.detected_plan || "-"}</Pill>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-800">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/orders/${order.id}/view`}
                            className="text-blue-400 hover:text-blue-300 transition-transform hover:scale-110"
                            title="View Order"
                          >
                            <View size={18} strokeWidth={2} />
                          </Link>
                          <Link
                            href={`/orders/${order.id}/manage`}
                            className="text-yellow-400 hover:text-yellow-300 transition-transform hover:scale-110"
                            title="Manage Order"
                          >
                            <UserPen size={18} strokeWidth={2} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🟦 Add Order Modal */}
      <AddOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderCreated={handleOrderCreated}
        availableProducts={availableProducts}
      />
    </div>
  );
}
