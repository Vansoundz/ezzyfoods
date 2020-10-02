import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/actions/product";
import firebase from "../../firebase/init";
import { RootReducer } from "../../store/reducers/root";
import { ProductModel } from "../../models/product.model";
import { toast } from "react-toastify";

interface IProps {
  product: ProductModel;
}

const PCard: FC<IProps> = ({ product }) => {
  const { name, price, id, store, img } = product;
  const dispatch = useDispatch();

  const { added } = useSelector((state: RootReducer) => ({
    added: state.product.order.find((p) => p.id === product.id) ? true : false,
  }));

  const { storage } = firebase;

  useEffect(() => {
    storage()
      .ref(`images/${img}`)
      .getDownloadURL()
      .then((url) => {
        const el = document.getElementById(id!) as HTMLImageElement;
        if (el) el.src = url;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, img, storage]);

  const addProdToCart = (product: ProductModel) => {
    toast(`${product.name} added`, { type: "info" });
    dispatch(addToCart(product));
  };

  let icon = added ? (
    <i className="material-icons">check</i>
  ) : (
    <i className="material-icons">add</i>
  );

  return (
    <div className={`card z-depth-1 ${store === 0 ? "hide" : ""}`}>
      <div className="pcard">
        <div className="">
          <div className="img grey lighten-3">
            <img id={id} alt="" />
          </div>
        </div>
        <div className="pinfo">
          <div className="">
            <h5 style={{ textTransform: "capitalize" }}>{name}</h5>
            <h6>
              <small>Ksh {price}</small>
            </h6>
            <button>View</button>
          </div>
          <div>
            <button
              className="orange btn"
              disabled={store === 0}
              onClick={() => {
                addProdToCart(product);
              }}
            >
              {icon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCard;
