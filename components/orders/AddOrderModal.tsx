"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "@/types/products";
import type { CreatedOrderResponse, Order } from "@/types/orders";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (newOrder: Order) => void;
  availableProducts: Product[];
}

export default function AddOrderModal({
  isOpen,
  onClose,
  onOrderCreated,
  availableProducts,
}: AddOrderModalProps) {
  const [newOrder, setNewOrder] = useState({
    user_id: "",
    product_id: 0,
    quantity: 1,
    order_status: "on-hold",
    payment_method: "manual",
    order_total: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  if (!isOpen) return null;

  const handleProductChange = (productId: string) => {
    const product = availableProducts.find(
      (p) => p.product_id === Number(productId)
    );
    if (product) {
      setNewOrder({
        ...newOrder,
        product_id: product.product_id,
        order_total: product.price,
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setApiMessage("");

    try {
      const body = {
        user_id: Number(newOrder.user_id),
        product_id: Number(newOrder.product_id),
        quantity: Number(newOrder.quantity),
        order_status: newOrder.order_status,
        payment_method: newOrder.payment_method,
        order_total: Number(newOrder.order_total),
      };

      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: CreatedOrderResponse = await response.json();

      if (data.success && data.data) {
        const created = data.data;
        const newOrderObj: Order = {
          id: created.order_id,
          status: created.order_status,
          total: created.order_total.toString(),
          currency: created.currency,
          date_created: created.created_at,
          date_modified: created.created_at,
          customer_id: created.user_id,
          billing: {
            first_name: "",
            last_name: "",
            email: created.user_email,
          },
          payment_method: created.payment_method,
          payment_method_title: "",
          items: [],
          detected_plan: created.product?.product_name ?? "-",
        };
        onOrderCreated(newOrderObj);
        setApiMessage("✅ Order created successfully!");
        onClose();
      } else {
        setApiMessage(`❌ Failed to create order: ${data.message || ""}`);
      }
    } catch (err) {
      console.error(err);
      setApiMessage("⚠️ Error creating order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-white">Add New Order</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            placeholder="User ID"
            value={newOrder.user_id}
            onChange={(e) =>
              setNewOrder({ ...newOrder, user_id: e.target.value })
            }
            required
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          />
          <select
            value={newOrder.product_id || ""}
            onChange={(e) => handleProductChange(e.target.value)}
            required
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          >
            <option value="">Select Product</option>
            {availableProducts.map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.product_name} (${p.price})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            min={1}
            value={newOrder.quantity}
            onChange={(e) =>
              setNewOrder({
                ...newOrder,
                quantity: Number.isNaN(e.currentTarget.valueAsNumber)
                  ? 0
                  : e.currentTarget.valueAsNumber,
              })
            }
            required
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          />
          <select
            value={newOrder.order_status}
            onChange={(e) =>
              setNewOrder({ ...newOrder, order_status: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          >
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={newOrder.payment_method}
            onChange={(e) =>
              setNewOrder({ ...newOrder, payment_method: e.target.value })
            }
            className="w-full px-3 py-2 bg-slate-800 text-white border border-slate-700 rounded-md"
          >
            <option value="manual">Manual</option>
            <option value="bacs">Bank Transfer</option>
            <option value="paypal">PayPal</option>
          </select>
          <input
            type="number"
            placeholder="Order Total"
            value={newOrder.order_total}
            readOnly
            className="w-full px-3 py-2 bg-slate-900 text-gray-400 border border-slate-700 rounded-md"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Order"}
          </button>
        </form>

        {apiMessage && (
          <p className="text-center mt-3 text-slate-300">{apiMessage}</p>
        )}
      </div>
    </div>
  );
}
