import { ProductModel } from "./product.model";

export interface OrderModel {
  id?: string;
  customer?: {
    nickname: string;
    phone: string;
  };
  products?: ProductModel[];
  total?: number;
  time?: number;
}
