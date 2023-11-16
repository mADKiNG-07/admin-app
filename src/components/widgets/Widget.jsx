import {
  AccountBalanceWalletOutlined,
  KeyboardArrowUp,
  MonetizationOnOutlined,
  PersonOutline,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import "./widget.scss";
import bitcoin from "./../../imgs/bitcoin.png";
import et from "./../../imgs/et.png";
import binance from "./../../imgs/bnb.png";
import cardano from "./../../imgs/cardano.png";
import React, { useState, useEffect } from "react";

function Widget({ type }) {
  //

  let data;
  switch (type) {
    case "BITCOIN":
      data = {
        title: "BITCOIN",
        isMoney: true,
        amount: 40000,
        link: "See all users",
        icon: bitcoin,
      };
      break;
    case "ETHEREUM":
      data = {
        title: "ETHEREUM",
        isMoney: true,
        amount: 28000,
        link: "View all posts",
        icon: et,
      };
      break;
    case "BNB":
      data = {
        title: "BNB",
        isMoney: true,
        amount: 34000,
        link: "View Net Earnings",
        icon: binance,
      };
      break;
    case "CARDANO":
      data = {
        title: "CARDANO",
        isMoney: true,
        link: "See details",
        amount: 56000,
        icon: cardano,
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
        <img src={data.icon} alt="" srcset="" width={25} />
      </div>
    </div>
  );
}

export default Widget;
