import "./identityback.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import back from "../../assets/back.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { app } from "./../../config/firebase.js";

function IdentityBack() {
  const text = "Back";

  const { email } = useParams();

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

  return (
    <div className="identity">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">3. Upload a picture of identity (back)</p>
          </div>
          <div className="">
            <FilesDragAndDrop
              onFileChange={identityFileUpload}
              icon={back}
              text={text}
            />
          </div>

          <div className="prev_next">
            <NavLink to={`/identity/${email}`} className="lead">
              Previous
            </NavLink>
            <NavLink to={`/ssnupload/${email}`} className="lead">
              Next
            </NavLink>
          </div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default IdentityBack;
