// Notes.jsx
import React from 'react';
import NoteCard from './NoteCard'; // Adjust the import path based on your file structure

const Notes = () => {


    //  fetch the data for notes from the backend and 

    
  // Example notes data
  const notesData = [
    { id: 1, title: 'Note 1 Title', content: 'This is the content of note 1.' },
    { id: 2, title: 'Note 2 Title', content: 'This is the content of note 2.' },
    // Add more notes as needed
  ];

  return (
    <div>
      <h2>Your Notes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {notesData.map((note) => (
          <NoteCard key={note.id} title={note.title} content={note.content} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
