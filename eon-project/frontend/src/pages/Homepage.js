import Header from "../components/Header";
import { Link } from "react-router-dom";
import React from 'react';

const Homepage = () => {
  
  
  
  
  
    return (
    <div className="flex flex-col">
        <Header />
        <div className="mt-[68px]"> {/* Adjust this value based on the actual height of your header */}
            {/* Your homepage content goes here. For example: */}
            <section className="max-w-4xl mx-auto px-4">
                <h1 className="text-2xl font-bold mb-4">Welcome to Our Site!</h1>
                {/* More content and components */}
            </section>
        </div>
    </div>
  );
}

export default Homepage;
