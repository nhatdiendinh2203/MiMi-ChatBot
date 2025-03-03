import React from 'react'
import Chatbotlcon from './Chatbotlcon'

const ChatMessage = ({chat}) => {
    return (
      <div className={` message ${chat.role === "model" ? 'bot' : 'user'}-message `}>
             {chat.role === "model" && <Chatbotlcon/> }      
              <p className="message-text">{chat.text}</p>
            </div>
    )
  }

export default ChatMessage