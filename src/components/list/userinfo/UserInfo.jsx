import React from 'react'
import { IoIosMore } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import './userinfo.css'
import { useUserStore } from '../../../lib/store';

const UserInfo = () => {
  const { currentUser } = useUserStore()
  return (
    <div className='userinfo'>
      <div className='user'>
        <img src={currentUser.ava || "/smile.jpg"} alt="smile" />
        <h3>{currentUser.name}</h3>
      </div>
      <div className='usericon'>

        <IoIosMore size={20} className='icon' />
        <FaVideo size={20} className='icon' />
        <MdEdit size={20} className='icon' />
      </div>
    </div>
  )
}

export default UserInfo
