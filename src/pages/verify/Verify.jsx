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
import back from "../../assets/back.png";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Verify() {
  const { email } = useParams();

  const text = "Drag & Drop your Selfie here";
  const text2 = "Front";
  const text3 = "Back";

  const selfieFileUpload = (selfie) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", selfie);
    return selfie;
  };

  const clicked = (data) => {
    console.log("wokrd:", data);
  };

  const identityFileUpload = (identity) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", identity);
    return identity;
  };

  const identity_backFileUpload = (identity_back) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", identity_back);
    return identity_back;
  };

  const handleSSNSubmit = (values) => {
    const selfie = selfieFileUpload();
    const front_card = identityFileUpload();
    const back_card = identity_backFileUpload();

    console.log("SSN: ", values);
    console.log("selfie: ", selfie);
    console.log("front-card: ", front_card);
    console.log("back-card: ", back_card);
    return values;
  };

  const firebaseUpload = () => {
    // Create a root reference
    const storage = getStorage();
    // const file = handleFileUpload();
    // const ssn_values = handle_ssn_upload();
    // console.log(ssn_values);
    // const imagesRef = ref(storage, `${email}/wertyu`);

    // uploadBytes(imagesRef, file).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });
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
                    submitData={clicked}
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
