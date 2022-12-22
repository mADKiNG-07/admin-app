import "./analyst.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AnalystDatable from "../../components/a_datatable/AnalystDatable";

function Analyst() {
  return (
    <div className="analyst">
      <Sidebar />
      <div className="analystContainer">
        <Navbar />
        <AnalystDatable />
      </div>
    </div>
  );
}

export default Analyst;
