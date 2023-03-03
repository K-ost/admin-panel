import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "./components/Layout"
import Notify from "./components/system/Notify"
import Login from "./pages/Login"
import { setUser } from "./store/authSlice"
import { AppDispatch, RootState } from "./store/store"


function App() {
  const token = localStorage.getItem('token')
  const userStorage = localStorage.getItem('user')
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (token && userStorage) {
      dispatch(setUser(JSON.parse(userStorage)))
    }
  }, [dispatch, token, userStorage])

  useEffect(() => {}, [user])

  return (
    <div className="app">
      {!userStorage
        ? <Login />
        : <Layout />
      }
      
      <Notify />
    </div>
  )
}

export default App
