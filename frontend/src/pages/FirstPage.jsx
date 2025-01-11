import React from "react";
import TrafficLight from "../assets/traffic_light.png";
import Pigeon from "../assets/pigeon.png";

const FirstPage = () => {
  return (
    <div className="min-h-screen bg-[#42e3ff] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top Navigation */}

      {/* Hero Section */}
      <main className="text-center px-6 sm:px-12">
        <h1 className="text-6xl sm:text-8xl font-funky text-black mb-4 tracking-wide">
          planlet
          <span className="inline-block rotate-12 text-yellow-400">★</span>
        </h1>
        <p className="text-lg sm:text-xl text-black mb-8">
          Plan. Create. Post. Simplify Your Content Strategy.
        </p>

        {/* Generate Button */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-2xl px-6 py-3 rounded-md transition-all duration-300 shadow-lg">
          GENERATE
        </button>
      </main>

      {/* Bottom Decorative Elements */}
      <div>
        {/* Traffic Light */}
        <img
          src={TrafficLight}
          alt="Traffic Light"
          className="absolute"
          style={{
            width: "632px",
            height: "561px",
            top: "-174px",
            left: "-108px",
          }}
        />

        {/* Pigeon */}
        <img
          src={Pigeon}
          alt="Pigeon"
          className="absolute"
          style={{
            width: "381px",
            height: "411px",
            top: "256px",
            left: "74px",
          }}
        />

        {/* Left Illustration */}
        <img
          src="https://via.placeholder.com/200" // Replace with actual asset
          alt="Bird Illustration"
          className="absolute bottom-10 left-0 w-32 sm:w-48"
        />

        {/* Right Illustration */}
        <img
          src="https://via.placeholder.com/200" // Replace with actual asset
          alt="Girl Illustration"
          className="absolute bottom-10 right-0 w-32 sm:w-48"
        />

        {/* CCTV Camera */}
        <img
          src="https://via.placeholder.com/150" // Replace with actual asset
          alt="CCTV Camera"
          className="absolute top-16 right-4 w-20 sm:w-28"
        />

        {/* Decorative Flowers */}
        <div className="absolute bottom-0 left-0 w-32 sm:w-48">🌸</div>
        <div className="absolute bottom-0 right-0 w-32 sm:w-48">🌼</div>
      </div>
    </div>
  );
};

export default FirstPage;
