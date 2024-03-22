import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa'; // Make sure to install react-icons

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-64 h-36" // Set your desired width and height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <button className="p-2 rounded-full bg-red-600">
            <FaPlay className="text-white" />
          </button>
          {/* Assuming video.preview is the video preview component */}
          {video.preview} 
        </div>
      )}
    </div>
  );
};

export default VideoCard;
