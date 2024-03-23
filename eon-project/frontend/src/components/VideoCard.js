import React, { useRef, useEffect, useState } from 'react';

const VideoCard = ({ video }) => {
  const videoRef = useRef(null); 
  const [isHovered, setIsHovered] = useState(false);


  // Use useEffect to handle the play and pause based on hover state
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]); // Depend on isHovered to trigger play or pause

  const videoSrc = `http://localhost:5050/video/${encodeURIComponent(video.filename)}`;

  return (
    <div
      className="relative w-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video element with poster attribute for the thumbnail */}
      <div className="h-36 overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          muted
          poster={video.thumbnail}
        ></video>
      </div>

      {!isHovered && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Title and Description */}
      <div className="px-2 py-2 bg-gray-900 bg-opacity-80">
        <h3 className="text-white text-lg font-bold">{video.title}</h3>
        <p className="text-white text-sm">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
