import "./sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  CandlestickChart,
  Logout,
  Article,
  PostAdd,
  IosShareRounded,
} from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const email = user.email;
      const firstname = user.displayName;
      setUserEmail(email);
      setFirstName(firstname);
    } else {
      // User is signed out
      // console.log("User is signed out");
      // Handle any necessary logic for signed-out state
    }
  });

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const storage = getStorage();

  // Specify the path to the file in your storage bucket
  const filePath = `${userEmail}/selfie`;
  const fileRef = ref(storage, filePath);

  // Get the download URL of the file

  getDownloadURL(fileRef)
    .then((url) => {
      // Use the URL to access the file or download it
      console.log("File URL:", url);
      setProfilePic(url);
    })
    .catch((error) => {
      console.error("Error getting download URL:", error);
    });

  return (
    <div className="sidebar">
      <div className="top">
        <div className="details">
          <div className="avatar">
            <img className=".img" src={profilePic} alt="" width={100} />
          </div>
          <p className="username">
            {firstName} <br />
            <span className="email">{userEmail}</span>
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
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <NavLink className="navlink" to="/home">
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <p className="title">LIST</p>
          <li>
            <NavLink className="navlink" to={`/portfolio/${userEmail}`}>
              <PersonOutline className="icon" />
              <span>Portfolio</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to={`/transactions/${userEmail}`}>
              <Article className="icon" />
              <span>Transactions</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="navlink" to="/analyst">
              <CandlestickChart className="icon" />
              <span>Trade</span>
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink className="navlink" to="/makepost">
              <PostAdd className="icon" />
              <span>Profile</span>
            </NavLink>
          </li> */}
          <li onClick={logout} className="bottom">
            <NavLink className="navlink" to="/login">
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
