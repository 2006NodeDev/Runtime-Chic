import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { toast } from "react-toastify";
toast.configure();

const Login = ({ setCurrentUser, setAuth }) => {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
  });

  const { userEmail, userPassword } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { userEmail, userPassword };
      const response = await fetch("http://localhost:3003/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      setCurrentUser(parseRes);

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div id="MainDiv">
      <h1>Hogwarts</h1>

      <p>join us at HOGWARTS school for the gifted</p>
      <div id="loginMainDiv">
        <div id="left-login"></div>
        <div id="right-login">
          <h1 id="formHeader">Login</h1>
          <form id="loginForm" onSubmit={onSubmitForm}>
            <input
              type="text"
              name="userEmail"
              value={userEmail}
              onChange={(e) => onChange(e)}
              className="form-control my-3"
            />
            <input
              type="password"
              name="userPassword"
              value={userPassword}
              onChange={(e) => onChange(e)}
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

export default Login;
