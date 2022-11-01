import "./navabar.scss";
import {
  DarkModeOutlined,
  LanguageOutlined,
  SearchOutlined,
} from "@mui/icons-material";

function Navbar() {
  return (
    <div className="navbar">
      <div className="wrapper">
        {/* search */}
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
        {/* items */}
        <div className="items">
          <div className="item">
            <LanguageOutlined />
            English
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
