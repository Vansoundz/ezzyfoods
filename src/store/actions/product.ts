import {
  ADD_TO_CART,
  REMOVE_ORDER,
  CLEAR_ORDER,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  LOAD,
} from "./types";
import firebase from "../../firebase/init";
import { ProductModel } from "../../models/product.model";
import { Dispatch } from "redux";

export const load = () => {
  return {
    type: LOAD,
  };
};

export const addToCart = (product: ProductModel) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};

export const loadProducts = () => async (dispatch: Dispatch) => {
  try {
    const { firestore } = firebase;
    firestore()
      .collection("products")
      .onSnapshot((snap) => {
        const products: ProductModel[] = [];
        snap.forEach((change) => {
          const product: ProductModel = change.data();
          product.id = change.id;
          products.push(product);
        });

        dispatch({
          type: LOAD_PRODUCTS,
          payload: products,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const loadCategories = () => async (dispatch: Dispatch) => {
  try {
    const { firestore } = firebase;
    await firestore()
      .collection("categories")
      .onSnapshot((snap) => {
        const categories: string[] = [];
        snap.forEach((change) => {
          const cat = change.data().name;
          // cat.id = change.id
          categories.push(cat);
        });

        dispatch({
          type: LOAD_CATEGORIES,
          payload: categories,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const removeOrder = (order: any) => {
  return {
    type: REMOVE_ORDER,
    payload: order,
  };
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export const createCategory = async (c: string) => {
  const { firestore } = firebase;
  try {
    await firestore().collection("categories").add({
      name: c.toLowerCase(),
    });
    return true;
  } catch (error) {
    return false;
  }

  // return {
  //   type: CREATE_CATEGORY,
  //   payload: c
  // }
};

export const createProduct = async (product: ProductModel) => {
  const { firestore } = firebase;
  const { name, price, store, category } = product;
  const prod = { name, price, store, category };

  // if (product.file) {
  //   await storage().ref(`images/${product.img}`).put(product.file);
  // }

  await firestore().collection("products").add(prod);
};

export const editProduct = async (product: ProductModel) => {
  const { firestore } = firebase;
  const { name, price, store, category, file, id } = product;
  const prod = file
    ? { name, price, store, category }
    : { name, price, store, category };

  try {
    if (!file) {
      await firestore().collection("products").doc(id).update(prod);
    } else {
      // await storage().ref(`images/${img}`).put(file);
      await firestore().collection("products").doc(id).update(prod);
    }
  } catch (error) {
    console.log(error);
  }

  // return {
  //   type: EDIT_PRODUCT,
  //   payload: product
  // }
};

export const deleteProduct = async (id: string) => {
  const { firestore } = firebase;

  await firestore().collection("products").doc(id).delete();
};
