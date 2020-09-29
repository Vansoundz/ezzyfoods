import React, { FormEvent, Fragment, useState } from "react";
import { Redirect } from "react-router-dom";

import { login, setLoading } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";

const Login = () => {
  const { isAuthenticated, loading } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
  }));
  const dispatch = useDispatch();

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
    setLoading(true);
    await dispatch(login(email, password));
    setLoading(false);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      {loading ? (
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
      ) : (
        <form onSubmit={onSubmit}>
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
      )}
    </Fragment>
  );
};

export default Login;
