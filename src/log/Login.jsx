import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../lib/firebase'
import './login.css'
import { FaCamera } from "react-icons/fa";
import { toast } from 'react-toastify';
import upload from '../lib/upload';


const Login = () => {
  const [show, setShow] = useState(false)

  const [ava, setAva] = useState({
    file: null,
    url: ''
  })

  const handleAva = (e) => {
    setAva({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    const formatData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formatData)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        toast.success('Welcome', {
          position: 'bottom-left'
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, errorMessage, {
          position: 'bottom-left'
        })
      });
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const formatData = new FormData(e.target)
    const { name, email, password } = Object.fromEntries(formatData)
    try {

      const result = await createUserWithEmailAndPassword(auth, email, password)
      const imgUrl = await upload(ava.file)

      await setDoc(doc(db, "users", result.user.uid), {
        id: result.user.uid,
        name, email, password,
        ava: imgUrl,
        blocked: []
      });
      await setDoc(doc(db, "userschat", result.user.uid), {
        chats: []
      });
      toast.success('Welcome, account created')
    } catch (error) {
      console.log(imgUrl, 'error')
      toast.error(error)
    }

  }

  return (
    <div className='login'>
      {show ? <div className="item">
        <h1>Welcome back</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email...' name='email' />
          <input type="text" placeholder='Password' name='password' />
          <button type='submit'>Sing In</button>
        </form>
        <p>Do not have an account? <span style={{ color: 'red', cursor: 'pointer', margin: '5px', fontSize: '20px', fontStyle: 'italic' }} onClick={() => setShow(pre => !pre)}>Register</span></p>
      </div> :
        <div className="item">
          <h1>Create an Account</h1>
          <form onSubmit={handleRegister}>
            <img src={ava.url || 'smile.jpg'} alt="ava" />
            <label htmlFor="file" style={{ color: 'green' }}><FaCamera size={40} style={{ cursor: 'pointer' }} />Upload file</label>
            <input type="file" id='file' style={{ display: 'none' }} onChange={handleAva} />
            <input type="text" placeholder='Name...' name='name' />
            <input type="email" placeholder='Email...' name='email' />
            <input type="text" placeholder='Password' name='password' />
            <button>Sing Up</button>
          </form>
          <p>Do you already have an account? <span style={{ color: 'red', cursor: 'pointer', margin: '5px', fontSize: '20px', fontStyle: 'italic' }} onClick={() => setShow(pre => !pre)}>Login</span></p>
        </div>}
    </div>
  )
}

export default Login
