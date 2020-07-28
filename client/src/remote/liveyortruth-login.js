import { liveyourtruthClient } from ".";
import { Users } from "../models/Users";

export const liveyourtruthLogin = async (username, password) => {
  let credentials = {
    username,
    password,
  };
  try {
    let response = await liveyourtruthClient.post("/login", credentials);
    console.log(response);
    return response.data; //should be the user object
  } catch (e) {
    console.log(e);
    //should probably do something is we get an error
  }
};
