import React from "react";
import { useHistory, Link } from "react-router-dom";
import FileUpload from "./FileUpload";

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
        <button onClick={routeChange}>
          {/* {(() => {
            switch (currentUser) {
              case !currentUser:
                return <i class="fas fa-user"></i>;
              case currentUser:
                return <img id="navProfileImg" src={} alt="" />;
            }
          })()} */}
        </button>
      </nav>
    </div>
  );
};
export default Nav;
