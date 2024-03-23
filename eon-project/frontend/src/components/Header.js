import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/netflixNew.png";
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Header = (onSearch) => {
  const [value, setValue] = useState("");
  const [state, setState] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
  const [videos, setVideos] = useState([]); // State to hold search results
  const [currentVideoSrc, setCurrentVideoSrc] = useState(""); // State for the video source URL
  const searchRef = useRef(null);


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5050/video/search/${searchQuery}`);
      setVideos(response.data.videos || []); // Update search results
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }
  };

  const handleVideoSelect = (filename) => {
    const encodedFilename = encodeURIComponent(filename);
    const videoUrl = `http://localhost:5050/video/${encodedFilename}`;
    setCurrentVideoSrc(videoUrl); // Update the video source URL state
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    if (showSearch) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSearch]);
  

  return (
    <>
      <nav className="relative z-20 text-white bg-black w-full">
        <div className="flex items-center max-w-screen-xl py-1 pl-2">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Netflix Logo" className="h-20" />
            </Link>
            {/* Upload Button */}
            <Link to="/" className="text-white px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
            <Link to="/upload" className="text-white px-4 py-2 hover:bg-gray-700 rounded">Upload</Link>
          </div>
          
          {/* Ensuring search and other items are pushed to the edges */}
          <div className="flex-1"></div>
          
          <div className="relative">
  <button 
    onClick={() => setShowSearch(!showSearch)} 
    className="z-30">
    <FaSearch className="text-white text-2xl" />
  </button>
  {showSearch && (
    <form onSubmit={handleSearch} className="flex absolute right-8 top-1 mt-[-10px] items-center"> 
      <div className="flex items-center border border-gray-300">
        <FaSearch className="text-gray-500 mx-2" />
        <input
          type="text"
          placeholder="Enter video title"
          className="p-2 leading-none text-black focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </form>
  )}
</div>

          <div>
            <button
              className="text-white hover:text-gray-300 md:hidden"
              onClick={() => setState(!state)}
            >
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-xl mx-auto px-2 py-4">
                {videos.map((video) => (
                    <div key={video._id || video.filename} onClick={() => handleVideoSelect(video.filename)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                        {video.title}
                    </div>
                ))}
                {currentVideoSrc && (
                    <video controls width="100%" key={currentVideoSrc} style={{ marginTop: '20px' }}>
                        <source src={currentVideoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
    </>
  );
};

export default Header;
