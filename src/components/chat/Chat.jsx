import React, { useEffect, useRef, useState } from 'react'
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaVideo, FaInfoCircle, FaCamera, FaMicrophone, FaSmile } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import './chat.css'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chat';
import { useUserStore } from '../../lib/store';

import upload from '../../lib/upload';

const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [img, setImg] = useState({
    file: null,
    url: ''
  })

  const { chatId, user } = useChatStore()
  const { currentUser } = useUserStore()
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const unSab = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data())
    })
    return () => unSab()
  }, [chatId])

  const handleSend = async () => {
    if (text === '') return;
    let imgUrl = null
    try {
      if (img.file) {
        imgUrl = await upload(img.file)
      }
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        })
      })
      const userIds = [currentUser.id, user.id]

      userIds.forEach(async (id) => {
        const docChatRef = doc(db, "userschat", id);
        const docChatSnap = await getDoc(docChatRef);
        if (docChatSnap.exists()) {
          const userChatData = docChatSnap.data()
          const chatIndex = userChatData.chats.findIndex((c) => c.chatId === chatId)
          userChatData.chats[chatIndex].lastMessages = text;
          userChatData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = new Date()
          await updateDoc(docChatRef, {
            chats: userChatData.chats
          })
        } else {
          console.log("No such document!");
        }
      })

    } catch (error) {
      console.log(error)
    }
    setImg({
      file: null,
      url: ''
    })
    setText('')
  }

  const handleEmoji = (e) => {
    setText(pre => pre + e.emoji)
    setOpen(false)
  }

  const handleImg = (e) => {
    setImg({
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0])
    })
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="/smile.jpg" alt="ava" />
          <div>
            <h3>Alex</h3>
            <p>Hello , Welcome to my chat</p>
          </div>
        </div>
        <div className="icons">
          <BsFillTelephoneForwardFill className='icon' />
          <FaVideo className='icon' />
          <FaInfoCircle className='icon' />
        </div>
      </div>

      <div className="center">

        {chat?.messages?.map((message) => (
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message.createdAt}>
            {message.senderId === currentUser.id ? <img src={currentUser.ava || 'ava.jpg'} alt="ava" /> : <img src={user.ava || 'ava.jpg'} alt="ava" />}
            <div className='text'>
              {message.img && <img src={message.img || "/camera.webp"} alt="camera" className='img_chat' />}
              <p>{message.text}

              </p>
              {/* <span>1 min ago</span> */}
            </div>
          </div>
        ))}


        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className='icons'>
          <label htmlFor="file">
            <AiFillPicture className='icon' />
          </label>

          <FaCamera className='icon' />
          <input type="file" id='file' style={{ display: 'none' }} onChange={handleImg} />
          <FaMicrophone className='icon' />
        </div>
        <input type="text" placeholder='Text...' value={text} onChange={(e) => setText(e.target.value)} />
        <div className="emoji">
          <FaSmile onClick={() => setOpen(pre => !pre)} size={25}
            style={{ cursor: 'pointer', margin: '5px', color: 'yellow' }} />
          <div className="pic">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>

        </div>
        <button onClick={handleSend}>message</button>
      </div>
    </div>
  )
}

export default Chat
