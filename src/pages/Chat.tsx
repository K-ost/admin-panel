import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { ChatType } from '../assets/types'
import ChatItem from '../components/ChatItem'

const Chat: React.FC = () => {
  const [message, setMessage] = useState('')
  const [chatList, setChatList] = useState<ChatType[]>([])
  const user = useSelector((state: RootState) => state.auth.user)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // sendMessage
  const sendMessage = () => {
    if ( message.length ) {
      const newMessage = { message, authorName: user?.firstname, authorAva: user?.avatarURL, createdAt: Date.now() }
      textareaRef.current!.value = ''
      console.log(newMessage)
    }
  }

  return (
    <div>
      <h1>Chat</h1>
      
      {chatList.map(el => <ChatItem key={el.id} user={el} />)}

      <div className="module chatbox">
        <textarea className="form-control" onChange={e => setMessage(e.target.value)} placeholder="Your message" ref={textareaRef} />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat