import React, { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductModel } from "../../models/product.model";
import { OrderModel } from "../../models/order.model";
import { useMutation } from "react-query";
import { placeOrder } from "../../data/order.data";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";
import { CLEAR_ORDER } from "../../store/actions/types";

interface IProps {
  order: ProductModel[];
  total: number;
}

const CompleteOrder: FC<IProps> = ({ order, total }) => {
  const [submitted, submit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const dispatch = useDispatch();
  const [makeOrder, { data, isLoading }] = useMutation(placeOrder);

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

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, phone } = formData;

    if (!name.trim()) {
      toast("Name is required", { type: "error" });
    } else if (phone.length < 10) {
      toast("Phone is required", { type: "error" });
    } else {
      const newOrder: OrderModel = {
        customer: formData,
        products: order,
        total,
      };

      await makeOrder({ order: newOrder });
    }
  };

  return (
    <div className="corder">
      {isLoading && <Loading />}
      {submitted ? (
        <div>
          <h4>Thank you, Your order was placed successfully</h4>
          <i className="material-icons md-48 green-text">done_outline</i>
        </div>
      ) : (
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
