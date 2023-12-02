import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "./../../config/firebase.js";
import { useParams } from "react-router-dom";
import { collection, doc, setDoc, getDocs, orderBy } from "firebase/firestore";

function List() {
  const db = getFirestore(app);

  const { email } = useParams();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, `${email}-transaction`)
        );
        console.log("Query Snapshot:", querySnapshot);
        const transactionData = querySnapshot.docs.map((doc) => doc.data());
        setTransactions(transactionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="list">
      <Sidebar />

      <div className="listContainer">
        <Navbar />
        <div className="top">
          <h2>Transactions</h2>
          <p>An overview of cryptocurrencies and markets</p>
        </div>
        {transactions.map((transaction) => (
          <Datatable key={transaction.id} transactions={transaction} />
        ))}
      </div>
    </div>
  );
}

export default List;
