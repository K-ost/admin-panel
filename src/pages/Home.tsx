import { useSelector } from "react-redux"
import UserCard from "../components/users/UserCard"
import { RootState } from "../store/store"

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <UserCard user={user} />}
    </div>
  )
}

export default Home