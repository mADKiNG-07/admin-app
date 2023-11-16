// import "bootstrap/dist/css/bootstrap.css";
import "./login.scss";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "./../../context/AuthProvider";
import Home from "../home/Home";

function Login() {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://intrendsanalytics.herokuapp.com/auth",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log(result?.data);
        const accessToken = result?.data?.accessToken;
        const roles = result?.data?.roles;
        setAuth({ email, password, roles, accessToken });
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        console.error(err.response.data);
        alert(err.response.data);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Incorrect Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <>
      {success ? (
        <Home />
      ) : (
        <div className="Login local-bootstrap">
          <div className="loginContainer">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h6>Login to Restructure</h6>
            <p>
              Enter your email address and the default password sent to your
              email address
            </p>

            <div className="formContainer">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa fa-envelope-o"></i>
                    </span>
                    <input
                      type="text"
                      id="email"
                      ref={userRef}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary col-auto">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
