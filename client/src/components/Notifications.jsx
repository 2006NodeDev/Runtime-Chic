import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [data, setData] = useState([]);

  const getNewMessage = async () => {
    await fetch("http://localhost:3003/dashboard/notifications")
      .then((res) => res.json())
      .then((response) => setData(response[0]));
  };
  console.log(data);

  // const response = await fetch(`http://localhost:3003/dashboard/notifications`);
  // const parseRes = await response.json();
  // const getData = parseRes[0].map((item) => {
  //   return item;
  // });
  // getData.forEach(function (entry) {
  //   setData(entry);
  // });
  useEffect(() => {
    // await fetch("http://localhost:3003/dashboard/notifications")
    //   .then((res) => res.json())
    //   .then((response) => setData(response[0]));
    getNewMessage();
  }, []);
  console.log(data);
  let newMessage = data[data.length - 1];
  console.log(newMessage);
  const handleDelete = () => {};

  console.log(data[data.length - 1]);

  const notes = (
    <ul>
      <li>
        <h2>New Message</h2>

        {/* <p>{newMessage.message}</p> */}
      </li>
      {/* {data.map((note) => (
        <li>
          <h4>NEW MESSAGE</h4>
          <p>{note.title}</p>
          <p>{note.message}</p>
        </li>
      ))} */}
    </ul>
  );

  return (
    <div>
      <h1>Notifications</h1>
      {notes}
    </div>
  );
};
export default Notifications;
