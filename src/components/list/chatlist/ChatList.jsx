import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useUserStore } from '../../../lib/store'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import './chatlist.css'
import AddUser from '../adduser/AddUser';
import { db } from '../../../lib/firebase';

const ChatList = () => {
  const { currentUser } = useUserStore()
  const [add, setAdd] = useState(false)
  const [chat, setChat] = useState([])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userschat", currentUser.id), async (doc) => {
      const item = await doc.data().chats

      const promises = item.map(async (item) => {
        const docUserRef = doc(db, "users", item.resiverId);
        const docUserSnap = await getDoc(docUserRef);

        const user = docUserSnap.data()
        return { ...item, user }
      })
      const chatData = await Promise.all(promises)
      setChat(chatData.sort((a, b) => b.updateAt - a.updateAt))
    });
    return () => unSub()
  }, [currentUser.id])
  console.log(chat)
  return (
    <div className='chatlist'>
      <div className='chatsearch'>

        <input type="text" placeholder='Search...' />


        {add ? <FaMinusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} /> :
          <FaPlusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} />}
      </div>
      {chat.map((data) => (
        <div className='chatitem' key={data.chatId}>
          <img src="/ava.jpg" alt="avatar" />
          <div>
            <h3>Hammer</h3>
            <p>{data.lastMessage}</p>
          </div>
        </div>
      ))}


      {add && <AddUser />}
    </div>

  )
}

export default ChatList
