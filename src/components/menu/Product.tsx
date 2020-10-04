import React, { useEffect, useState } from "react";
import PCard from "../product/PCard";
import { useParams } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { ProductModel } from "../../models/product.model";
import { useQuery } from "react-query";
import { getCategories, getProductsByCategory } from "../../data/product.data";
import Loading from "../layout/Loading";

const currentRoute = (
  r: string,
  categories: { name: string; _id: string }[]
) => {
  let current = categories.find(({ name }) => name.match(new RegExp(r, "ig")));
  if (!current) return "";
  return current._id;
};

const Product = () => {
  // const l = useLocation();
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [categoryId, setCategoryId] = useState<string | boolean>("");
  const [categories, setCategories] = useState<{ name: string; _id: string }[]>(
    []
  );
  const { data: cats } = useQuery("get categories", getCategories);

  useEffect(() => {
    if (cats?.categories) {
      setCategories(cats.categories);
    }
  }, [cats]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId(currentRoute(category, categories));
    }
  }, [category, categories]);

  const { data, isLoading } = useQuery(
    ["get products by category", categoryId],
    getProductsByCategory,
    { enabled: categoryId }
  );

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  // const { loading, products, stateEmpty } = useSelector(
  //   (state: RootReducer) => ({
  //     products: state.product.products.filter(
  //       (p) => l.pathname.slice(1) === p.category
  //     ),
  //     loading: state.product.loading,
  //     stateEmpty: state.product.products.length === 0,
  //   })
  // );

  // useEffect(() => {
  //   if (stateEmpty) {
  //     load();
  //     loadProducts();
  //   }
  // }, [stateEmpty]);

  return (
    <AppLayout>
      {isLoading && <Loading />}
      <div className="plist">
        {products.length ? (
          products.map((product) => {
            return <PCard product={product} key={product._id} />;
          })
        ) : (
          <div className="center">
            <p className="center">We are working on this product category</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Product;
