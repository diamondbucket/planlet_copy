<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveBusinessInfo } from "../utils/api"; // Import the saveBusinessInfo function

export default function NewProject() {
  const navigate = useNavigate();

  // State to hold form data

  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goals, setGoals] = useState("");
  const [specialEvents, setSpecialEvents] = useState("");
  const [postingDays, setPostingDays] = useState("");

  // State for validation
  const [formError, setFormError] = useState("");

  // State for form submission success
  const [formSuccess, setFormSuccess] = useState("");

  // Handle form submission
  const handleProceedClick = async () => {
    // Check if all required fields are filled
    if (
      !businessType ||
      !targetAudience ||
      !goals ||
      !specialEvents ||
      !postingDays
    ) {
      setFormError("Please fill in all required fields.");
      setFormSuccess(""); // Clear any previous success message
    } else {
      setFormError(""); // Clear any previous error

      // Example of getting the token (replace this with actual logic to get token)
      const token = localStorage.getItem("token"); // You should replace this with actual logic to get the JWT token
      const userdata = JSON.stringify(localStorage.getItem("user"));
      const userId = userdata.id;
      console.log(userdata);

      // Prepare the business data
      const businessData = {
        userdata,
        businessType,
        targetAudience,
        goals,
        specialEvents,
        postingDays,
      };

      const businessInfo = {
        businessType,
        targetAudience,
        goals,
        specialEvents,
        postingDays,
      };

      try {
        // Call the saveBusinessInfo API function
        const response = await saveBusinessInfo(
          businessData,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzBkMzA1NDZjYjUxZjJhN2RlNTcxYSIsImlhdCI6MTczNTY0NjQ4OSwiZXhwIjoxNzM1NjUwMDg5fQ.IVf_Kf0Y9YirGh_cUNBEXOkNN6bArXd67u0d65IQeBQ"
        );

        localStorage.setItem("businessInfo", JSON.stringify(businessInfo));

        // If the API call is successful
        setFormSuccess("Business information saved successfully!");

        // Optionally, you can navigate to the next page after saving
        navigate("/calendar");
      } catch (error) {
        setFormError("Error saving business info: " + error);
        setFormSuccess(""); // Clear any previous success message
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-[#1E3A8A] text-white flex flex-col p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left text-[#F0F9FF]">
          Planlet
        </h1>
        <hr className="border-[#3B82F6] mb-6" />
        <button
          className="text-left hover:text-[#93C5FD]"
          onClick={handleProceedClick}
        >
          Proceed
        </button>
        {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
        {formSuccess && (
          <p className="text-green-500 text-sm mt-2">{formSuccess}</p>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-8">
        {/* Page Header */}
        <div className="mb-20">
          <button className="text-2xl mb-4 text-[#93C5FD] hover:text-[#A5B4FC]">
            &larr; Description
          </button>
          <h2 className="text-sm sm:text-lg font-semibold mt-9 mb-2 text-center md:text-left text-[#F0F9FF]">
            Elaborate on the primary emphasis, unique attributes, and creative
            strategies of your enterprise.
          </h2>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 ml-16 md:grid-cols-2 gap-6">
          {/* Business Type */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">Business Type</label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Retail, Technology, Food & Beverage"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Teenagers, Professionals, Fitness Enthusiasts"
            />
          </div>

          {/* Goals */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">Goals</label>
            <input
              type="text"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Increase sales, Boost engagement, Build brand awareness"
            />
          </div>

          {/* Special Events */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">
              Special Events or Themes
            </label>
            <input
              type="text"
              value={specialEvents}
              onChange={(e) => setSpecialEvents(e.target.value)}
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Holiday Sales, Product Launches, Anniversaries"
            />
          </div>

          {/* Posting Days */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">
              Number of Posting Days per Month
            </label>
            <input
              type="text"
              value={postingDays}
              onChange={(e) => setPostingDays(e.target.value)}
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., 10, 20, or 'Not sure, suggest for me'"
            />
          </div>

          {/* Optional Fields */}
          <div>
            <label className="block mb-1 text-[#F0F9FF]">
              Preferred Content Formats (Optional)
            </label>
            <input
              type="text"
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Videos, Blog Posts, Infographics"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#F0F9FF]">
              Target Geographic Area (Optional)
            </label>
            <input
              type="text"
              className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
              placeholder="e.g., Local, National, Global"
            />
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-10 flex justify-center">
          <div className="bg-[#1E3A8A] text-[#93C5FD] p-4 sm:p-6 rounded-md w-full md:w-3/4 text-center shadow-md">
            <p className="text-sm sm:text-base text-[#F0F9FF]">
              Describe your plan, and we’ll create the{" "}
              <span className="text-[#D8E1F0] font-semibold">
                perfect calendar for you.
              </span>
            </p>
=======
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
>>>>>>> 1b412fd0bd11ea9b74f71e715cb125df51fbeab0
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default NewProject;
>>>>>>> 1b412fd0bd11ea9b74f71e715cb125df51fbeab0
