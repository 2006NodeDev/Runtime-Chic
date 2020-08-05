import { toast } from "react-toastify";

toast.configure();
// Action Creators

const setUser = (payload) => ({ type: "SET_USER", payload });

export const logUserOut = () => ({ type: "LOG_OUT" });

// Methods

export const fetchUser = (userInfo) => (dispatch) => {
  fetch(`http://localhost:3003/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch(setUser(data.user));
      console.log(data.user);
      if (data.token) {
        localStorage.setItem("token", data.token);

        toast.success("Logged in Successfully");
        // history.push("/dashboard");
      } else {
        toast.error(data);
      }
    });
};

export const signUserUp = (userInfo) => (dispatch) => {
  fetch(`http://localhost:3003/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);

      dispatch(setUser(data));
    });
};

export const autoLogin = () => (dispatch) => {
  fetch(`http://localhost:3003/api/users/verify`, {
    headers: {
      jwt_token: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      console.log(data);
      dispatch(setUser(data));
    });
};
