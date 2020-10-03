import Axios from "axios";
import { ProductModel } from "../models/product.model";
import { setAuthHeader } from "./util";
import { config } from "dotenv";

config();

const api = process.env.REACT_APP_EZZYFOODS_API;

export default {
  getProducts() {
    return Axios.get(`${api}/products`);
  },
  getCategories() {
    return Axios.get(`${api}/products/categories`);
  },
  getProduct(id: string) {
    return Axios.get(`${api}/products/${id}`);
  },
  getProductsByCat(category: string) {
    return Axios.get(`${api}/products/category/${category}`);
  },
  createCategory(name: string) {
    return Axios.post(`${api}/products/categories`, { name }, setAuthHeader());
  },
  updateCategory({ id, name }: { name: string; id: string }) {
    return Axios.patch(
      `${api}/products/categories/${id}`,
      { name },
      setAuthHeader()
    );
  },
  deleteCategory(id: string) {
    return Axios.delete(`${api}/products/categories/${id}`, setAuthHeader());
  },
  createProduct(product: ProductModel) {
    const form = new FormData();
    Object.keys(product).forEach((key) => {
      // @ts-ignore
      if (key !== "file") form.append(key, product[key]);
    });
    if (product.file) {
      form.append("image", product.file);
    }

    return Axios.post(`${api}/products`, form, setAuthHeader(true));
  },
  updateProduct(product: ProductModel) {
    const form = new FormData();
    Object.keys(product).forEach((key) => {
      // @ts-ignore
      if (key !== "file") form.append(key, product[key]);
    });
    if (product.file) {
      form.append("image", product.file);
    }

    return Axios.patch(
      `${api}/products/${product._id}`,
      form,
      setAuthHeader(true)
    );
  },
  deleteProduct(id: string) {
    return Axios.delete(`${api}/products/${id}`, setAuthHeader());
  },
};
