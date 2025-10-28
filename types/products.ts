// types/product.ts

// export interface Product {
//   product_id: number;
//   product_name: string;
//   slug: string;
//   description: string;
//   sku: string;
//   price: number;
//   regular_price: number;
//   sale_price: number;
//   on_sale: boolean;
//   stock_status: string;
//   manage_stock: boolean;
//   stock_quantity: number | null;
//   categories: string[];
//   product_url: string;
//   edit_url: string;
//   created_date: string;
// }

// export interface ProductsData {
//   total_count: number;
//   products: Product[];
// }

// export interface ProductsApiResponse {
//   success: boolean;
//   message: string;
//   data: ProductsData;
// }


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

export interface ProductsApiResponse {
  success: boolean;
  message: string;
  data: {
    total_count: number;
    products: Product[];
  };
}
