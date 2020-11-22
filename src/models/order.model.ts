import { ProductModel } from "./product.model";

export interface OrderModel {
  id?: string;
  _id?: string;
  customer?: {
    name: string;
    phone: string;
    location?: "gate a" | "gate b" | "gate c" | "gachororo" | "oasis" | "jkuat";
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
