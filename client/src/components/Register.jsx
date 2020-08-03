import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "./FileUpload";

const Register = ({ setCurrentUser, setAuth }) => {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
    firstName: "",
    lastName: "",
  });

  const { userEmail, userPassword, firstName, lastName } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { userEmail, userPassword, firstName, lastName };
      const response = await fetch("http://localhost:3003/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      setCurrentUser(parseRes);
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>

      <form onSubmit={onSubmitForm}>
        <FileUpload />
        <input
          type="text"
          name="userEmail"
          value={userEmail}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="userPassword"
          value={userPassword}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="firstName"
          value={firstName}
          placeholder="first name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          placeholder="last name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />

        <button className="btn btn-success btn-block">Submit</button>
      </form>

      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default Register;
