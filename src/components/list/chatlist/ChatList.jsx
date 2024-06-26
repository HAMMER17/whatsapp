import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useUserStore } from '../../../lib/store'
import { useChatStore } from '../../../lib/chat';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import './chatlist.css'
import AddUser from '../adduser/AddUser';
import { db } from '../../../lib/firebase';

const ChatList = () => {
  const { currentUser } = useUserStore()
  const { changeChat, chatId } = useChatStore()


  const [add, setAdd] = useState(false)
  const [chat, setChat] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userschat", currentUser.id), async (res) => {
      const item = await res.data().chats

      const promises = item.map(async (item) => {
        const docUserRef = doc(db, "users", item.reseiverId);
        const docUserSnap = await getDoc(docUserRef);

        const user = docUserSnap.data()
        return { ...item, user }
      })
      const chatData = await Promise.all(promises)
      setChat(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
    });
    return () => unSub()
  }, [currentUser.id])

  const handleSelect = async (chat) => {
    await changeChat(chat.chatId, chat.user)
  }
  const filterChats = chat.filter(e => e.user.name.toLowerCase().includes(input))
  return (
    <div className='chatlist'>
      <div className='chatsearch'>

        <input type="text" placeholder='Search...' value={input} onChange={(e) => setInput(e.target.value)} />


        {add ? <FaMinusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} /> :
          <FaPlusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} />}
      </div>
      {filterChats.map((data) => (
        <div className='chatitem' key={data.chatId} onClick={() => handleSelect(data)}>
          <img src={data.user.ava || "/ava.jpg"} alt="avatar" />
          <div>
            <h3>{data.user.name}</h3>
            <p>{data.lastMessages} ...</p>
          </div>
        </div>
      ))}


      {add && <AddUser />}
    </div>

  )
}

export default ChatList
