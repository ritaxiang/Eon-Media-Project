import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import { FaUpload, FaTimes } from 'react-icons/fa';

const Upload = (props) => {
  const inputRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filename, setFilename] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setVideo(url);
    setFilename(file.name); // Update filename state with the selected file's name
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  const handleCancel = () => {
    setVideo(null);
    setTitle('');
    setDescription('');
    setFilename(''); // Reset filename state when canceling
  };

  const handleUpload = () => {
    // Logic for uploading video goes here
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
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
                width="480" // Adjust width as desired
                height="270" // Adjust height as desired
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
              
              <div className="mt-4 text-gray-400">Filename: {filename}</div> {/* Display filename */}
              
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
