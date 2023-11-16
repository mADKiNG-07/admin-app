import "./signup.scss";
import React, { useState } from "react";
import axios from "axios";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import app from "./../../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
      .post("https://intrendsanalytics.herokuapp.com/users/add-user", {
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
  };

  const onUpload = (files) => {
    console.log(files);
  };

  const signup = () => {
    const auth = getAuth();
    const storage = getStorage();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const storageRef = ref(storage, `${email}/.default/`); // Make sure to include a trailing slash

        // Create an empty file with a known name (e.g., ".keep") to simulate a folder
        const dummyFileRef = storageRef;

        // Put an empty Blob as the content of the dummy file
        uploadBytes(dummyFileRef, new Blob([]))
          .then(() => {
            // Folder "new" created
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle the error
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="signup">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Create your account</h2>
            <p className="lead">
              Take advantage of proven solutions to achieve cryptocoin success
            </p>
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

              <div className="bonttom d-grid gap-2 mt-2">
                <NavLink
                  className="d-grid gap-2 nnavlink"
                  to={`/verify/${email}`}
                >
                  <button
                    type="submit"
                    className="btn btn-secondary mt-3"
                    onClick={signup()}
                  >
                    Next
                  </button>
                </NavLink>

                <div className="login">
                  <p>
                    Already have an account?{" "}
                    <span className="linkk">
                      <NavLink to="#" className="nvlink">
                        Login
                      </NavLink>
                    </span>
                  </p>
                </div>

                {/* Modal */}
                <div
                  class="modal fade"
                  id="exampleModalToggle"
                  // data-bs-backdrop="static"
                  // data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="exampleModalToggleLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id="exampleModalToggleLabel"
                        >
                          Verify Account
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body box">
                        <FilesDragAndDrop onUpload={onUpload} />
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-target="#exampleModalToggle2"
                          data-bs-toggle="modal"
                          data-bs-dismiss="modal"
                        >
                          Understood
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="right"></div>
    </div>
  );
}

export default SignUp;
