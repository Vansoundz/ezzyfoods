import React, { useEffect } from "react";
import PCard from "../product/PCard";
import { useSelector } from "react-redux";
import { loadProducts, load } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";
import { useLocation } from "react-router-dom";

const Product = () => {
  const l = useLocation();
  const { loading, products, stateEmpty } = useSelector(
    (state: RootReducer) => ({
      products: state.product.products.filter(
        (p) => l.pathname.slice(1) === p.category
      ),
      loading: state.product.loading,
      stateEmpty: state.product.products.length === 0,
    })
  );

  useEffect(() => {
    if (stateEmpty) {
      load();
      loadProducts();
    }
  }, [stateEmpty]);

  const list = loading ? (
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  ) : products.length ? (
    products.map((product) => {
      return <PCard product={product} key={product.id} />;
    })
  ) : (
    <div className="center">
      <p className="center">We are working on this product category</p>
    </div>
  );

  return <div className="plist">{list}</div>;
};

export default Product;
