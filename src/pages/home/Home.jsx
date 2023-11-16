import Sidebar from "../../components/sidebar/Sidebar";
import TableCoins from "../../components/TableCoins";
import Widget from "../../components/widgets/Widget";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";

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

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h2>Dashboard</h2>
          <p>An overview of cryptocurrencies and markets</p>
        </div>
        <div className="widgets">
          <Widget type="BITCOIN" />
          <Widget type="ETHEREUM" />
          <Widget type="BNB" />
          <Widget type="CARDANO" />
        </div>
        <div className="container">
          <div className="row">
            <input
              type="text"
              placeholder="Search a Coin"
              className="form-control border-1 mt-4 field"
              onChange={(e) => setSearch(e.target.value)}
            />
            <TableCoins coins={coins} search={search} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
