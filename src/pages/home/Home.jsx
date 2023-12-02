import Sidebar from "../../components/sidebar/Sidebar";
import TableCoins from "../../components/TableCoins";
import Widget from "../../components/widgets/Widget";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import { Notifications, Send, Forum } from "@mui/icons-material";
import TradingView from "../../components/tradingview/TradingView";
import Navbar from "../../components/navbar/Navbar";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import Chat from "../../components/chat/Chat";

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
    );
    setCoins(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [message, setMessage] = useState("");

  function showRandomPopup() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "notifications/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMessage(snapshot.val().message);
        } else {
          setMessage("No message available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const toasterContainer = document.getElementById("toaster-container");
    const notificationText = document.getElementById("notification-text");
    const randomNumber = getRandomNumber(200, 1200);

    // Display the notification
    toasterContainer.classList.remove("show");
    setTimeout(() => {
      notificationText.textContent = `${message}`;
      toasterContainer.classList.add("show");
    }, 100); // Delay for smoother transition

    // Automatically hide the popup after 4 seconds (animation duration)
    setTimeout(() => {
      toasterContainer.classList.remove("show");
    }, 4000);
  }

  // useEffect(() => {
  //   // Show the initial popup
  //   showRandomPopup();

  //   // Continuously show random popups every 4 seconds
  //   const intervalId = setInterval(() => {
  //     showRandomPopup();
  //   }, 4000);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div id="toaster-container">
          {/* <span id="randomOutput"></span>
          <span id="notification-text"></span> */}
          <Chat />
          <Forum className="icon3" />
          {3 > 0 && <span id="notification-badge">3</span>}
        </div>
        <div className="top">
          <div>
            <h2>Dashboard</h2>
            <p>An overview of cryptocurrencies and markets</p>
          </div>
          <div className="gen">
            <button
              className="generate"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <Send className="icon2" />
              Withdraw
            </button>
          </div>
        </div>
        <div className="trading_cont container">
          <TradingView />
          <div className="row">
            {/* <input
              type="text"
              placeholder="Search a Coin"
              className="form-control border-1 mt-4 field"
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            {/* <TableCoins coins={coins} search={search} /> */}
          </div>
        </div>
        <div className="widgets">
          <Widget type="BITCOIN" />
          <Widget type="ETHEREUM" />
          <Widget type="BNB" />
          <Widget type="CARDANO" />
        </div>
      </div>
    </div>
  );
}

export default Home;
