import React, { useEffect, useState } from 'react';
import NoteCard from './NoteCard'; // Adjust the import path based on your file structure

const Notes = () => {
  const [notesData, setNotesData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/note/getNotes', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setNotesData(data.notes);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch notes');
        }
      } catch (error) {
        setError('An error occurred while fetching notes');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
    <h2>Your Notes</h2>
    {error && <p className="text-red-500">{error}</p>}
    {notesData.length > 0 ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {notesData.map((note) => (
          <NoteCard key={note._id} title={note.title} content={note.content} />
        ))}
      </div>
    ) : (
      <p>Create your note first</p>
    )}
  </div>
  );
};

export default Notes;
