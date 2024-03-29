import "./identity.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import front from "../../assets/front.png";
import back from "../../assets/back.png";
import { app } from "./../../config/firebase.js";
import { useParams } from "react-router-dom";
import uploadSelfie from "../../assets/profile.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Identity() {
  const { email } = useParams();

  const text = "Front";
  const text2 = "Back";

  const selfieFileUpload = (selfie) => {
    // Do something with the file, e.g., send it to a server or store it in state.
    console.log("Selected file:", selfie);
    // const blob = new Blob([selfie], { type: "image/jpg" });

    const storage = getStorage(app);
    const storageRef = ref(storage, `${email}/selfie_${selfie.name}`);

    const metadata = {
      contentType: "image/jpeg",
    };

    // Create a reference to the file in Firebase Storage
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, selfie, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div className="identity">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">2. Upload a picture of identity</p>
          </div>
          <div className="">
            <FilesDragAndDrop
              icon={front}
              text={text}
              onFileChange={selfieFileUpload}
            />
          </div>

          <div className="prev_next">
            <NavLink to={`/selfie/${email}`} className="lead">
              Previous
            </NavLink>
            <NavLink to={`/identity_back/${email}`} className="lead">
              Next
            </NavLink>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Identity;
