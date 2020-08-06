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
    if (response.token.jwtToken) {
      localStorage.setItem("token", response.token.jwtToken);
      setAuth(true);
      toast.success("Logged in Successfully");
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
    <div>
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
                  <Register {...props} setAuth={setAuth} />
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
            <Route exact path="/userprofile" component={FileUpload} />
            <Route exact path="/userprofile/update" component={UpdateForm} />
            <Route exact path="/messageboard" component={MessageBoard} />
            <Route
              exact
              path="/messageboard/post"
              component={PostMessageBoard}
            />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
