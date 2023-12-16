import React from 'react';
import Typewriter from 'typewriter-effect'; // You may need to install this package

const TestType = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Container */}
      <div className="lg:w-1/2 bg-gray-200 p-8">
        {/* Content Box */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-bold mb-2">Content Box</h2>
          <p>Your content goes here.</p>
        </div>

        {/* Typing Animation */}
        <div className="text-gray-800">
          <Typewriter
            options={{
              strings: ['Typing Animation...'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      {/* Right Container */}
      <div className="lg:w-1/2">
        {/* Image */}
        <div className="hidden lg:block">
          <img
            src="./../public/logo512.png"
            alt="Your Image"
            className="w-full h-auto"
          />
        </div>

        {/* Image Below Content on Small Screens */}
        <div className="lg:hidden">
          <img
            src="./../public/logo512.png"
            alt="Your Image"
            className="w-full h-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default TestType;

