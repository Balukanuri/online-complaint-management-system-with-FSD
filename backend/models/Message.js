import React from 'react';

const Message = ({ message, isSender }) => {
  const messageStyle = {
    maxWidth: '60%',
    marginBottom: '8px',
    padding: '10px 14px',
    borderRadius: '20px',
    backgroundColor: isSender ? '#DCF8C6' : '#FFF',
    alignSelf: isSender ? 'flex-end' : 'flex-start',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isSender ? 'flex-end' : 'flex-start',
  };

  const timestampStyle = {
    fontSize: '0.7rem',
    color: '#888',
    marginTop: '2px',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        {message.text}
      </div>
      <span style={timestampStyle}>
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Message;
