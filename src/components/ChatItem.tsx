import { ChatType } from "../assets/types"
import nofoto from '../assets/images/user.svg'
import { formatDate } from '../assets/helpers'
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface IChatItem {
  user: ChatType
}

const ChatItem: React.FC<IChatItem> = ({ user }) => {
  const date = formatDate(user.createdAt, true)
  const firstname = useSelector((state: RootState) => state.auth.user?.firstname)
  const itemClass = (firstname === user.authorName) ? 'chatitem current' : 'chatitem'

  return (
    <div className={itemClass}>
      <div className="module chatitem-inner">
        <img src={user.authorAva ? user.authorAva : nofoto} alt="" className="chatitem-img" />
        <div className="chatitem-body">
          <div className="chatitem-author">
            {user.authorName}
            <div className="chatitem-date">Added: {date}</div>
          </div>
          <div className="chatitem-message">{user.message}</div>
        </div>
      </div>
    </div>
  )
}

export default ChatItem