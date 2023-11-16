import "./post.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "../../components/postcard/PostCard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function Post() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/all-posts")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err, "it has an error"));
  });

  return (
    <div className="post">
      <Sidebar />
      <div className="postContainer">
        <Navbar />
        <div className="padding">
          <Grid container spacing={0}>
            {data.map((singleData) => {
              // const base64String = Array.from(
              //   new Uint8Array(singleData.imgUrl.data.data),
              //   (v) => String.fromCharCode(v)
              // ).join("");
              // const img = btoa(base64String);

              return (
                <Grid item xs={6}>
                  <PostCard
                    id={singleData._id}
                    className="postcard"
                    desc={singleData.desc}
                    outlook={singleData.outlook}
                    cryptoPair={singleData.cryptoPair}
                    imgUrl={singleData.imgUrl}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}
export default Post;
