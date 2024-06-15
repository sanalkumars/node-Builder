// NoteCard.jsx
import React from 'react';

const NoteCard = ({ title, content }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '8px' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default NoteCard;
