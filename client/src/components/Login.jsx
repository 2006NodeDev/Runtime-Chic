import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { loginTypes } from "../action-mappers/login-action-mapper";

import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

toast.configure();

const Login = ({ getUser }) => {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
  });

  const handleOnChange = (e) => {
    e.persist();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    getUser(inputs.userEmail, inputs.userPassword);
    console.log(inputs);
  };

  return (
    <div id="MainDiv">
      <h1>Hogwarts</h1>

      <p>join us at HOGWARTS school for the gifted</p>
      <div id="loginMainDiv">
        <div id="left-login"></div>
        <div id="right-login">
          <h1 id="formHeader">Login</h1>
          <form id="loginForm" onSubmit={onSubmit}>
            <input
              type="text"
              name="userEmail"
              value={inputs.userEmail}
              onChange={handleOnChange}
              className="form-control my-3"
            />
            <input
              type="password"
              name="userPassword"
              value={inputs.userPassword}
              onChange={handleOnChange}
              className="form-control my-3"
            />
            <button class="btn btn-success btn-block">Submit</button>
          </form>
          <Link to="/register">register</Link>
        </div>
      </div>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     LoginActionMapper: (userEmail, userPassword) =>
//       dispatch(LoginActionMapper(userEmail, userPassword)),
//   };
// };

export default Login;
