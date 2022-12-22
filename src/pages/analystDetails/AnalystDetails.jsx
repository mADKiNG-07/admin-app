import "./analystDetails.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UserCard from "../../components/usercard/UserCard";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalystDetails() {
  let { id } = useParams();
  let namer;

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://itrendsanalytics.herokuapp.com/users/viewAnalyst/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });

  const dataw = [
    {
      name: "Page A",
      uv: 4,
      pv: 2,
    },
    {
      name: "Page B",
      uv: 3,
      pv: 1,
    },
    {
      name: "Page C",
      uv: 2,
      pv: 9,
    },
    {
      name: "Page D",
      uv: 2,
      pv: 3,
    },
    {
      name: "Page E",
      uv: 1,
      pv: 4,
    },
    {
      name: "Page F",
      uv: 2,
      pv: 3,
    },
    {
      name: "Page G",
      uv: 3,
      pv: 4,
    },
  ];

  return (
    <div className="analystDetails">
      <Sidebar />
      <div className="aDetailsContainer">
        <Navbar />
        <div className="widgets">
          {data.map((singleData) => {
            // const base64String = Array.from(
            //   new Uint8Array(singleData.imgUrl.data.data),
            //   (v) => String.fromCharCode(v)
            // ).join("");
            // const img = btoa(base64String);
            return (
              <UserCard
                key={id}
                fName={singleData.fName}
                lName={singleData.lName}
                email={singleData.email}
                country={singleData.country}
              />
            );
          })}
        </div>
        <div className="cards">
          <div className="card">
            <CircularProgressbar value={70} text={"70%"} strokeWidth={4} />
          </div>
          <div className="cardA">
            <BarChart width={700} height={300} data={dataw}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalystDetails;
