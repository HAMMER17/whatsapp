import React, { useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import './adduser.css'
import { db } from '../../../lib/firebase';

const AddUser = () => {
  const [user, setUser] = useState(null)

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
        <button>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser
