import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { useGetVideos } from "../hooks/query";
import YouTube from 'react-youtube';


const VideoPreview = ({ video }) => {
    const videoId = video.url.split('/')[3];
    return (
        <div className="video-preview">
            <h3>{video.title}</h3>
            <img src={video.thumbnail} alt={`${video.title} thumbnail`} />
            <YouTube videoId={videoId} opts={{ width: '100%', height: '700px', }} /> 
        </div>
    );
};

const Homepage = () => {
    // Dummy data for videos before connecting to backend (will remove after)
    const [videos] = useState([
        {
            id: 1,
            title: 'Celebrity',
            thumbnail: 'path_to_celebrity_thumbnail.jpg',
            url: 'https://youtu.be/L_HPLvZbfiU?si=Lzg1tHcnDX7BoE32',
        },
        {
            id: 2,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/L_HPLvZbfiU?si=Lzg1tHcnDX7BoE32',
        },
        {
            id: 3,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        {
            id: 4,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        {
            id: 5,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        {
            id: 6,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        {
            id: 7,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        {
            id: 8,
            title: 'Doctor Slump',
            thumbnail: 'path_to_doctor_slump_thumbnail.jpg',
            url: 'https://youtu.be/PSN2wXYoQx8?si=bKGVjqZOWUoeRBrw',
        },
        // Add more video objects here...
    ]);


    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVideos, setFilteredVideos] = useState(videos);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const getRandomVideo = (videosArray) => {
        return videosArray[Math.floor(Math.random() * videosArray.length)];
    };

    useEffect(() => {
        // Update the selected video when the component mounts or videos change
        setSelectedVideo(getRandomVideo(videos));
    }, [videos]);

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
                {selectedVideo && <VideoPreview video={selectedVideo} />}
                
                <div className="my-8">
                    <h2 className="text-2xl mb-4">Uploaded Videos</h2>
                    {/* Pass the filtered videos to the Carousel */}
                    <Carousel videos={filteredVideos} />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
