import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const aiMessage = { sender: 'ai', text: response.data.reply };
      setMessages([...messages, userMessage, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <div style={{ cursor: 'pointer' }} onClick={toggleChatbox}>
        {isOpen ? <AiOutlineClose size={24} /> : 'Chat'}
      </div>
      {isOpen && (
        <div style={{
          width: '300px', height: '400px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ padding: '10px', overflowY: 'auto', height: '350px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
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
              style={{ flex: 1, marginRight: '10px', padding: '5px' }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
