// import "bootstrap/dist/css/bootstrap.css";
import "./login.scss";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs, orderBy } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  // states for the form
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dOB, setDOB] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .post("https://intrendsanalytics.herokuapp.com/users/add-user", {
    //     fName: firstname,
    //     lName: lastName,
    //     dob: dOB,
    //     email: email,
    //     password: password,
    //     country: country,
    //     phoneNumber: mobileNumber,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.error(err.response.data);
    //     alert(err.response.data);
    //   });
  };
  const navigate = useNavigate();

  const Login = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
        // console.log("login successful");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("login unsuccessful");
        const errorMessage = error.message;
      });
  };
  return (
    <div className="login">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Login</h2>
            <p className="lead">
              Take advantage of proven solutions to achieve cryptocoin success
            </p>
          </div>

          <div className="formContainer">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="bonttom d-grid gap-2 mt-2">
              {/* <NavLink className="d-grid gap-2 nnavlink" to="#"> */}
              <button
                type="submit"
                className="btn btn-secondary mt-3"
                onClick={Login}
              >
                Login
              </button>
              {/* </NavLink> */}

              <div className="login">
                <p>
                  Dont have an account?{" "}
                  <span className="linkk">
                    <NavLink to="/signup" className="nvlink">
                      Sign Up
                    </NavLink>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
}

export default Login;
