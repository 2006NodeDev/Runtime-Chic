import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import gryffindor from "../images/gryffindor.png";
import slytherin from "../images/slytherin.png";
import ravenclaw from "../images/ravenclaw.png";
import hufflepuff from "../images/hufflepuff.png";
import FileUpload from "./FileUpload";
import Nav from "./Nav";

const Dashboard = ({ setAuth, currentUser }) => {
  //  const [name, setName] = useState("");
  //  const [houseImg, sethouseImg] = useState([]);
  //  const [profileImg, setProfileImg] = useState("");
  //  const [members, setMembers] = useState([]);
  console.log(currentUser);
  // const getProfile = async () => {
  //   try {
  //     const res = await fetch("http:/localhost:3003/dashboard", {
  //       method: "POST",
  //       headers: { jwt_token: localStorage.token },
  //     });
  //     console.log(currentUser);
  //     console.log(`this is currentUser:${currentUser.house}`);
  //     console.log(name);
  //     const parseData = await res.json();
  //     console.log(parseData);
  //     setName(parseData.first_name);
  //     sethouseImg(parseData.house_name);
  //     setProfileImg(parseData.profile);
  //     console.log("FRIENDS");
  //     console.log(parseData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // const getHouseMembers = async () => {
  //   try {
  //     const url = `http://localhost:3003/dashboard`;
  //     const res = await fetch(url);

  //     const parseData = await res.json();
  //     setMembers(parseData);
  //     console.log("friends");
  //     console.log(members);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
      // history.push("/");
    }
  };

  // useEffect(() => {
  //   getProfile();
  // }, []);
  // console.log(`this is currentUser:${currentUser}`);
  // console.log(name);

  return (
    <div>
      <div id="dashMainDiv">
        <Nav />
        <div id="welcomeBanner">
          <h1>Welcome </h1>
          {/* <img id="userImg" src={profileImg} alt="" /> */}
        </div>
        <div id="">
          <h1>
            <span id="houseSpan1">hmmmmmm.....</span>{" "}
            <span id="houseSpan2">{currentUser.house_name}!!!!</span>
          </h1>
          <h1>{currentUser.first_name}</h1>
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
        <p>i hope this works</p>

        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
