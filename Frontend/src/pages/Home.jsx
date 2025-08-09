import React from 'react';
import backgroundImage from '../assets/background.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="h-screen w-full flex flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Top Logo */}
      <div className="p-8">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">
          TripMate
        </h1>
      </div>

      {/* Glassmorphism Card */}
      <div className="bg-white/40 backdrop-blur-md shadow-lg p-8 rounded-t-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Get Started with TripMate
        </h2>
        <p className="text-gray-700 mb-6">
          Your journey begins here. Let’s make travel easier, safer, and more
          enjoyable.
        </p>
        <Link
          to="/login"
          className="block w-full text-center bg-black/80 hover:bg-black transition text-white font-semibold py-3 rounded-lg text-lg shadow-md"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;