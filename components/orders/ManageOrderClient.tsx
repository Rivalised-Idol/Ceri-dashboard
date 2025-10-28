"use client";

import { useState } from "react";
import type { Order } from "@/types/orders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  initialOrder: Order;
}

export default function ManageOrderClient({ initialOrder }: Props) {
  const [order, setOrder] = useState(initialOrder);
  const [newStatus, setNewStatus] = useState(order.status);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    setMessage("");

    try {
      const res = await fetch(`/api/orders/${order.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setOrder({ ...order, status: newStatus });
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage("❌ Failed to update order status.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error updating order status.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Order #{order.id}</h1>
        <Link
          href="/orders"
          className="flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 space-y-4">
        <p>
          <strong>Customer:</strong> {order.billing?.first_name}{" "}
          {order.billing?.last_name}
        </p>
        <p>
          <strong>Email:</strong> {order.billing?.email}
        </p>
        <p>
          <strong>Current Status:</strong>{" "}
          <span className="text-yellow-300 font-semibold">{order.status}</span>
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Update Order Status
          </label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          >
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white disabled:opacity-50"
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-center text-slate-300">{message}</p>
        )}
      </div>
    </div>
  );
}
