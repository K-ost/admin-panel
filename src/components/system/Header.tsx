import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userAvatar from '../../assets/images/user.svg'
import { setLogout } from '../../store/authSlice'
import { AppDispatch, RootState } from '../../store/store'

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
  const nav = useNavigate()

  // logout
  const logout = () => {
    nav('/')
    dispatch(setLogout())
  }

  return (
    <header className="app-header">
      <div className="app-header__text">AddArticle app based on React.JS</div>
      <div className="app-header__user">
        <img src={user?.avatarURL ? user.avatarURL : userAvatar} alt="" />
        <span>{user?.firstname}</span>
        <button className="btn btn-light btn-sm" onClick={logout}>Sign out</button>
      </div>
    </header>
  )
}

export default Header