import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductModel } from "../../models/product.model";
import { OrderModel } from "../../models/order.model";
import { useMutation } from "react-query";
import { placeOrder } from "../../data/order.data";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";
import { CLEAR_ORDER } from "../../store/actions/types";
import { Link } from "react-router-dom";

interface IProps {
  order: ProductModel[];
  total: number;
}

const CompleteOrder: FC<IProps> = ({ order, total }) => {
  const [submitted, submit] = useState(false);
  const [formData, setFormData] = useState<{
    name: "";
    phone: "";
    location?: "gate a" | "gate b" | "gate c" | "gachororo" | "oasis" | "jkuat";
  }>({
    name: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [makeOrder, { data, isLoading, error }] = useMutation(placeOrder);

  useEffect(() => {
    if (data?.errors) {
      data.errors.forEach(({ msg }: { msg: string }) =>
        toast(msg, { type: "error" })
      );
    }

    if (data?.order) {
      toast("Order placed successfully", { type: "success" });
      submit(true);
      setFormData({
        name: "",
        phone: "",
      });
      dispatch({
        type: CLEAR_ORDER,
      });
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      toast(`Error: ${error}`, { type: `warning` });
    }
  }, [error]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, phone, location } = formData;

    if (!name.trim()) {
      toast("Name is required", { type: "error" });
    } else if (phone.length < 10) {
      toast("Phone is required", { type: "error" });
    } else if (!location?.trim()) {
      toast("Location is required", { type: "error" });
    } else {
      const newOrder: OrderModel = {
        customer: formData,
        products: order,
        total,
      };

      await makeOrder({ order: newOrder });
    }
  };

  const locations = [
    "gate a",
    "gate b",
    "gate c",
    "gachororo",
    "oasis",
    "jkuat",
  ];

  return (
    <div className="corder">
      {isLoading && <Loading />}
      {order.length === 0 && (
        <>
          {!submitted ? (
            <div className="center">
              <h4>You have no order, make one ; {")"}</h4>
              <Link className="btn orange" to="/shop">
                Explore
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div>
                <i
                  style={{ fontSize: 48, color: "#4CAF50" }}
                  className="material-icons md-48 green-text"
                >
                  check_circle
                </i>
              </div>
              <h4>Thank you, Your order was placed successfully</h4>
              <Link className="continue btn" to="/shop">
                <span>Continue Shopping</span>
                <i className="material-icons">arrow_forward</i>
              </Link>
            </div>
          )}
        </>
      )}

      {order.length > 0 && (
        <div>
          <h5>Help us get to you</h5>
          <form id="mform" className="mform" onSubmit={onSubmit}>
            <div className="input-field">
              <label htmlFor="name"> Name or name</label>
              <input type="text" required onChange={onChange} id="name" />
            </div>
            <div className="input-field">
              <label htmlFor="phone"> Enter Phone number</label>
              <input type="tel" required onChange={onChange} id="phone" />
            </div>
            <div className="input-field">
              <label htmlFor="phone"> Select you location</label>
              <select
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    // @ts-ignore
                    location: e.currentTarget.value,
                  });
                }}
              >
                {locations.map((location, i) => (
                  <option
                    key={i}
                    style={{ textTransform: "capitalize" }}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <input
                type="submit"
                className="btn orange darken-2"
                value="Submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompleteOrder;
