import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import "./widget.scss";
import React, { useState, useEffect } from "react";

function Widget({ type }) {
  //
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://itrendsanalytics.herokuapp.com/users/all-users")
      .then((response) => response.json())
      .then((data) => {
        let uCount = data.length;
        console.log(uCount);
        setUsers(uCount);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://itrendsanalytics.herokuapp.com/posts/all-posts")
      .then((response) => response.json())
      .then((data) => {
        let uCount = data.length;
        console.log(uCount);
        setPosts(uCount);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let data;
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: users,
        link: "See all users",
        icon: (
          <PersonOutline
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "posts":
      data = {
        title: "POSTS",
        isMoney: false,
        amount: posts,
        link: "View all posts",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(218,165,32,0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNING",
        isMoney: true,
        amount: 74838,
        link: "View Net Earnings",
        icon: (
          <MonetizationOnOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        amount: 74838,
        icon: (
          <AccountBalanceWalletOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: " purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          20%
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
