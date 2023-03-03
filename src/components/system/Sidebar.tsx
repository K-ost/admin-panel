import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { RootState } from "../../store/store"

const Sidebar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div className="app-sidebar">
      <ul className="navmenu">
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/chat">Chat</NavLink></li>
        <li><NavLink to="/articles">Articles</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        {
          user?.role === 'admin' &&
          <>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        }
        <li>
          <a
            href="https://www.npmjs.com/package/json-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            JSON Server
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar