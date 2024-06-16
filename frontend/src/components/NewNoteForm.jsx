// NewNoteForm.jsx
import React, { useState } from 'react';

const NewNoteForm = ({ onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() ||!content.trim()) return; // Simple validation
    onCreateNote(title, content); // Corrected to pass two separate arguments
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4">Create a New Note</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full p-2 mb-4 border border-gray-300 rounded resize-none h-32"
      ></textarea>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Create Note
      </button>
    </form>
  );
};

export default NewNoteForm;
