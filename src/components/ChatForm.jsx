import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessager = inputRef.current.value.trim();
    if (!userMessager) return;
    inputRef.current.value = "";

    //Update chat history with the user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessager}]);

    //Add a "Thinking..." placeholder for the bot's response 
    setTimeout(() => setChatHistory((history) => [...history, {role: "model", text: "Thinking..."}]), 600);

    // call the funtion to gennerate the bot's reponse
    generateBotResponse([...chatHistory, {role: "user", text: userMessager }]);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..." 
            className="message-input" required />
            <button className="material-symbols-rounded">arrow_upward</button>
          </form>
  );
};

export default ChatForm;

