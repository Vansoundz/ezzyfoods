import { ProductModel } from "./product.model";

export interface UserModel {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  products?: ProductModel[];
  isAdmin?: boolean;
}
