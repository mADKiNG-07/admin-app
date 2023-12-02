import "./ssnupload.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import back from "../../assets/back.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import Ssn from "./../../pages/ssn/Ssn";
import { app } from "./../../config/firebase.js";
import React, { useState, useEffect, useContext, useRef } from "react";

function SsnUpload() {
  const { email } = useParams();

  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const handleSSNSubmit = (values) => {
    console.log("SSN: ", values);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${email}/ssn_${values}`);

    const metadata = {
      contentType: "text/plain",
    };

    const blob = new Blob([values], { type: "text/plain" });
    // Disable the button while the SSN is being uploaded

    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    setIsFormCompleted(true);
  };

  const [values, setValues] = useState({
    "number-code-0": "",
    "number-code-1": "",
    "number-code-2": "",
    "number-code-3": "",
    "number-code-4": "",
    "number-code-5": "",
    "number-code-6": "",
    "number-code-7": "",
    "number-code-8": "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Check if all input fields have values
    const allFieldsFilled = Object.values(values).every((val) => val !== "");

    // Enable the button if all fields are filled
    setIsFormCompleted(allFieldsFilled);
  };

  useEffect(() => {
    // Vanilla JavaScript code can be placed within the useEffect hook
    // Elements
    const numberCodeForm = document.querySelector("[data-number-code-form]");
    const numberCodeInputs = [
      ...numberCodeForm.querySelectorAll("[data-number-code-input]"),
    ];

    // Event callbacks
    const handleInput = ({ target }) => {
      if (!target.value.length) {
        return (target.value = null);
      }

      const inputLength = target.value.length;
      let currentIndex = Number(target.dataset.numberCodeInput);

      if (inputLength > 1) {
        const inputValues = target.value.split("");

        inputValues.forEach((value, valueIndex) => {
          const nextValueIndex = currentIndex + valueIndex;

          if (nextValueIndex >= numberCodeInputs.length) {
            return;
          }

          numberCodeInputs[nextValueIndex].value = value;
        });

        currentIndex += inputValues.length - 2;
      }

      const nextIndex = currentIndex + 1;

      if (nextIndex < numberCodeInputs.length) {
        numberCodeInputs[nextIndex].focus();
      }
    };

    const handleKeyDown = (e) => {
      const { code, target } = e;

      const currentIndex = Number(target.dataset.numberCodeInput);
      const previousIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;

      const hasPreviousIndex = previousIndex >= 0;
      const hasNextIndex = nextIndex <= numberCodeInputs.length - 1;

      switch (code) {
        case "ArrowLeft":
        case "ArrowUp":
          if (hasPreviousIndex) {
            numberCodeInputs[previousIndex].focus();
          }
          e.preventDefault();
          break;

        case "ArrowRight":
        case "ArrowDown":
          if (hasNextIndex) {
            numberCodeInputs[nextIndex].focus();
          }
          e.preventDefault();
          break;
        case "Backspace":
          if (!e.target.value.length && hasPreviousIndex) {
            numberCodeInputs[previousIndex].value = null;
            numberCodeInputs[previousIndex].focus();
          }
          break;
        default:
          break;
      }
    };

    // Event listeners
    numberCodeForm.addEventListener("input", handleInput);
    numberCodeForm.addEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="identity">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">4. SSN (Social Security Number)</p>
          </div>
          <div className="selfie">
            <form className="form">
              <fieldset name="number-code" data-number-code-form>
                {/* <legend>Number Code</legend> */}
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-0"
                  data-number-code-input="0"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  onChange={handleChange}
                  max="9"
                  name="number-code-1"
                  data-number-code-input="1"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-2"
                  data-number-code-input="2"
                  required
                />
                <input
                  className="input space"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-3"
                  data-number-code-input="3"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-4"
                  data-number-code-input="4"
                  required
                />
                <input
                  className="input space"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-5"
                  data-number-code-input="5"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-6"
                  data-number-code-input="6"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-7"
                  data-number-code-input="7"
                  required
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="9"
                  onChange={handleChange}
                  name="number-code-8"
                  data-number-code-input="8"
                  required
                />
              </fieldset>
              <button
                type="button"
                className="submit-button"
                onClick={() => handleSSNSubmit(values)}
                disabled={!isFormCompleted}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default SsnUpload;
