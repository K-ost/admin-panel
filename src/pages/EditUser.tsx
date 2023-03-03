import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { server } from '../assets/helpers'
import { UserType } from '../assets/types'
import UserSkelet from '../components/users/UserSkelet'
import InputField from '../components/system/InputField'

const EditUser: React.FC = () => {
  const { id } = useParams()
  const nav = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)

  const [user, setUser] = useState<UserType>()
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<string>('')


  useEffect(() => {
    if (loading) {
      fetch(`${server}/users?id=${id}`)
        .then(response => response.json())
        .then(data => {
          const userData: UserType = data[0]
          setUser(userData)
          setFirstname(userData.firstname)
          setLastname(userData.lastname!)
          setRole(userData.role)
          setEmail(userData.email)
          setLoading(false)
        })
    }
  }, [id, loading])


  // updateUser
  const updateUser = (e: any) => {
    e.preventDefault()
    const updatedUser = { firstname, lastname, email, role }
    setLoading(true)
    fetch(`${server}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    }).then(response => response.json())
      .then(data => {
        setLoading(false)
        nav('/users')
      })
  }


  if (loading) {
    return <UserSkelet />
  }

  return (
    <div className="module mt-4">
      <Link to="/users" className="btn btn-sm mb-3 btn-outline-primary">&larr; Back to users page</Link>
      <h3>Edit user {user?.firstname} {user?.lastname}</h3>
      
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select className="form-select" onChange={e => setRole(e.target.value)} defaultValue={role}>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <option value="manager">Manager</option>
          <option value="social">Social</option>
        </select>
      </div>
      
      <InputField value={firstname} label="Username" placeholder="Username" handler={val => setFirstname(val)} />
      
      <InputField value={lastname} label="Lastname" placeholder="Lastname" handler={val => setLastname(val)} />
      
      <InputField value={email} label="Email" placeholder="Email" handler={val => setEmail(val)} />
      
      <button className="btn btn-sm btn-warning" onClick={updateUser}>
        Edit user
      </button>
    </div>
  )
}

export default EditUser