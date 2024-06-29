import React, { useEffect, useState } from 'react';

const Notes = () => {
  const [notesData, setNotesData] = useState([]);
  const [error, setError] = useState('');
  const [editNote, setEditNote] = useState(null); 
  const [success, setSuccess] = useState();

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

  const openEditPopup = (note) => {
    setEditNote(note);
    // Additional logic to open a modal or handle edit popup visibility
  };

  const closeEditPopup = () => {
    setEditNote(null);
    // Additional logic to close the modal or handle edit popup visibility
  };

  const handleEditSubmit = async (editedNote) => {
    try {
      const response = await fetch(`/api/note/updateNote/${editedNote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedNote),
      });

      if (response.ok) {

        setNotesData((prevNotes) =>
          prevNotes.map((note) => (note._id === editedNote._id ? editedNote : note))
        );
        setSuccess('Note updated successfully!');
        setTimeout(() => closeEditPopup(), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update note');
      }
    } catch (error) {
      setError('An error occurred while updating the note');
    }
  };

  return (
    <div className='w-full h-3/5 flex flex-col items-center '>
      <h2 className='text-2xl font-bold mb-4'>Your Notes</h2>
      {error && <p className='text-red-500'>{error}</p>}
      {notesData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
          {notesData.map((note) => (
            <div key={note._id} className='bg-white p-4 rounded-lg shadow-md w-full flex flex-col'>
              <h3 className='text-xl font-semibold'>{note.title}</h3>
              <p className='mt-2 flex-grow'>{note.content}</p>
              <div className='flex justify-evenly px-3 mx-6'>
                <button onClick={() => openEditPopup(note)} className='px-10 border-2 border-e-pink-400 rounded-xl hover:bg-blue-500'>
                  Edit
                </button>
                <button onClick={() => deleteNote(note._id)} className='px-10 border-2 border-e-pink-400 rounded-xl hover:bg-red-600'>
                  Delete
                </button>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <p>You have no notes</p>
      )}

      {/* Edit Popup or Modal */}
      {editNote && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Edit Note</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editNote);
              }}
            >
              <label htmlFor='editTitle' className='block mb-2'>
                Title:
                <input
                  type='text'
                  id='editTitle'
                  className='border rounded-md px-3 py-2 w-full mt-1'
                  value={editNote.title}
                  onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                />
              </label>
              <label htmlFor='editContent' className='block mb-4'>
                Content:
                <textarea
                  id='editContent'
                  className='border rounded-md px-3 py-2 w-full mt-1'
                  value={editNote.content}
                  onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                />
              </label>
              {success && <p className='text-green-500 mb-4'>{success}</p>}
              <div className='flex justify-end'>
                <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                  Save
                </button>
                <button type='button' onClick={closeEditPopup} className='ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400'>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
