import "./Login.scss";

import React, { Fragment, memo, useEffect } from "react";
import {
  useGetUsersQuery,
  useSignInMutation,
} from "../../../context/api/userApi";

import { setToken } from "../../../context/slices/authSlice";
import { useDispatch } from "react-redux";
import { useGetValue } from "../../../hooks/useGetValue";
import { useNavigate } from "react-router-dom";

let initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const { formData, handleChange } = useGetValue(initialState);
  const [signIn, { isSuccess, data, isError }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    signIn(formData);
    console.log(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      navigate("/admin");
    }
  }, [isSuccess]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <div className="login container">
        <form onSubmit={handleLogin} action="" className="login__form">
          <div className="login__form__input">
            <label htmlFor="">UserName</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className="login__form__input">
            <label htmlFor="">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
          </div>
          <button>LOGIN</button>
        </form>
      </div>
    </Fragment>
  );
};

export default memo(Login);
