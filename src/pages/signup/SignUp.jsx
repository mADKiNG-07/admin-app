import "./signup.scss";
import React, { useState } from "react";
import axios from "axios";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import app from "./../../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs, orderBy } from "firebase/firestore";

function SignUp() {
  // states for the form
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();

    // console.log(
    //   firstname +
    //     " " +
    //     lastName +
    //     " " +
    //     email +
    //     " " +
    //     country +
    //     " " +
    //     mobileNumber +
    //     " " +
    //     dOB
    // );
    axios
      .post("https://intrendsanalytics.herokuapp.com/users/add-user", {
        fName: firstname,
        lName: lastName,
        email: email,
        password: password,
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

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const isAgreementChecked = (agreed) => {
    return agreed;
  };

  const isFormValid = () => {
    return (
      firstname.trim() !== "" &&
      lastName.trim() !== "" &&
      isEmailValid(email) &&
      isPasswordValid(password) &&
      isAgreementChecked(agreed)
    );
  };

  const signup = () => {
    if (isFormValid()) {
      // console.log('Form submitted successfully');
      // Add your signup logic here if needed
      const auth = getAuth();
      const storage = getStorage();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: firstname + " " + lastName,
          })
            .then(() => {
              // Profile updated successfully
              console.log("User created with additional details:", user);
            })
            .catch((error) => {
              // An error occurred while updating the user profile
              console.error("Error updating user profile:", error);
            });
          const storageRef = ref(storage, `${email}/.default/`); // Make sure to include a trailing slash
          const userRef = doc(db, email, "portfolio");
          const userRef2 = doc(db, `${email}-portfolio`, "BITCOIN");
          const userRef3 = doc(db, `${email}-transaction`, "01");

          setDoc(
            userRef,
            { ado: "0", bitcoin: "0", bnb: "0", eth: "0" },
            { merge: true }
          );

          setDoc(userRef2, { amount: "0", coin: "Bitcoin" }, { merge: true });

          setDoc(
            userRef3,
            {
              amount: "0",
              date: "0",
              price: "0",
              time: "0",
              timest: "0",
              type: "0",
            },
            { merge: true }
          );
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
    } else {
      console.log("Form is not valid. Please check your inputs.");
      // You can also provide user feedback here, e.g., show error messages
    }
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
                <div className="col edit">
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
              <div className="form-group edit mt-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group edit mt-3">
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
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  required
                />
                <label className="form-check-label smalltext">
                  I accept the Privacy Policy and the Terms of Service
                </label>
              </div>

              <div className="bonttom d-grid gap-2 mt-2">
                {isFormValid() ? ( // Render NavLink only if the form is valid
                  <NavLink
                    className="d-grid gap-2 nnavlink"
                    to={`/selfie/${email}`}
                  >
                    <button
                      type="submit"
                      className="btn btn-secondary mt-3"
                      disabled={!isFormValid()}
                    >
                      Next
                    </button>
                  </NavLink>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary mt-3"
                    disabled={!isFormValid()}
                  >
                    Next
                  </button>
                )}

                <div className="login">
                  <p>
                    Already have an account?{" "}
                    <span className="linkk">
                      <NavLink to="/login" className="nvlink">
                        Login
                      </NavLink>
                    </span>
                  </p>
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
