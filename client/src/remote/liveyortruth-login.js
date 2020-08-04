import { liveyourtruthClient } from ".";

export const liveyourtruthLogin = async (body) => {
  try {
      const response = await fetch("http://localhost:3003/api/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    const parseRes = await response.json();
    console.log(`response from login remote${parseRes.userEmail}`);
    if (parseRes.jwtToken) {
      localStorage.setItem("token", parseRes.jwtToken);
      console.log("Logged in Successfully");
    } else {
      console.log(parseRes);
    }
    return response.data; //should be the user object
  } catch (e) {
    console.log(`post login didn't work :(`)
    console.log(e);
    //should probably do something is we get an error
  }
};
