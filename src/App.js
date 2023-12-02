import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Signup from "./pages/signup/SignUp";
import Post from "./pages/posts/Post";
import MPost from "./pages/makePost/MPost";
import Analyst from "./pages/analyst/Analyst";
import AnalystDetails from "./pages/analystDetails/AnalystDetails";
import Verify from "./pages/verify/Verify";
import Identity from "./pages/identity/Identity";
import IdentityBack from "./pages/identity_back/IdentityBack";
import SSN from "./pages/ssn/Ssn";
import Selfie from "./pages/selfie/Selfie";
import SsnUpload from "./pages/SsnUpload/SsnUpload";
import ChartComponent from "./components/ChartComponent";
import TradingView from "./components/tradingview/TradingView";
import Portfolio from "./pages/portfolio/Portfolio";


function App() {
  let { id } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="home" element={<Home />} />

            <Route path="login" element={<Login />} />



            {/* <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route> */}

            <Route path="post">
              <Route index element={<Post />} />
              <Route path=":postID" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

            <Route path="analyst">
              <Route index element={<Analyst />} />
              <Route path=":id" element={<AnalystDetails />} />
            </Route>

            <Route path="signup" element={<Signup />} />

            <Route path="makepost" element={<MPost />} />

            {/* <Route path="verify/:email" element={<Verify />} /> */}

            <Route path="selfie">
              <Route path=":email" element={<Selfie />} />
            </Route>

            <Route path="identity">
              <Route path=":email" element={<Identity />} />
            </Route>

            <Route path="identity_back">
              <Route path=":email" element={<IdentityBack />} />
            </Route>

            <Route path="ssnupload">
              <Route path=":email" element={<SsnUpload />} />
            </Route>

            {/* <Route path="identity" element={<Identity />} /> */}

            <Route path="portfolio">
              <Route path=":email" element={<Portfolio />} />
            </Route>

            <Route path="transactions" >
              <Route path=":email" element={<List />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
