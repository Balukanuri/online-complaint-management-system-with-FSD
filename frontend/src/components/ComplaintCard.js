// src/components/ComplaintCard.js
import React from 'react';

const ComplaintCard = ({ complaint }) => {
  return (
    <div style={{
      border: '1px solid #ccc', padding: '12px', margin: '10px 0', borderRadius: '8px'
    }}>
      <h4>{complaint.type}</h4>
      <p><strong>Description:</strong> {complaint.description}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default ComplaintCard;
