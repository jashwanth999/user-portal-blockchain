import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Welcome from "./screens/Welcome";
import UserSignIn from "./screens/UserSignIn";
import UserSignUp from "./screens/UserSignUp";
import AdminSignIn from "./screens/AdminSigniIn";
import AdminHome from "./screens/AdminHome";
import UserHome from "./screens/UserHome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/user-signin" element={<UserSignIn />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/admin-signin" element={<AdminSignIn />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/admin-home" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
