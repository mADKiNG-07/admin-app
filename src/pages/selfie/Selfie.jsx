import "./selfie.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import back from "../../assets/profile.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { app } from "./../../config/firebase.js";

function Selfie() {
  const text = "Upload Selfie";

  const { email } = useParams();

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
    uploadBytes(storageRef, selfie, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div className="selfie">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">1. Upload a selfie</p>
          </div>
          <div className="">
            <FilesDragAndDrop
              onFileChange={selfieFileUpload}
              icon={back}
              text={text}
            />
          </div>

          <div className="prev_next">
            <NavLink to="/signup" className="lead">
              Previous
            </NavLink>
            <NavLink to={`/identity/${email}`} className="lead">
              Next
            </NavLink>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Selfie;
