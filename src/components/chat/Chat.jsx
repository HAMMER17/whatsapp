import React, { useEffect, useRef, useState } from 'react'
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { FaVideo, FaInfoCircle, FaCamera, FaMicrophone, FaSmile } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import './chat.css'

const Chat = () => {

  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const handleEmoji = (e) => {
    setText(pre => pre + e.emoji)
    setOpen(false)
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

        <div className="message">
          <img src="/smile.jpg" alt="ava" />
          <div className='text'>
            <p>
              Hello my friends. How are you?

            </p>
            <span>1 min ago</span>
          </div>

        </div>

        <div className="message own">
          <img src="/ava.jpg" alt="ava" />
          <div className='text'>
            <p>
              It is fine thanks . i am glag to see you
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/smile.jpg" alt="ava" />

          <div className='text'>
            <img src="/ava.jpg" alt="camera" className='img_chat' />
            <p>
              I want to tell you my little story about how i make this photo
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <img src="/smile.jpg" alt="ava" />
          <div className='text'>
            <img src="/camera.webp" alt="camera" className='img_chat' />
            <p>Hello, this is my best photo

            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className='icons'>
          <AiFillPicture className='icon' />
          <FaCamera className='icon' />
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
        <button>message</button>
      </div>
    </div>
  )
}

export default Chat
