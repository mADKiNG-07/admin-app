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


function App() {
  let { id } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="home" element={<Home />} />

            <Route path="login" element={<Login />} />

            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>

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

            <Route path="verify">
              <Route path=":email" element={<Verify />} />
            </Route>

            <Route path="identity" element={<Identity />} />

            <Route path="identity_back" element={<IdentityBack />} />

            <Route path="ssn" element={<SSN />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
