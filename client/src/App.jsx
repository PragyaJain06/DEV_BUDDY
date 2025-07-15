import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import PendingRequests from "./components/PendingRequests";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/pending/requests" element={<PendingRequests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
