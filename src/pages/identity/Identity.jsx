import "./identity.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import front from "../../assets/front.png";
import back from "../../assets/back.png";

function Identity() {
  const text = "Front";
  const text2 = "Back";

  return (
    <div className="identity">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">2. Upload a picture of identity</p>
          </div>
          <div className="selfie">
            <FilesDragAndDrop icon={front} text={text} />
          </div>

          <div className="prev_next">
            <NavLink to="/verify" className="lead">
              Previous
            </NavLink>
            <NavLink to="/identity_back" className="lead">
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
