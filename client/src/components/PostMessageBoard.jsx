import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Message } from "../models/Messages";
import { postMessageActionMapper } from "../action-mappers/postMessage-action-mapper";

const PostMessage = () => {
  let [message, changeMessage] = useState("");
  let [title, changeTitle] = useState("");
  let currentUser = sessionStorage.getItem("user");
  currentUser = JSON.parse(currentUser);
  let [messageUser, setMessageUser] = useState(currentUser);

  const updateMessage = (e) => {
    e.preventDefault();
    changeMessage(e.currentTarget.value);
  };

  const updateTitle = (e) => {
    e.preventDefault();
    changeTitle(e.currentTarget.value);
  };

  let dispatch = useDispatch();

  const submitMessage = async () => {
    let newMessage = new Message();
    newMessage.userId = currentUser.user_id;
    newMessage.message = message;
    newMessage.title = title;
    try {
      let thunk = await postMessageActionMapper(newMessage);
      dispatch(thunk);
      console.log(messageUser);
      console.log("posting...");
    } catch (e) {
      console.log(`Error from PostMessage ${e}`);
    }
  };

  return (
    <div id="postMessageDiv">
      <h1 className="mt-5 text-center">Post a Message</h1>
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={updateTitle}
        style={{ marginTop: "80px" }}
      />
      <br />
      <br />
      <textarea
        rows="3"
        className="form-control"
        name="message"
        placeholder="message"
        value={message}
        onChange={updateMessage}
        style={{ width: "300px", marginLeft: "50px" }}
      />
      <br />
      <br />
      <button className="btn " type="submit" onClick={submitMessage}>
        Submit
      </button>
      <br />
    </div>
  );
};
export default PostMessage;
