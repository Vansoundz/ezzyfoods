import { ProductModel } from "./product.model";

export interface UserModel {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  products?: ProductModel[];
}
