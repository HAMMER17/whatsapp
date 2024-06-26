import React from 'react'
// import { signOut } from "firebase/auth";
import { useUserStore } from '../../lib/store'
import { useChatStore } from '../../lib/chat'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import { FaCloudArrowDown } from "react-icons/fa6";
import './detail.css'
import { auth, db } from '../../lib/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';


const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore()
  const { currentUser } = useUserStore()

  const handleBlock = async () => {
    const userDocRef = doc(db, 'users', currentUser.id)
    if (!user) return;
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      })
      changeBlock()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.ava || "ava.jpg"} alt="ava" />
        <h4 style={{ margin: '5px' }}>{user.name}</h4>

        <button className='btn' onClick={() => auth.signOut()}>signOut</button>
      </div>
      <div className="info">

        <div className="title">
          <h4>Chat setting</h4>
          <FaArrowAltCircleUp className='icon' />
        </div>

        <div className="title">
          <h4>Chat setting</h4>
          <FaArrowAltCircleUp className='icon' />
        </div>

        <div className="title">
          <h4>Privacy and help</h4>
          <FaArrowAltCircleUp className='icon' />
        </div>

        <div className="title">
          <h4>Shared photos</h4>
          <FaArrowAltCircleDown className='icon' />
        </div>


        <div className="title">
          <img src="camera.webp" alt="camera" />
          <span>20_11_22file.png</span>
          <FaCloudArrowDown className='icon' />
        </div>
        {/* <div className="title">
          <img src="camera.webp" alt="camera" />
          <span>20_11_22file.png</span>
          <FaCloudArrowDown className='icon' />
        </div> */}
        <div className="title">
          <h4>Shared files</h4>
          <FaArrowAltCircleUp className='icon' />
        </div>
        <button className='btn' onClick={handleBlock}>
          {/* Block User */}
          {isCurrentUserBlocked ? "You are block" : isReceiverBlocked ? "User blocked" : "User Block"}
        </button>

      </div>
    </div>
  )
}

export default Detail
