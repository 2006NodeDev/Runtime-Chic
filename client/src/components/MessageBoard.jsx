import React from "react";
import { Message } from "../models/Messages";
import { User } from "../models/Users";
import { MessageDisplay } from "../components/MessageDisplay";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

const MessageBoard = (props) => {
  const classes = style();
  // const allUsers = useSelector((state)=>{
  //     return state.allUserState.userList
  // })

  // const allMessages = useSelector((state)=>{
  //     return state.allMessageState.messageList
  // })

  // Testing code
  let allMessages = [];

  let m1 = new Message();
  m1.messageId = 1;
  m1.userId = 1;
  m1.title = "first message";
  m1.message = "this is the first message";
  m1.date = "2020-07-01 23:23:04";

  let m2 = new Message();
  m2.messageId = 2;
  m2.userId = 1;
  m2.title = "second message";
  m2.message = "this is the second message";
  m2.date = "2020-07-02 02:02:45";

  let m3 = new Message();
  m3.messageId = 3;
  m3.userId = 2;
  m3.title = "third message";
  m3.message = "this is the third message";
  m3.date = "2020-07-29 12:02:45";

  allMessages.push(m1);
  allMessages.push(m2);
  allMessages.push(m3);

  let allUsers = [];

  let u1 = new User();
  u1.userId = 1;
  u1.username = "Harry";
  u1.houseId = 1;

  let u2 = new User();
  u2.userId = 2;
  u2.username = "Draco";
  u2.house = 2;

  let u3 = new User();
  u3.userId = 3;
  u3.username = "Luna";
  u3.house = 3;

  let u4 = new User();
  u4.userId = 4;
  u4.username = "Cedric";
  u4.house = 4;

  allUsers.push(u1);
  allUsers.push(u2);
  allUsers.push(u3);
  allUsers.push(u4);

  const getUser = (messageId, allUsers) => {
    let result = allUsers.find((user) => user.userId === messageId);
    return result;
  };

  let messageDisplays = allMessages.map((message) => {
    return (
      <MessageDisplay
        key={"message-key-" + message.messageId}
        message={message}
        user={getUser(message.userId, allUsers)}
      />
    );
  });

  return (
    <div className={classes.alignItemsAndJustifyContent}>
      <br />
      <h1 className={classes.header}> Message Board </h1> <br />
      <Button className={classes.button} variant="contained" disableElevation>
        Translate
      </Button>
      <br />
      {/* <br/><button className="btn btn-success" type='submit'>Translate</button><br/> */}
      <div className={classes.body}>{messageDisplays}</div>
    </div>
  );
};
export default MessageBoard;
