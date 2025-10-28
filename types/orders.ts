// ───────────────────────────────────────────────
// Core Order interfaces
// ───────────────────────────────────────────────

export interface OrderItem {
  name: string;
  quantity: number;
  total: string;
  sku: string;
  plan: string;
}

export interface OrderBilling {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Order {
  id: number;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  date_modified: string;
  customer_id: number;
  billing: OrderBilling;
  payment_method: string;
  payment_method_title: string;
  items: OrderItem[];
  detected_plan: string;
}

export interface OrdersApiResponse {
  success: boolean;
  count: number;
  orders: Order[];
}

// ───────────────────────────────────────────────
// Create order
// ───────────────────────────────────────────────

export interface CreateOrderBody {
  user_id: number;
  product_id: number;
  quantity: number;
  order_status: string;
  payment_method: string;
  order_total: number;
}

export interface CreatedOrderProduct {
  product_id: number;
  product_name: string;
  product_price: string;
  quantity: number;
}

export interface CreatedOrderData {
  order_id: number;
  order_status: string;
  user_id: number;
  user_email: string;
  product: CreatedOrderProduct;
  order_total: number;
  currency: string;
  payment_method: string;
  created_by: string;
  created_at: string;
  view_order_url: string;
}

export interface CreatedOrderResponse {
  success: boolean;
  message: string;
  data?: CreatedOrderData;
}

// ───────────────────────────────────────────────
// Update order status
// ───────────────────────────────────────────────

export interface UpdateOrderStatusResponse {
  success: boolean;
  message: string;
  data?: {
    order_id: string;
    order_status: string;
  };
}
