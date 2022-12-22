import { NavLink } from "react-router-dom";

function Button(props) {
  return (
    <NavLink className="navlink" to={`/post/${props.email}`}>
      <button className="viewButton">
        <p>View</p>
      </button>
    </NavLink>
  );
}

export default Button;
