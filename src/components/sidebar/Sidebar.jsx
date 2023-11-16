import "./sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  CandlestickChart,
  LocalShipping,
  Assessment,
  NotificationsNone,
  SettingsSystemDaydream,
  Psychology,
  Settings,
  AccountCircle,
  Logout,
  Article,
  PostAdd,
  IosShareRounded,
} from "@mui/icons-material";
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  // const [buttonText, setButtonText] = useState("Copy");
  // const [buttonClass, setButtonClass] = useState("");

  const inputRef = useRef(null);
  const [buttonText, setButtonText] = useState("Copy");

  const copyText = async () => {
    if (inputRef.current) {
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setButtonText("Copied");
        setTimeout(() => {
          setButtonText("Copy");
        }, 2000); // Reset button text after 2 seconds
      } catch (err) {
        console.error("Unable to copy text: ", err);
      }
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <div className="details">
          <div className="avatar"></div>
          <p className="username">
            Patrick Sommer <br />
            <span className="email">patricksommer@gmail.com</span>
            <br />
            <button
              className="generate"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <IosShareRounded className="icon2" />
              Generate Wallet
            </button>
            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <div className="col-auto">
                      <input
                        class="form-control"
                        type="text"
                        ref={inputRef}
                        defaultValue="bc1q4wrctrr7us8jnyk430zh8kc6spenl39ug7kk7m"
                        aria-label="Disabled input example"
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-auto mt-2 float-end">
                      <button
                        onClick={copyText}
                        type="submit"
                        class="btn btn-primary mb-3"
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <li>
            <NavLink className="navlink" to="/users">
              <PersonOutline className="icon" />
              <span>Transactions</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/post">
              <Article className="icon" />
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/analyst">
              <CandlestickChart className="icon" />
              <span>Trade</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/makepost">
              <PostAdd className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="bottom">
            <NavLink className="navlink" to="/makepost">
              <Logout className="icon red" />
              <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Sidebar;
