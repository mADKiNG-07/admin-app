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
import { getFirestore } from "firebase/firestore";
import { app } from "./../../config/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, doc, getDoc } from "firebase/firestore";

function Widget({ type }) {
  //
  const db = getFirestore(app);

  const [documentData, setDocumentData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const email = user.email;
      setUserEmail(email);
      fetchData(email); // Call fetchData with the user's email
    } else {
      // User is signed out
      // console.log("User is signed out");
      // Handle any necessary logic for signed-out state
    }
  });

  const fetchData = async (email) => {
    try {
      const docRef = doc(db, email, "portfolio");
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists) {
        setDocumentData(docSnapshot.data());
        // console.log("Data found");
      } else {
        // console.log("Document not found!");
      }
    } catch (error) {
      // console.error("Error fetching document:", error);
    }
  };

  const bitcoinPrice = 37733.1;
  const ethPrice = 2084.19;
  const bnbPrice = 234.47;
  const adaPrice = 0.392339;

  let data;
  switch (type) {
    case "BITCOIN":
      data = {
        title: "BITCOIN",
        isMoney: true,
        amount: (documentData.bitcoin / bitcoinPrice).toFixed(8),
        link: "See all users",
        icon: bitcoin,
      };
      break;
    case "ETHEREUM":
      data = {
        title: "ETHEREUM",
        isMoney: true,
        amount: (documentData.eth / ethPrice).toFixed(8),
        link: "View all posts",
        icon: et,
      };
      break;
    case "BNB":
      data = {
        title: "BNB",
        isMoney: true,
        amount: (documentData.bnb / bnbPrice).toFixed(8),
        link: "View Net Earnings",
        icon: binance,
      };
      break;
    case "CARDANO":
      data = {
        title: "CARDANO",
        isMoney: true,
        link: "See details",
        amount: (documentData.ado / adaPrice).toFixed(8),
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
        <span className="counter">{data.amount}</span>
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
