import React from 'react'
import './adduser.css'

const AddUser = () => {
  return (
    <div className='adduser'>
      <form >
        <input type="text" placeholder='Name...' name='name' />
        <button>Search</button>
      </form>
      <div className="user">
        <div className='user_img'>
          <img src="smile.jpg" alt="smile" />
          <h3>User</h3>
        </div>

        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser
