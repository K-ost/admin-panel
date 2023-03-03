import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { server } from "../assets/helpers"
import { UserType } from "../assets/types"
import Popup from "../components/system/Popup"
import UserCard from "../components/users/UserCard"
import UserSkelet from "../components/users/UserSkelet"
import { setNotify } from "../store/appSlice"
import { AppDispatch } from "../store/store"

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<AppDispatch>()
  const [modal, setModal] = useState<boolean>(false)
  const [removeID, setRemoveID] = useState<string>('')
  const [removeName, setRemoveName] = useState<string>('')
  
  useEffect(() => {
    if (loading) {
      fetch(`${server}/users`)
        .then(response => response.json())
        .then(data => {
          setUsers(data)
          setLoading(false)
        })
    }
  }, [loading])


  // removeUser
  const removeUser = (id: string, name: string) => {
    setModal(true)
    setRemoveID(id)
    setRemoveName(name)
  }

  // removeConfirm
  const removeConfirm = () => {
    setLoading(true)
    fetch(`${server}/users/${removeID}`, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 200) {
        dispatch(setNotify(`User ${removeName} has been removed`))
      }
      return response.json()
    })
    setModal(false)
  }

  if (loading) {
    return <><UserSkelet /><UserSkelet /><UserSkelet /></>
  }

  return (
    <div>
      <h1>Users</h1>
      {users.map(el => <UserCard key={el.id} user={el} edited handler={removeUser} />)}

      <Popup
        title={`Remove user ${removeName}`}
        text="Do you confirm user deletion?"
        show={modal}
        hide={() => setModal(false)}
        handler={removeConfirm}
      />
    </div>
  )
}

export default Users