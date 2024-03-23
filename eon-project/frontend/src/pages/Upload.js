import React, { useRef, useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';

const Upload = (props) => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedFile(file); // Save the selected file to state
      setVideo(url);
      setFilename(file.name); // Update filename state with the selected file's name
    }
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  const handleCancel = () => { //when user cancels upload, this gets called
    setVideo(null);
    setTitle('');
    setDescription('');
    setFilename('');
    setSelectedFile(null); 
  };

  const handleUpload = () => {
    if (!selectedFile || !title || !description) {
      alert('Please fill in all fields and select a file');
      return;
    }

    const data = new FormData();
    data.append('video', selectedFile);
    data.append('title', title);
    data.append('description', description);

    fetch('http://localhost:5050/upload', {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Upload successful');
      handleCancel(); // Reset the form after successful upload
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Upload failed');
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header/>
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {video && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div className="relative w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-md">
              <FaTimes
                className="absolute top-3 right-4 cursor-pointe text-white-600 text-3xl"
                onClick={handleCancel}
              />
              <video
                className="mt-4 rounded shadow-lg mx-auto"
                width="480" 
                height="270"
                controls
                src={video}
              />
              <div className="mt-4">
                <label htmlFor="title" className="block text-lg font-semibold">Title (required)</label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-2 mt-1 bg-gray-700 border-none rounded focus:ring-2 focus:ring-red-600 outline-none"
                  placeholder="Add a title to describe your video"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block text-lg font-semibold">Description</label>
                <textarea
                  id="description"
                  className="w-full p-2 mt-1 bg-gray-700 border-none rounded focus:ring-2 focus:ring-red-600 outline-none"
                  rows="4"
                  placeholder="Tell viewers about your video"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="mt-4 text-gray-400">Filename: {filename} </div>
              
              <div className="flex items-center justify-end mt-4">
              <button
                className="flex items-center justify-center mt-4 bg-white hover:bg-opacity-50 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleUpload}
              >
                <FaUpload className="mr-2" />
                Upload
              </button>
              </div>
            </div>
          </div>
        )}
        {!video && (
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleChoose}
          >
            Upload Video
          </button>
        )}
      </div>
    </div>
  );
};

export default Upload;