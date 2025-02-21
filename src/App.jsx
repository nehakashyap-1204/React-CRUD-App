import "./App.css";
import Header from "./components/Header";
import CreateUser from "./components/CreateUser";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./components/ListUsers";
import Update from "./components/Update";
import Home from "./components/Home";
import Setting from "./components/Setting";
import Logout from "./components/Logout";
import PasswordChange from "./components/PasswordChange";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/create" element={<CreateUser />}></Route>
          <Route exact path="/read" element={<ListUsers />}></Route>
          <Route exact path="/update" element={<Update />}></Route>
          <Route exact path="/setting" element={<Setting />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/password" element={<PasswordChange />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
