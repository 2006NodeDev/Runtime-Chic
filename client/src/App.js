import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Nav from "./components/Nav";
import "./App.css";
import Login from "./components/Login";
import { toast } from "react-toastify";

import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import UpdateForm from "./components/UpdateForm";
toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:3003/api/users/verify", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      console.log(`this is in App: ${parseRes}`);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !isAuthenticated ? (
                <Login
                  {...props}
                  setCurrentUser={setCurrentUser}
                  setAuth={setAuth}
                />
              ) : (
                <Redirect to="/dashboard" currentUser={currentUser} />
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
                  setCurrentUser={setCurrentUser}
                  setAuth={setAuth}
                />
              ) : (
                <Redirect to="/dashboard" currentUser={currentUser} />
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
                  currentUser={currentUser}
                  setAuth={setAuth}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/userprofile"
            currentUser={currentUser}
            component={FileUpload}
          />
          <Route
            exact
            path="/userprofile/update"
            currentUser={currentUser}
            component={UpdateForm}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
