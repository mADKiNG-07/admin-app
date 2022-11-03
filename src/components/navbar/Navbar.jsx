import "./navabar.scss";
import {
  ChatBubbleOutline,
  DarkModeOutlined,
  FullscreenExit,
  LanguageOutlined,
  ListOutlined,
  NotificationsNoneOutlined,
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
            <LanguageOutlined className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlined className="icon" />
          </div>
          <div className="item">
            <FullscreenExit className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutline className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlined className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
