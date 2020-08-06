import { liveyourtruthClient } from ".";
import { Users } from "../models/Users";

export const liveyourtruthLogin = async (userEmail, userPassword) => {
  let credentials = {
    userEmail,
    userPassword,
  };
  try {
    let response = await fetch("http://localhost:3003/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      Accept: "application/json",
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((jsondata) => {
        console.log("token???", jsondata);
        localStorage.setItem("token", jsondata.token.jwtToken);
      });
    // let response = await liveyourtruthClient.post(
    //   "/api/users/login",
    //   credentials
    // );
    console.log("lets try and get the user");
    // console.log(response);
    //should be the user object
  } catch (e) {
    console.log(e);
    //should probably do something is we get an error
  }
};
