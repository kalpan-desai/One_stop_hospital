import React, { useState } from 'react';
import { AppFooter, AppHeader } from '../../../components/index';
import {
  CFormInput, CButton, CCard, CCardBody, CCardTitle, CCardText
} from '@coreui/react';
import withAdminAuth from '../admin/withAdminAuth';
import withPatientAuth from '../patient/withPatientAuth';
import PatientSidebar from '../../../components/PatientSidebar';

const LLMDiseasePred = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    if (inputValue.trim() !== '') {
      // Create a new user message
      const userMessage = { role: 'user', content: inputValue };

      // Update message history with the new user message
      const updatedMessages = [...messages, { sender: 'YOU', text: inputValue }];
      setMessages(updatedMessages);
      console.log(updatedMessages);
      try {
        const response = await fetch('http://127.0.0.1:5000/LLMchatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: inputValue,
            conversation_history: updatedMessages.map((msg) => ({
              role: msg.sender === 'YOU' ? 'user' : 'assistant',
              content: msg.text,
            })),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Add bot response to the messages array
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'Bot', text: data.response },
          ]);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Clear the input field
      setInputValue('');
    }
  };

  const formatMessageText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return <span key={index}>{part.slice(1, -1)}<br /></span>;
      }
      return part;
    });
    return <span>{parts}</span>;
  };

  return (
    <div>
      <PatientSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="container mt-4">
          {messages.map((message, index) => (
            <CCard key={index} className="mb-3">
              <CCardBody>
                <CCardTitle>{message.sender}</CCardTitle>
                <CCardText>{formatMessageText(message.text)}</CCardText>
              </CCardBody>
            </CCard>
          ))}
        </div>
        <div style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '10px',
          boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            maxWidth: '600px'
          }}>
            <CFormInput
              type="text"
              placeholder="Input your Health Queries"
              aria-label="Health Queries Input"
              value={inputValue}
              onChange={handleInputChange}
              style={{
                flex: 1,
                marginRight: '10px'
              }}
            />
            <CButton color="primary" style={{ flexShrink: 0 }} onClick={handleButtonClick}>Submit</CButton>
          </div>
        </div>
      </div>
      <AppFooter style={{ marginTop: 'auto' }} />
    </div>
  );
};

export default withPatientAuth(LLMDiseasePred);