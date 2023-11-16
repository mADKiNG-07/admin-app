import "./identityback.scss";
import FilesDragAndDrop from "./../../components/filesDragAndDrop/FilesDragAndDrop";
import { NavLink } from "react-router-dom";
import back from "../../assets/back.png";

function IdentityBack() {
  const text = "Back";

  return (
    <div className="identity">
      <div className="left">
        <div className="contain">
          <div className="txtHeader">
            <h2>Verify account</h2>
            <p className="lead">3. Upload a picture of identity (back)</p>
          </div>
          <div className="selfie">
            <FilesDragAndDrop icon={back} text={text} />
          </div>

          <div className="prev_next">
            <NavLink to="/identity" className="lead">
              Previous
            </NavLink>
            <NavLink to="/ssn" className="lead">
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
