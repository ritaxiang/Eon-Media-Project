import Header from "../components/Header";
import { Link } from "react-router-dom";
import React from 'react';

const Homepage = () => {
    return (
    <div className="bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col">
            <Header />
            
        </div>
    </div>
  );
}

export default Homepage;
