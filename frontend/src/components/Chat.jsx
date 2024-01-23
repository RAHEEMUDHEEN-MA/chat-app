import React from 'react'
import '../assets/styles/Chat.css'

const Chat = () => {
  return (
    <div className='chat'>
        <div className='chat_header'>
            <div className='profile_photo'><a href="">image</a></div>
            <div className='name'>User1</div>
        </div>
        <div className='chat_body'></div>
        <div className='chat_footer'>
            <div className='chat_input'>
                <input type="text" placeholder='type your message' />
            </div>
            <div><button>send</button></div>
        </div>
      
    </div>
  )
}

export default Chat
