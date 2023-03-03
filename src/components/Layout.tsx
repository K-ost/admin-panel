import { Route, Routes } from "react-router-dom"
import AddArticle from "../pages/AddArticle"
import Home from "../pages/Home"
import Register from "../pages/Register"
import Articles from "../pages/Articles"
import EditUser from "../pages/EditUser"
import Users from "../pages/Users"
import Header from "./system/Header"
import Sidebar from "./system/Sidebar"
import EditArticle from "../pages/EditArticle"
import ShowArticle from "../pages/ShowArticle"
import Profile from "../pages/Profile"
import Chat from "../pages/Chat"

const Layout: React.FC = () => {
  return (
    <div className="app-body">
      <Header />
      <div className="app-middle">
        <Sidebar />
        <div className="app-main">
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="/article/:id" element={<ShowArticle />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
      <div className="app-footer">&copy; 2023 All Rights Reserved</div>
    </div>
  )
}

export default Layout