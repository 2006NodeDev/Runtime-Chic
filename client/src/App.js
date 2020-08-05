import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { autoLogin } from "./userRedux/actions/userAction";

import "./App.css";
import Login from "./components/Login";
import { toast } from "react-toastify";

import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import FileUpload from "./components/FileUpload";
import UpdateForm from "./components/UpdateForm";
import MessageBoard from "./components/MessageBoard";
import PostMessageBoard from "./components/PostMessageBoard";
import Notifications from "./components/Notifications";

toast.configure();

function App() {
  // const checkAuthenticated = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3003/api/users/verify", {
  //       method: "GET",
  //       headers: { jwt_token: localStorage.token },
  //     });

  //     const parseRes = await res.json();
  //     console.log(`this is in App: ${parseRes}`);
  //     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthenticated();
  // }, []);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [currentUser, setCurrentUser] = useState([]);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };
  const userReducer = useSelector((state) => state.userReducer);
  console.log(userReducer);
  const dispatch = useDispatch();
  // const isLoggedIn = (props) => {
  //   if (userReducer.loggedIn) {
  //     return <Dashboard />;
  //   }
  //   return <Login />;
  // };

  useEffect(() => {
    dispatch(autoLogin());
  }, []);
  return (
    <div>
      <Router>
        <Switch>
          {/* {!userReducer.loggedIn ? (
            <Login />
          ) : (
            <Redirect to="/dashboard" />
            // <h1>Welcome, {userReducer.user.first_name}</h1>
          )} */}
          <Route exact path="/" component={Login} />
          {!userReducer.loggedIn ? (
            <Login />
          ) : (
            <Redirect to="/dashboard" />
            // <h1>Welcome, {userReducer.user.first_name}</h1>
          )}

          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/notification" component={Notifications} />
          <Route exact path="/userprofile" component={FileUpload} />
          <Route exact path="/userprofile/update" component={UpdateForm} />
          <Route exact path="/messageboard" component={MessageBoard} />
          <Route exact path="/messageboard/post" component={PostMessageBoard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
