import React, { useState, Fragment } from "react";

import { toast } from "react-toastify";
toast.configure();

const UpdateForm = () => {
  const [inputs, setInputs] = useState({
    userEmail: "",
    userPassword: "",
    firstName: "",
    lastName: "",
    profile: "",
  });

  const { userEmail, userPassword, firstName, lastName, profile } = inputs;

  const onChange = (e) =>
    setInputs(
      { ...inputs, [e.target.name]: e.target.value } || {
        ...inputs,
        [e.target.name]: e.target.file[0],
      }
    );

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { userEmail, userPassword, firstName, lastName, profile };
      const response = await fetch("http://localhost:3003/dashboard/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      toast.error(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = () => {};

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Update User Profile</h1>
      <form onSubmit={onSubmitForm}>
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
        <input
          type="file"
          name="profile"
          value={profile}
          placeholder="last name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />

        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </Fragment>
  );
};
export default UpdateForm;
