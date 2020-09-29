import { OrderModel } from "../../models/order.model";
import { ProductModel } from "../../models/product.model";

interface productReducer {
  products: ProductModel[];
  categories: string[];
  order: ProductModel[];
  loading: boolean;
}

interface orderReducer {
  orders?: OrderModel[];
  summary?: {
    totalOrders?: number;
    successfulDeliveries: number;
    deliveries: any[];
    unsuccessfulDeliveries: number;
    pendingOrders: number;
    totalSales: number;
  };
}

export type { productReducer, orderReducer };
