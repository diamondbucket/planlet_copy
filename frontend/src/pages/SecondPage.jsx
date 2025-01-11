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
          </div>
        </div>
      </div>
    </div>
  );
}
