import productApi from "../api/product.api";
import { ProductModel } from "../models/product.model";

const getProducts = async () => {
  try {
    const data = (await productApi.getProducts()).data;
    return data;
  } catch (error) {
    if (error.response) return error.response.data;
    return "Error";
  }
};

const getProductsByCategory = async (key: string, category: string) => {
  try {
    const data = (await productApi.getProductsByCat(category)).data;
    return data;
  } catch (error) {
    if (error.response) return error.response.data;
    return "Error";
  }
};

const getProduct = async (key: string, id: string) => {
  const data = (await productApi.getProduct(id)).data;
  return data;
};

const createProduct = async ({ product }: { product: ProductModel }) => {
  try {
    let resp = (await productApi.createProduct(product)).data;
    return resp;
  } catch (error) {
    if (error.response) return error.response.data;
    return "Error";
  }
};

const getCategories = async () => {
  const data = (await productApi.getCategories()).data;
  return data;
};

const createCategory = async ({ name }: { name: string }) => {
  try {
    let resp = (await productApi.createCategory(name)).data;
    return resp;
  } catch (error) {
    if (error.response) return error.response.data;
    return "Error";
  }
};

const updateCategory = async ({ name, id }: { name: string; id: string }) => {
  let resp = (await productApi.updateCategory({ name, id })).data;
  return resp;
};

const deleteCategory = async ({ id }: { id: string }) => {
  let resp = (await productApi.deleteCategory(id)).data;
  return resp;
};

const updateProduct = async ({ product }: { product: ProductModel }) => {
  try {
    let resp = (await productApi.updateProduct(product)).data;
    return resp;
  } catch (error) {
    if (error.response) return error.response.data;
    return "Error";
  }
};

const deleteProduct = async ({ id }: { id: string }) => {
  let resp = (await productApi.deleteProduct(id)).data;
  return resp;
};

export {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
};
