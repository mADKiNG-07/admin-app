import "./sidebar.scss";
import {
  Dashboard,
  PersonOutline,
  Store,
  CreditCard,
  LocalShipping,
  Assessment,
  NotificationsNone,
  SettingsSystemDaydream,
  Psychology,
  Settings,
  AccountCircle,
  Logout,
} from "@mui/icons-material";

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
            <PersonOutline className="icon" />
            <span>Users</span>
          </li>
          <li>
            <Store className="icon" />
            <span>Products</span>
          </li>
          <li>
            <CreditCard className="icon" />
            <span>Orders</span>
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
