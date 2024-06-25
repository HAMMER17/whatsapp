import React from 'react'
// import { signOut } from "firebase/auth";
import { useUserStore } from '../../lib/store'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import { FaCloudArrowDown } from "react-icons/fa6";
import './detail.css'
import { auth } from '../../lib/firebase';


const Detail = () => {
  const { currentUser } = useUserStore()
  return (
    <div className='detail'>
      <div className="user">
        <img src={currentUser.ava || "ava.jpg"} alt="ava" />
        {/* <h4>{currentUser.name}</h4> */}

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

        {/* <div className="title">
          <img src="camera.webp" alt="camera" />
          <span>20_11_22file.png</span>
          <FaCloudArrowDown className='icon' />
        </div> */}
        <div className="title">
          <img src="camera.webp" alt="camera" />
          <span>20_11_22file.png</span>
          <FaCloudArrowDown className='icon' />
        </div>
        <div className="title">
          <img src="camera.webp" alt="camera" />
          <span>20_11_22file.png</span>
          <FaCloudArrowDown className='icon' />
        </div>
        <div className="title">
          <h4>Shared files</h4>
          <FaArrowAltCircleUp className='icon' />
        </div>
        <button className='btn'>Block User</button>

      </div>
    </div>
  )
}

export default Detail
