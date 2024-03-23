import React, { useRef } from 'react';
import VideoCard from './VideoCard';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Carousel = ({ videos }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); 
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); 
    }
  };

  return (
    <div className="relative flex items-center overflow-hidden">
      <button
        className="absolute left-0 z-10"
        onClick={() => scroll('left')}
      >
        <IoIosArrowBack className="text-white text-3xl" />
      </button>

      <div className="flex overflow-x-scroll scroll-smooth whitespace-nowrap" ref={scrollRef}>
        {videos.map(video => (
          <div key={video.id} className="inline-block px-2">
            <VideoCard video={video} />
          </div>
        ))}
      </div>

      <button
        className="absolute right-0 z-10"
        onClick={() => scroll('right')}
      >
        <IoIosArrowForward className="text-white text-3xl" />
      </button>
    </div>
  );
};

export default Carousel;
