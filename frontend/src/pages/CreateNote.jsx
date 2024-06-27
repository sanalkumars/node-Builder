// NewNoteForm.jsx
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';


const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = { title, content };
    try {
      const res = await fetch('/api/note/createnote', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate('/dashboard');
      } else {
       
        setError(data.message || 'An error occurred');
      }
      console.log(data);
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
  <div className='w-full h-full flex justify-center mt-8  ' >
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
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
    <div className=' flex items-center justify-center'> 
      <h2 className=' text-red-600'>{error}</h2>
    </div>
  </div>
  );
};

export default CreateNote;