import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { server } from "../assets/helpers"
import InputField from "../components/system/InputField"
import { setNotify } from "../store/appSlice"
import { setUser } from "../store/authSlice"
import { AppDispatch, RootState } from "../store/store"


const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const [avatarURL, setAvatarURL] = useState<string>('')
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user) {
      setAvatarURL(user.avatarURL!)
      setFirstname(user.firstname)
      setLastname(user.lastname!)
    }
  }, [user])

  // editUser
  const editUser = async (e: any) => {
    e.preventDefault()
    setLoad(true)
    const updatedUser = { ...user, avatarURL, firstname, lastname }
    const response = await fetch(`${server}/users/${user?.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })
    if ( response.status !== 200 && response.status !== 201 ) {
      dispatch(setNotify(`Server error: ${response.status}, ${response.statusText}. Try little later.`))
    } else {
      dispatch(setNotify('User information has been updated.'))
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(updatedUser))
      dispatch(setUser(updatedUser))
    }
    setLoad(false)
  }

  return (
    <div>
      <h1>Profile</h1>

      <InputField
        handler={(val) => setAvatarURL(val)}
        label="User avatar"
        placeholder="User avatar (url)"
        value={user?.avatarURL}
      />
      
      <InputField
        handler={(val) => setFirstname(val)}
        label="First name"
        placeholder="First name"
        value={user?.firstname}
      />
      
      <InputField
        handler={(val) => setLastname(val)}
        label="Last name"
        placeholder="Last name"
        value={user?.lastname}
      />

      <button className="btn btn-primary" onClick={editUser}>
        Save
        {load && <span className="spinner-border spinner-border-sm ms-2"></span>}
      </button>
    </div>
  )
}

export default Profile