import React, { useEffect, useState } from 'react';

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
  }, [notesData]);


  const deleteNote = async (noteId) => {
   
    try {
      const response = await fetch(`/api/note/deleteNote/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotesData((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete note');
      }
    } catch (error) {
      setError('An error occurred while deleting the note');
    }
  };

  return (
    <div className='w-full h-3/5 flex flex-col items-center '>
      <h2 className='text-2xl font-bold mb-4'>Your Notes</h2>
      {error && <p className="text-red-500">{error}</p>}
      {notesData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
          {notesData.map((note) => (
            <div key={note.id} className='bg-white p-4 rounded-lg shadow-md w-full flex flex-col'>
              <h3 className='text-xl font-semibold'>{note.title}</h3>
              <p className='mt-2 flex-grow'>{note.content}</p>
              <div className='flex  justify-evenly px-3 mx-6'>
              <button className='px-10 border-2 border-e-pink-400 rounded-xl hover:bg-blue-500'>Edit</button>
              <button  onClick={() => deleteNote(note._id)} className='px-10 border-2 border-e-pink-400 rounded-xl hover:bg-red-600'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no notes</p>
      )}
    </div>
  );
};

export default Notes;
