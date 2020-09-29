import React, { FC, FormEvent, useState } from "react";
import { placeOrder } from "../../store/actions/orders";
import { clearOrder } from "../../store/actions/product";
import { useDispatch } from "react-redux";
import { ProductModel } from "../../models/product.model";

interface IProps {
  order: ProductModel[];
  total: number;
}

const CompleteOrder: FC<IProps> = ({ order, total }) => {
  const [submitted, submit] = useState(false);
  const [formData, setFormData] = useState({
    nickname: "",
    phone: "",
  });
  const dispatch = useDispatch();

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { nickname, phone } = formData;

    if (!nickname.trim()) {
      // const err = {
      //   msg: "Enter a valid name or nickname",
      //   type: "red",
      // };
      // setAlert(err);
    } else if (phone.length < 10) {
      // const err = {
      //   msg: "Enter a valid phone number",
      //   type: "red",
      // };
      // setAlert(err);
    } else {
      const newOrder = {
        customer: formData,
        products: order,
        total,
      };

      await placeOrder(newOrder);
      setFormData({
        nickname: "",
        phone: "",
      });
      // document.forms['mform'].reset()
      submit(true);
      setTimeout(() => {
        dispatch(clearOrder());
      }, 1000);
    }
  };

  return (
    <div className="center corder">
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
              <label htmlFor="nickname"> Name or nickname</label>
              <input type="text" required onChange={onChange} id="nickname" />
            </div>
            <div className="input-field">
              <label htmlFor="phone"> Enter Phone number</label>
              <input type="tel" required onChange={onChange} id="phone" />
            </div>
            <div className="input-field center">
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
