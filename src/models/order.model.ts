import { ProductModel } from "./product.model";

export interface OrderModel {
  id?: string;
  _id?: string;
  customer?: {
    name: string;
    phone: string;
  };
  quantities?: any | {};
  products?: ProductModel[];
  total?: number;
  date?: number;
}

export interface IStats {
  delivered: number;
  failed: number;
  pending: number;
  total: number;
}
