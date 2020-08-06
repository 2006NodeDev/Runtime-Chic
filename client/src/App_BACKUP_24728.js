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
<<<<<<< HEAD
import { store } from "./store";
=======
import { Provider } from 'react-redux';
>>>>>>> master
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import UpdateForm from "./components/UpdateForm";
import MessageBoard from "./components/MessageBoard";
import PostMessageBoard from "./components/PostMessageBoard";
import { store } from './store';
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
      sessionStorage.setItem("CurrentUser", currentUser);
    } else {
      setAuth(false);
      toast.error("Invalid Credentials");
    }
  };

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
      sessionStorage.setItem("CurrentUser", currentUser);
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
<<<<<<< HEAD
    <>
=======
    <div>
>>>>>>> master
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
<<<<<<< HEAD
                  <Login {...props} setAuth={setAuth} getUser={getUser} />
                ) : (
                  <Redirect to="/dashboard" />
=======
                  <Login
                    {...props}
                    setCurrentUser={setCurrentUser}
                    setAuth={setAuth}
                  />
                ) : (
                  <Redirect to="/dashboard" currentUser={currentUser} />
>>>>>>> master
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
<<<<<<< HEAD
                    setAuth={setAuth}
                    getRegisteredUser={getRegisteredUser}
                  />
                ) : (
                  <Redirect to="/dashboard" />
=======
                    setCurrentUser={setCurrentUser}
                    setAuth={setAuth}
                  />
                ) : (
                  <Redirect to="/dashboard" currentUser={currentUser} />
>>>>>>> master
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
<<<<<<< HEAD
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
=======
                    currentUser={currentUser}
                    setAuth={setAuth}
>>>>>>> master
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
<<<<<<< HEAD
            <Route exact path="/messageboard" component={MessageBoard} />
            <Route
              exact
              path="/messageboard/post"
              component={PostMessageBoard}
            />
          </Switch>
        </Router>
      </Provider>
    </>
=======
            <Route exact path="/userprofile" currentUser={currentUser} component={FileUpload} />
            <Route exact path="/userprofile/update" currentUser={currentUser} component={UpdateForm} />
            <Route exact path="/messageboard" component={MessageBoard} />
            <Route exact path="/messageboard/translate" component={SerbianMessageBoard} />
            <Route exact path="/messageboard/post" component={PostMessageBoard} />
          </Switch>
        </Router>
      </Provider>
    </div>
>>>>>>> master
  );
}

export default App;
