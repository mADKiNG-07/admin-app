import "./porfolio.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "./../../config/firebase.js";
import { useParams } from "react-router-dom";
import { collection, doc, setDoc, getDocs, orderBy } from "firebase/firestore";
import PortfolioItem from "../../components/portfolio_item/PortfolioItem.jsx";
import Navbar from "../../components/navbar/Navbar";

function Portfolio() {
  const { email } = useParams();

  const db = getFirestore(app);

  const [documentData, setDocumentData] = useState([]);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, `${email}-portfolio`)
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

  // const fetchData = async (email) => {
  //   try {
  //     const docRef = doc(db, email, "main-portfolio");
  //     const docSnapshot = await getDoc(docRef);

  //     if (docSnapshot.exists) {
  //       setDocumentData(docSnapshot.data());
  //       // console.log("Data found");
  //     } else {
  //       // console.log("Document not found!");
  //     }
  //   } catch (error) {
  //     // console.error("Error fetching document:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData(email);
  // }, []);

  return (
    <div className="portfolio">
      <Sidebar />

      <div className="portfolioContainer">
        <Navbar />
        <div className="top">
          <h2>Portfolio</h2>
          <p>An overview of cryptocurrencies and markets</p>
        </div>
        {transactions.map((transaction) => (
          <PortfolioItem key={transaction.id} portfolio={transaction} />
        ))}
        {/* <PortfolioItem key={documentData.id} portfolio={documentData} /> */}
      </div>
    </div>
  );
}

export default Portfolio;
