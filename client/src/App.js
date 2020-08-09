import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Provider } from "react-redux";
import Nav from "./components/Nav";
import "./App.css";
import Login from "./components/Login";
import { toast } from "react-toastify";
import { store } from "./store";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import UpdateForm from "./components/UpdateForm";
import MessageBoard from "./components/MessageBoard";
import PostMessageBoard from "./components/PostMessageBoard";
import SerbianMessageBoard from "./components/SerbianMessageBoard";

toast.configure();

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  const [getToken, setToken] = useState("");

  const getUser = async (userEmail, userPassword) => {
    let credentials = {
      userEmail,
      userPassword,
    };
    const response = await fetch("http://localhost:3003/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      Accept: "application/json",
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((jsondata) => jsondata);

    setCurrentUser(response.user);

    console.log(currentUser);
    if (response.token) {
      setAuth(true);
      toast.success("Logged in Successfully");
      localStorage.setItem("token", response.token.jwtToken);
      sessionStorage.setItem("user", JSON.stringify(response.user));
    } else {
      setAuth(false);
      toast.error("Invalid Credentials");
    }
  };
  let userStorage = localStorage.getItem("CurrentUser");
  console.log(userStorage);

  const getRegisteredUser = async (
    userEmail,
    userPassword,
    firstName,
    lastName
  ) => {
    const body = { userEmail, userPassword, firstName, lastName };
    const response = await fetch("http://localhost:3003/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((jsondata) => jsondata);

    setCurrentUser(response.user);
    console.log(currentUser);
    if (response.token) {
      setAuth(true);
      toast.success("Logged in Successfully");
      localStorage.setItem("token", response.token.jwtToken);
      const userStorage = sessionStorage.setItem("CurrentUser", currentUser);
      console.log(userStorage);
    } else {
      setAuth(false);
      toast.error("error");
    }
  };

  const checkAuthenticated = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3003/api/users/verify", {
        method: "GET",
        headers: { jwt_token: token },
      });

      const parseRes = await res.json();
      console.log(`this is in App: ${parseRes}`);
      parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} getUser={getUser} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register
                    {...props}
                    setAuth={setAuth}
                    getRegisteredUser={getRegisteredUser}
                  />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard
                    {...props}
                    setAuth={setAuth}
                    currentUser={currentUser}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/userprofile"
              render={(props) =>
                isAuthenticated ? (
                  <FileUpload
                    {...props}
                    setAuth={setAuth}
                    currentUser={currentUser}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route
              exact
              path="/userprofile/update"
              render={(props) =>
                isAuthenticated ? (
                  <UpdateForm
                    {...props}
                    setAuth={setAuth}
                    currentUser={currentUser}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/messageboard" component={MessageBoard} />
            <Route
              exact
              path="/messageboard/post"
              component={PostMessageBoard}
            />
            <Route
              exact
              path="/messageboard/translate"
              component={SerbianMessageBoard}
            />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
