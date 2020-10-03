import React, { useEffect, useState } from "react";
import PCard from "./PCard";
// import { useDispatch, useSelector } from "react-redux";
// import { loadProducts } from "../../store/actions/product";
// import { RootReducer } from "../../store/reducers/root";
import { useQuery } from "react-query";
import { getProducts } from "../../data/product.data";
import { ProductModel } from "../../models/product.model";
import Loading from "../layout/Loading";

const PList = () => {
  // const { products } = useSelector((state: RootReducer) => ({
  //   products: state.product.products,
  // }));
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadProducts());
  // }, [dispatch]);
  const [products, setProducts] = useState<ProductModel[]>([]);

  const { data, isLoading } = useQuery("get products", getProducts);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <div className="plist">
      {isLoading && <Loading />}
      {products.length > 0 &&
        products &&
        products.map((product, i) => {
          return <PCard product={product} key={i} />;
        })}
    </div>
  );
};

export default PList;
