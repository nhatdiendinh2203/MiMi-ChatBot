import React from 'react';
import { useState } from 'react';
import Chatbotlcon from './components/Chatbotlcon';
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}]);
    }

    // Format chat history for API request
    history = history.map(({role, text}) => ({role, parts: [{text}] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({contents: history}),
    };

    try {
      // make the API call to get the bot's reponse
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateHistory(apiResponseText);
    } 
    catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container">
      <div className="chatbot-poup">
  
        <div className="chat-header">
          <div className="header-info">
            <Chatbotlcon/>
            <h2 className="logo-text">MiMiBot</h2>
          </div>
          <button><span className="material-symbols-rounded">keyboard_arrow_down
          </span></button>
        </div>

         {/* Chatbot Body */}
        <div className="chat-body">
          <div className="message bot-message">
          <Chatbotlcon/>
            <p className="message-text">
              Hey there 👋 <br /> How can I help you today?
            </p>
          </div>

          {/* Render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
          
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory = {setChatHistory} generateBotResponse = {generateBotResponse}/>
        </div>
      </div>
    </div>
  );
};

export default App