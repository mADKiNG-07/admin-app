import "./verify.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import Ssn from "./../../pages/ssn/Ssn";
import { NavLink } from "react-router-dom";
import uploadSelfie from "../../assets/profile.png";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import front from "../../assets/front.png";
import { app } from "./../../config/firebase.js";
import back from "../../assets/back.png";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Verify(props) {
  const { email } = useParams();

  const text = "Drag & Drop your Selfie here";
  const text2 = "Front";
  const text3 = "Back";

  const selfieFileUpload = (selfie) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", selfie);
    // const blob = new Blob([selfie], { type: "image/jpg" });

    const storage = getStorage(app);
    const storageRef = ref(storage, `${email}/selfie`);

    const metadata = {
      contentType: "image/jpeg",
    };

    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, selfie, metadata)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      // You can now use the 'downloadURL' for further processing or to store it in your database

      .catch((error) => {
        // Handle errors during the upload or URL retrieval
        // console.error("Error uploading file or getting download URL:", error);
      });
  };

  const identityFileUpload = (identity) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", identity);
    // const blob = new Blob([selfie], { type: "image/jpg" });

    const storage = getStorage(app);
    const storageRef = ref(storage, `${email}/identiy_${identity.name}`);

    const metadata = {
      contentType: "image/jpeg",
    };

    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, identity, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const identity_backFileUpload = (identity_back) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", identity_back);
    // const blob = new Blob([selfie], { type: "image/jpg" });

    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `${email}/identity_back_${identity_back.name}`
    );

    const metadata = {
      contentType: "image/jpeg",
    };

    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, identity_back, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const handleSSNSubmit = (values) => {
    console.log("SSN: ", values);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${email}/ssn_${values}`);

    const metadata = {
      contentType: "text/plain",
    };

    const blob = new Blob([values], { type: "text/plain" });
    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div className="verify">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
          </div>

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ px: "22px" }}>
                <p className="lead">1. Take a Selfie</p>
                <div className="selfie">
                  <FilesDragAndDrop
                    onFileChange={selfieFileUpload}
                    icon={uploadSelfie}
                    text={text}
                  />
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ px: "22px" }}>
                <p className="lead">2. Upload a picture of identity</p>
                <div className="selfie">
                  <FilesDragAndDrop
                    onFileChange={identityFileUpload}
                    icon={front}
                    text={text2}
                  />
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ px: "22px" }}>
                <p className="lead">3. Upload a picture of identity (Back)</p>
                <div className="selfie">
                  <FilesDragAndDrop
                    onFileChange={identity_backFileUpload}
                    icon={back}
                    text={text3}
                  />
                </div>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                {/* <TimelineConnector /> */}
              </TimelineSeparator>
              <TimelineContent sx={{ px: "22px" }}>
                <p className="lead">4. State Security Number</p>
                <div className="selfie">
                  {/* <Ssn onSSNSubmit={handle_ssn_upload} /> */}
                  <Ssn
                    onDataReady={(getSSNData) => (
                      <div>
                        <button
                          className="btn btn-primary my-5 mx-3"
                          onClick={() => handleSSNSubmit(getSSNData())}
                        >
                          Complete Registration
                        </button>
                      </div>
                    )}
                  />
                </div>
                <div></div>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      {/* <div className="right"></div> */}
    </div>
  );
}

export default Verify;
