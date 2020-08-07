import React from "react";
import { useHistory, Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import Notifications from "./Notifications";
import noUserProfile from "../images/userimg.png";

const Nav = ({ currentUser }) => {
  const history = useHistory();
  console.log(currentUser);

  const routeChange = () => {
    let path = `/userprofile`;
    history.push(path);
  };

  return (
    <div>
      <div class="collapse" id="navbarToggleExternalContent">
        <div id="hiddenMenu" class="p-4">
          <Link to="/">login</Link>
          <br />
          <Link to="/userprofile/update">profile picture</Link>
          <br />
          <Link to="/messageboard">Message Board</Link>
          <br />
          <Link to="/messageboard/translate">Translated Message Board</Link>
          <br />
          <Link to="/messageboard/post">Post Message</Link>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <h1>HOGWARTS</h1>
        <span style={{ display: "flex", flexDirection: "row" }}>
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i style={{ fontSize: "30px" }} class="fas fa-bell"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {/* <Notifications /> */}
          </div>
          <button
            className="btn"
            style={{ listStyle: "none" }}
            onClick={routeChange}
          >
            <i style={{ fontSize: "30px" }} class="fas fa-user-edit"></i>
            {/* {(() => {
            switch (currentUser) {
              case !currentUser:
                return (
                  <img id="navProfileImg" src={noUserProfile} alt=""></img>
                );
              case currentUser:
                return (
                  <li>profile</li>
                  //  <img id="navProfileImg" src={currentUser.profile} alt="" />
                );
            }
          })()} */}
          </button>
        </span>
      </nav>
    </div>
  );
};
export default Nav;
