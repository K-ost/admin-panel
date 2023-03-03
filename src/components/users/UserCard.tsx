import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import userAvatar from '../../assets/images/user.svg'
import { UserType } from '../../assets/types'
import { RootState } from '../../store/store'

interface IUserCard {
  edited?: boolean
  handler?: (id: string, name: string) => void
  user: UserType
}

const UserCard: React.FC<IUserCard> = ({ edited, handler, user }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user)
  const roleClass = user.role === 'admin' ? 'badge bg-success' :
                    user.role === 'manager' ? 'badge bg-warning text-dark' :
                    user.role === 'social' ? 'badge bg-info text-dark' :
                    'badge bg-secondary'

  return (
    <div className="cardbox">
      <div className="cardbox-img">
        <img src={user.avatarURL ? user.avatarURL : userAvatar} alt="" />
      </div>
      <div className="cardbox-body">
        <div className="cardbox-name">{user.firstname} {user.lastname}</div>
        
        <span className={roleClass}>{user.role}</span>
        <div className="cardbox-email">{user.email}</div>
      </div>
      
      <div className="cardbox-settings">
        {currentUser?.role === 'admin'  &&
          <Link to={`/users/${user.id}`} className="btn btn-sm btn-warning">Edit</Link>
        }
        {currentUser?.role === 'admin' && user.role !== 'admin'  &&
          <button className="btn btn-sm btn-danger" onClick={() => handler!(user.id, user.firstname)}>Delete</button>
        }
      </div>
    </div>
  )
}

export default UserCard