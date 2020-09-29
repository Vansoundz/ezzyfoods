import React, { useEffect } from "react";
import PCard from "./PCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";

const PList = () => {
  const { products } = useSelector((state: RootReducer) => ({
    products: state.product.products,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <div className="plist">
      {products.length > 0 ? (
        products &&
        products.map((product) => {
          return <PCard product={product} key={product.id} />;
        })
      ) : (
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
      )}
    </div>
  );
};

export default PList;
