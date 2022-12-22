import "./sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  CandlestickChart,
  LocalShipping,
  Assessment,
  NotificationsNone,
  SettingsSystemDaydream,
  Psychology,
  Settings,
  AccountCircle,
  Logout,
  PostAdd,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">sonreir</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LIST</p>
          <li>
            <NavLink className="navlink" to="/users">
              <PersonOutline className="icon" />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/post">
              <PostAdd className="icon" />
              <span>Posts</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/analyst">
              <CandlestickChart className="icon" />
              <span>Analyst</span>
            </NavLink>
          </li>
          <li>
            <LocalShipping className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <Assessment className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNone className="icon" />
            <span>Notification</span>
          </li>
          <p className="title">SERVICES</p>

          <li>
            <SettingsSystemDaydream className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <Psychology className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <Settings className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USERS</p>
          <li>
            <AccountCircle className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <Logout className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div>
    </div>
  );
}

export default Sidebar;
