import React, { FormEvent, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";
import { useMutation } from "react-query";
import { login } from "../../data/auth.data";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";
import { LOGIN } from "../../store/actions/types";

const Login = () => {
  const { isAuthenticated } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const dispatch = useDispatch();
  const [loginUser, { data, isLoading }] = useMutation(login);

  useEffect(() => {
    if (data?.errors) {
      data.errors.forEach(({ msg }: { msg: string }) =>
        toast(msg, { type: "error" })
      );
    }

    if (data?.user) {
      localStorage.setItem("_eat", data.token);
      dispatch({
        type: LOGIN,
        payload: data.user,
      });
    }
  }, [data, dispatch]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value.trim(),
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    loginUser({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="authenticate">
      {isLoading && <Loading />}
      <div className="decor">
        <div>
          <h4>Welcome to Ezzyfoods</h4>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            mollitia nemo,
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="auth">
        <h4>Login</h4>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required onChange={onChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required onChange={onChange} />
        </div>
        <div className="input-field">
          <input
            id="submit"
            type="submit"
            value="Login"
            className="btn orange"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
