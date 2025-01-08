// NewProject.js
import React, { useState } from "react";

const NewProject = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex">
      {/* Desktop Sidebar - Only visible on md and up */}
      <div className="hidden md:block w-64 min-h-screen bg-black text-white">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-xl font-semibold">Planlet</h1>
          <button className="text-white">
            <span className="text-xl">←</span>
          </button>
        </div>
        
        <nav className="p-2">
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-gray-800/50">
              <span className="text-lg">+</span>
              <span>New project</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800/30">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>Projects</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-emerald-800 via-teal-700 to-emerald-600 backdrop-blur-lg">
        {/* Header with Mobile Menu */}
        <div className="p-4 flex items-center gap-2">
          {/* Mobile Dropdown Menu */}
          <div className="md:hidden relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white p-2"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-black rounded-md shadow-lg z-50">
                <div className="p-2">
                  <h1 className="text-xl font-semibold text-white px-3 py-2">Planlet</h1>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center gap-2 p-2 rounded-md bg-gray-800/50 text-white"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="text-lg">+</span>
                      <span>New project</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800/30 text-white"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>Projects</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="text-white hover:text-gray-200">
            <span className="text-xl">←</span> New project
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-xl text-white mb-8">
            Elaborate on the primary emphasis, unique attributes, and creative strategies of your enterprise.
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="max-w-md">
                <label className="block text-white mb-2">Business Type</label>
                <input
                  type="text"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter business type"
                />
              </div>
              <div className="max-w-md">
                <label className="block text-white mb-2">Target Audience</label>
                <input
                  type="text"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter target audience"
                />
              </div>
              <div className="max-w-md">
                <label className="block text-white mb-2">Special Events or Themes</label>
                <input
                  type="text"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter special events"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="max-w-md">
                <label className="block text-white mb-2">Business Type</label>
                <input
                  type="text"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter business type"
                />
              </div>
              <div className="max-w-md">
                <label className="block text-white mb-2">Goals</label>
                <input
                  type="text"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter goals"
                />
              </div>
              <div className="max-w-md">
                <label className="block text-white mb-2">Number of Posting Days per Month</label>
                <input
                  type="number"
                  className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                  placeholder="Enter number"
                />
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="mt-8 max-w-2xl mx-auto">
            <button className="w-full bg-emerald-950/80 border border-emerald-600/30 rounded-md p-4 text-white hover:bg-emerald-800/50 transition-colors">
              Describe your plan, and we'll <span className="text-pink-400">create the perfect calendar for you</span>.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
