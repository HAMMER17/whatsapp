import React, { useState } from 'react'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import './chatlist.css'
import AddUser from '../adduser/AddUser';

const ChatList = () => {
  const [add, setAdd] = useState(false)
  return (
    <div className='chatlist'>
      <div className='chatsearch'>

        <input type="text" placeholder='Search...' />


        {add ? <FaMinusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} /> :
          <FaPlusCircle className='chaticon' onClick={() => setAdd(pre => !pre)} />}
      </div>

      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>Hammer</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>
      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>User</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>
      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>User</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>
      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>User</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>
      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>User</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>
      <div className='chatitem'>
        <img src="/ava.jpg" alt="avatar" />
        <div>
          <h3>User</h3>
          <p>Weclcome to my chat</p>
        </div>
      </div>


      {add && <AddUser />}
    </div>

  )
}

export default ChatList
