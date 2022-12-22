import "./usercard.scss";
import React, { useState, useEffect } from "react";

function UserCard(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://itrendsanalytics.herokuapp.com/posts/all-posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="usercard">
      <div className="left">
        <div className="imgCircle"></div>
        <div className="info">
          <div className="details">
            <p className="title">FIRSTNAME</p>
            <p className="text">{props.fName}</p>
            <p className="title">LASTNAME</p>
            <p className="text">{props.lName}</p>
            <p className="title">EMAIL</p>
            <p className="text">{props.email}</p>
          </div>
          <div className="details">
            <p className="title">NATIONALITY</p>
            <p className="text">{props.country}</p>
            <p className="title">RATINGS</p>
            <p className="text">RATINGS</p>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default UserCard;
