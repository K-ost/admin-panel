import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { server } from "../assets/helpers"
import InputField from "../components/system/InputField"
import { setNotify } from "../store/appSlice"
import { AppDispatch, RootState } from "../store/store"

const Register: React.FC = () => {
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('author')
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)
  const nav = useNavigate()
  
  // Admin rights
  useEffect(() => {
    if (user?.role !== 'admin') {
      nav('/')
    }
  }, [nav, user?.role])

  // registerFunc
  const registerFunc = async (e: any) => {
    e.preventDefault()
    try {
      const newUser = { firstname, lastname, email, role, password }
      const response = await fetch(`${server}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      const data = await response.json()
      if (response.status === 201) {
        dispatch(setNotify(`User ${firstname} ${lastname} has been registered`))
        nav('/users')
      } else {
        dispatch(setNotify(data))
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <div className="module">
        <InputField placeholder="Firstname" handler={val => setFirstname(val)} />
        <InputField placeholder="Lastname" handler={val => setLastname(val)} />
        <InputField type="email" placeholder="Email" handler={val => setEmail(val)} />
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" onChange={e => setRole(e.target.value)}>
            <option value="author">Author</option>
            <option value="manager">Manager</option>
            <option value="social">Social</option>
          </select>
        </div>
        <InputField type="password" placeholder="Password" handler={val => setPassword(val)} />
        <button className="btn btn-primary" onClick={registerFunc}>Register</button>
      </div>
    </div>
  )
}

export default Register