import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/netflixNew.png"; // Ensure this is the Netflix logo or similar for your application
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

const Header = () => {
  const [state, setState] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input

  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search logic
    setShowSearch(false);
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
        <div className="flex items-center max-w-screen-xl py-4 pl-2">
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
      {!showSearch && (
        <button onClick={() => setShowSearch(true)} className="z-30">
          <FaSearch className="text-white text-2xl" />
        </button>
      )}
      {showSearch && (
        <form ref={searchRef} onSubmit={handleSearch} className="flex absolute right-0 top-full">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 leading-none text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {/* Hidden submit button, you can remove this if you want to handle search on input change */}
          <button type="submit" className="hidden">
            Search
          </button>
        </form>
      )}
    </div>


          {/* Mobile menu toggle button */}
          <div>
            <button
              className="text-white hover:text-gray-300 md:hidden"
              onClick={() => setState(!state)}
            >
              {/* Your SVG toggle code */}
            </button>
          </div>
        </div>
        {/* Rest of your nav menu code */}
      </nav>
      {state && (
        <div
          className="z-10 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm md:hidden"
          onClick={() => setState(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
