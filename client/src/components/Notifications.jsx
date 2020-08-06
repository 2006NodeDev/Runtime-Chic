import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [data, setData] = useState([]);
  //   const response = await fetch(`http://localhost:3003/dashboard/notifications`);
  //   const parseRes = await response.json();
  //   const getData = parseRes[0].map((item) => {
  //     return item;
  //   });
  //   getData.forEach(function (entry) {
  //     setData(entry);
  //   });
  useEffect(async () => {
    await fetch("http://localhost:3003/dashboard/notifications")
      .then((res) => res.json())
      .then((response) => setData(response[0]));
  }, []);
  //   const getArray = getData[0].map((item) => {
  //     return item;
  //   });
  //   const getRealData = getArray.map((item) => {
  //     return item.title;
  //   });
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].message);
  }
  const notes = (
    <ul>
      {data.map((note) => (
        <li>
          <h1>NEW MESSAGE</h1>
          <h3>{note.title}</h3>
          <p>{note.message}</p>
        </li>
      ))}
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
