import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { openAIChatWrapper } from "../../services/ApiRequest";

// Define types for messages
interface Message {
  sender: 'user' | 'ai' | 'error';
  text: string;
}

const Chatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleChatbox = () => {
    if (!isOpen) {
      const initialMessage: Message = { sender: 'ai', text: 'Hi! I am ChatBot assistant, how can I help you today?' };
      setMessages([initialMessage]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;
  
    const userMessage: Message = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
  
    try {
      setIsLoading(true);
      const aiResponse = await openAIChatWrapper(input);
      setIsLoading(false);
  
      const aiMessage: Message = {
        sender: 'ai',
        text: aiResponse || 'No response from AI', // Provide a default value if aiResponse is undefined
      };
      setMessages([...messages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...messages, { sender: 'error', text: 'An error occurred.' }]);
    }
    setInput('');
  };
  

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <div
        style={{
          cursor: 'pointer',
          backgroundColor: 'black',
          borderRadius: '50%',
          color: 'white',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={toggleChatbox}
      >
        {isOpen ? <AiOutlineClose size={24} /> : 'Chat'}
      </div>
      {isOpen && (
        <div
          style={{
            width: '300px',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            background: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ padding: '10px', overflowY: 'auto', height: '350px', color: 'black' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', color: 'black' }}
              >
                <p style={{ margin: 0 }}>{msg.text}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px', display: 'flex' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{ flex: 1, marginRight: '10px', padding: '5px', color: 'white', backgroundColor: 'black' }}
              id="chatInput"
              name="chatInput"
            />
            <button onClick={sendMessage} disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
