import React, { useState } from "react";
import { MessageDisplay } from "../components/MessageDisplay";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { allSerbianMessagesActionMapper } from "../action-mappers/getSerbianMessages-action-mapper";
import Nav from "./Nav";

const style = makeStyles((theme) => ({
  header: {
    alignSelf: "center",
    alignItems: "center",
  },
  body: {
    alignSelf: "center",
    alignItems: "center",
    width: 600,
  },
  button: {
    backgroundColor: "midnightblue",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    width: 100,
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const SerbianMessageBoard = (props) => {
  let [allUsers, setAllUsers] = useState("");

  const classes = style();
  let dispatch = useDispatch();

  const allMessages = useSelector((state) => {
    return state.allSerbianMessageState.messageList;
  });

  let url =
    process.env["USER_SERVICE_HOST"] || "http://34.120.86.250:80/user-service";

  const getAllUsers = async () => {
    try {
      fetch(`${url}/api/users/get/allUsers`)
        .then((response) => response.json())
        .then((data) => {
          setAllUsers(data);
        });
    } catch (error) {
      console.log("No Users in MessageBoard");
    }
  };

  const getSerbianMessages = async () => {
    try {
      let thunk = allSerbianMessagesActionMapper();
      dispatch(thunk);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = (messageId, allUsers) => {
    let result = allUsers.find((user) => user.userId === messageId);
    return result;
  };
  let messageDisplays = "Loading Messages...";
  if (allMessages) {
    messageDisplays = allMessages.map((message) => {
      return (
        <MessageDisplay
          key={"message-key-" + message.messageId}
          message={message}
          user={getUser(message.userId, allUsers)}
        />
      );
    });
  } else if (allUsers) {
    getSerbianMessages();
  } else {
    getAllUsers();
  }

  return (
    <div className={classes.alignItemsAndJustifyContent}>
      <Nav />
      <br />
      <br />
      <h1 className={classes.header}>Doshka oholoshenʹ</h1> <br />
      <div className={classes.body}>{messageDisplays}</div>
      <br />
    </div>
  );
};
export default SerbianMessageBoard;
