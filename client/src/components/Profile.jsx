import React from "react";
import { toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import noUser from "../images/userimg.png";
import gryffindor from "../images/gryffindor.png";
import slytherin from "../images/slytherin.png";
import ravenclaw from "../images/ravenclaw.png";
import hufflepuff from "../images/hufflepuff.png";

export const Profile = ({ setAuth }) => {
  //const { currentUser } = useContext(AppContext);
  let currentUser = sessionStorage.getItem("user");
  currentUser = JSON.parse(currentUser);
  return (
    <div className="profileMainDiv">
      <div>
        <Paper id="userProfileDiv">
          <div id="userInfoProfile">
            <img
              key={currentUser.user_id}
              id="userProfileImg"
              src={currentUser.profile}
              alt=""
            />

            <h3>
              {currentUser.first_name}
              {currentUser.last_name}
            </h3>
            <br />
            <h3>{currentUser.house_name}</h3>
          </div>
          <div id="houseImgDiv">
            {(() => {
              switch (currentUser.house_name) {
                case "Gryffindor":
                  return <img className="houseImage" src={gryffindor} alt="" />;
                case "Slytherin":
                  return <img className="houseImage" src={slytherin} alt="" />;
                case "Ravenclaw":
                  return <img className="houseImage" src={ravenclaw} alt="" />;
                case "Hufflepuff":
                  return <img className="houseImage" src={hufflepuff} alt="" />;
              }
            })()}
          </div>
        </Paper>
      </div>
    </div>
  );
};
export default Profile;
