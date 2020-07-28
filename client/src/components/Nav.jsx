import React from "react";
import { useHistory, Link } from "react-router-dom";
import FileUpload from "./FileUpload";

const Nav = ({ profileImg }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/userprofile`;
    history.push(path);
  };
  console.log(profileImg);

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
          {(() => {
            switch (profileImg) {
              case !profileImg:
                return <i class="fas fa-user"></i>;
              case profileImg:
                return <img id="navProfileImg" src={profileImg} alt="" />;
            }
          })()}
        </button>
      </nav>
    </div>
  );
};
export default Nav;
