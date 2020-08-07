import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [data, setData] = useState([]);
  // const response = await fetch(`http://localhost:3003/dashboard/notifications`);
  // const parseRes = await response.json();
  // const getData = parseRes[0].map((item) => {
  //   return item;
  // });
  // getData.forEach(function (entry) {
  //   setData(entry);
  // });
  useEffect(async () => {
    await fetch("http://localhost:3003/dashboard/notifications")
      .then((res) => res.json())
      .then((response) => setData(response[0]));
  }, []);

  const handleDelete = () => {};

  console.log(data);

  const notes = (
    <ul>
      <li>{data[-1]}</li>
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
