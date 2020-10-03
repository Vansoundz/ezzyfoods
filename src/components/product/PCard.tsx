import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";
import { ProductModel } from "../../models/product.model";
import { toast } from "react-toastify";
import { ADD_TO_CART } from "../../store/actions/types";

interface IProps {
  product: ProductModel;
}

const PCard: FC<IProps> = ({ product }) => {
  // @ts-ignore
  const { name, price, id, store, image } = product;
  const dispatch = useDispatch();

  const { added } = useSelector((state: RootReducer) => ({
    added: state.product.order.find((p) => p._id === product._id)
      ? true
      : false,
  }));

  return (
    <div className={`card z-depth-1 ${store === 0 ? "hide" : ""}`}>
      <div className="pcard">
        <div className="">
          <div className="img grey lighten-3">
            <img id={id} alt="" src={image} />
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
                toast("Added to basket", { type: "info" });
                dispatch({
                  type: ADD_TO_CART,
                  payload: product,
                });
              }}
            >
              <i className="material-icons">{added ? "check" : "add"}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCard;
