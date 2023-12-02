import "./datatable.scss";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "./../../config/firebase.js";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

function Datatable({ transactions }) {
  return (
    <div className="transactions">
      <div>
        <div className="typr">
          {transactions.type == "Buy" ? (
            <p className="buy green">{transactions.type}</p>
          ) : (
            <p className="buy red">{transactions.type}</p>
          )}
          <p className="buy white">${transactions.price}</p>
        </div>
        <div className="daime">
          <p className="date">
            {transactions.date} {transactions.time}
          </p>
          {transactions.type == "Buy" ? (
            <p className="amount green">+ ${transactions.amount} BTC</p>
          ) : (
            <p className="amount red">- ${transactions.amount} BTC</p>
          )}
        </div>
      </div>
      {/* Add more fields as needed */}
    </div>
  );
}

export default Datatable;
