import React, { useState } from 'react'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import './adduser.css'
import { db } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/store';

const AddUser = () => {
  const [user, setUser] = useState(null)
  const { currentUser } = useUserStore()

  const handleSearh = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("name", "==", name));

      const querySnapShot = await getDocs(q)
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data())
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleAdd = async () => {
    const chatRef = collection(db, 'chats')
    const userChatRef = collection(db, 'userschat')
    try {
      const newChatRef = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      })
      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          reseiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      })
      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: '',
          reseiverId: user.id,
          updatedAt: Date.now()
        })
      })

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='adduser'>
      <form onSubmit={handleSearh}>
        <input type="text" placeholder='Name...' name='name' />
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className='user_img'>
          <img src={user.ava || "smile.jpg"} alt="smile" />
          <h3>{user.name}</h3>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
