import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Homepage = () => {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [featuredVideo, setFeaturedVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('http://localhost:5050/videos');
            const data = await response.json();
            setVideos(data.videos);
            setFilteredVideos(data.videos);
            // Set a featured video if the list is not empty
            if (data.videos.length > 0) {
                setFeaturedVideo(data.videos[0]); // You might want to select a specific video to feature
            }
        };
        fetchVideos();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = videos.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredVideos(filtered);
    };

    const playVideo = (video) => {
        console.log('Playing video:', video.title);
    };

    return (
        <div className="bg-black text-white min-h-screen"> {/* Use font-serif for a nicer font */}
            <Header onSearch={handleSearch} />
            {/* Featured video section */}
            {featuredVideo && (
                <div className="relative h-[30rem]">
                    <img src={'https://media.cnn.com/api/v1/images/stellar/prod/170407220916-04-iconic-mountains-matterhorn-restricted.jpg?q=w_2512,h_1413,x_0,y_0,c_fill/h_618'} alt={featuredVideo.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold">{featuredVideo.title}</h2>
                            <p className="text-lg md:text-xl">{featuredVideo.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center pb-8">
                            <button 
                                onClick={() => playVideo(featuredVideo)}
                                className="text-black text-2xl px-6 py-3 bg-white hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                            >
                                <FaPlay className="inline-block mr-2" />
                                Play
                            </button>
                            <button 
                                onClick={() => console.log('More info')}
                                className="text-white text-2xl px-6 py-3 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out rounded-lg mt-4 sm:mt-0 sm:ml-4"
                            >
                                <FaInfoCircle className="inline-block mr-2" />
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}
    
            <div className="px-4 py-8">
                <h2 className="text-3xl mb-6 font-bold">Uploaded Videos</h2>
                <Carousel videos={filteredVideos} />
            </div>
        </div>
    );
};

export default Homepage;
