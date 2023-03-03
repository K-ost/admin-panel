import { useState } from "react"
import { useDispatch } from "react-redux"
import { server } from "../assets/helpers"
import { LoggedType } from "../assets/types"
import { setNotify } from "../store/appSlice"
import { setLogin } from "../store/authSlice"
import { AppDispatch } from "../store/store"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()

  // authFunc
  const authFunc = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data: LoggedType = await response.json()
      if (response.status !== 200) {
        dispatch(setNotify(data))
      } else {
        dispatch(setLogin(data))
        dispatch(setNotify(`Hello, ${data.user.firstname} ${data.user.lastname}`))
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="loginbox">
      <div className="loginbox-form">
        <h3>Sign in</h3>
        <form action="#" onSubmit={authFunc}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-outline-primary">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login