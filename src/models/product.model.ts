export interface ProductModel {
  id?: string;
  _id?: string;
  name?: string;
  price?: string;
  store?: number | string;
  q?: number;
  category?: string | { name: string; _id: string };
  image?: string;
  images?: string[];
  file?: File;
  quantity?: number;
}
