import React from 'react';
import { useState } from 'react';
import Header from "../components/Header";
import Carousel from "../components/Carousel"; // Ensure this is created as described
import { Link } from "react-router-dom";

const Homepage = () => {
    // Dummy data for videos
    const [videos] = useState([
        {
            id: 1,
            title: 'Celebrity',
            thumbnail: 'path_to_celebrity_thumbnail.jpg',
        },
        {
            id: 2,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 3,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 4,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 5,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 6,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 7,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        {
            id: 8,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
        },
        // Add more video objects here...
    ]);


    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVideos, setFilteredVideos] = useState(videos);

    // This function is called when a search is performed
    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = videos.filter(video =>
            video.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredVideos(filtered);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header onSearch={handleSearch} />
            <div className="flex flex-col">
                <div className="my-8">
                    <h2 className="text-2xl mb-4">Uploaded Videos</h2>
                    {/* Pass the filtered videos to the Carousel */}
                    <Carousel videos={filteredVideos} />
                </div>
                {/* You can repeat the Carousel component for different video categories */}
            </div>
        </div>
    );
}

export default Homepage;
