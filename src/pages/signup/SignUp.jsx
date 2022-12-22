import "./signup.scss";
import React, { useState } from "react";
import axios from "axios";

function SignUp() {
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

    console.log(
      firstname +
        " " +
        lastName +
        " " +
        email +
        " " +
        country +
        " " +
        mobileNumber +
        " " +
        dOB
    );
    axios
      .post("https://itrendsanalytics.herokuapp.com/users/add-user", {
        fName: firstname,
        lName: lastName,
        dob: dOB,
        email: email,
        password: password,
        country: country,
        phoneNumber: mobileNumber,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        console.error(err.response.data);
        alert(err.response.data);
      });
    // try {
    //   let res = await fetch(
    //     "https://itrendsanalytics.herokuapp.com/users/add-user",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         fName: firstname,
    //         lName: lastName,
    //         dob: dOB,
    //         email: email,
    //         password: "hihlifwe",
    //         country: country,
    //         phoneNumber: mobileNumber,
    //       }),
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    //   let resJson = await res.json();
    //   if (res.status === 200) {
    //     setFirstName("");
    //     setLastName("");
    //     setEmail("");
    //     setCountry("");
    //     setDOB("");
    //     setMobileNumber("");
    //   } else {
    //     console.log("Error");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="signup local-bootstrap">
      <div className="left">
        <div className="txtHeader">
          <h2>Create your account</h2>
        </div>
        <div className="alt">
          <button type="button" className="login-with-google-btn">
            Sign up with Google
          </button>
        </div>
        <div className="lo">
          <h2 className="orline">
            <span>or</span>
          </h2>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="row mt-3">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col">
                <select
                  id="inputCountry"
                  className="form-control"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value>Country...</option>
                  <option>Angola</option>
                  <option>Togo</option>
                  <option>Ukraine</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>
            </div>

            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                required
              />
              <label className="form-check-label smalltext">
                I accept the Privacy Policy and the Terms of Service
              </label>
            </div>

            <div className="bonttom mt-2">
              <button type="submit" className="btn btn-secondary btnn mt-3">
                Sign up
              </button>

              <div className="login">
                <p>
                  Already have an account? <span>Login</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
}

export default SignUp;
