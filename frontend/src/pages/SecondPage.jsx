import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveBusinessInfo } from "../utils/api";

export default function NewProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessType: "",
    targetAudience: "",
    goals: "",
    specialEvents: "",
    postingDays: "",
  });

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceedClick = async () => {
    try {
      // Check if all required fields are filled
      const hasEmptyFields = Object.values(formData).some((value) => !value);

      if (hasEmptyFields) {
        setFormError("Please fill in all required fields.");
        setFormSuccess("");
        return;
      }

      // Get user data safely
      const userDataString = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!userDataString || !token) {
        throw new Error("User data or token not found");
      }

      const userData = JSON.parse(userDataString);

      if (!userData?.id) {
        throw new Error("User ID not found");
      }

      const businessData = {
        userId: userData.id,
        ...formData,
      };

      // Save to API
      await saveBusinessInfo(businessData, token);

      // Save to localStorage
      localStorage.setItem("businessInfo", JSON.stringify(formData));

      setFormSuccess("Business information saved successfully!");
      navigate("/calendar");
    } catch (error) {
      setFormError(`Error: ${error.message || "Something went wrong"}`);
      setFormSuccess("");
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
        <div className="mb-20">
          <button className="text-2xl mb-4 text-[#93C5FD] hover:text-[#A5B4FC]">
            &larr; Description
          </button>
          <h2 className="text-sm sm:text-lg font-semibold mt-9 mb-2 text-center md:text-left text-[#F0F9FF]">
            Elaborate on the primary emphasis, unique attributes, and creative
            strategies of your enterprise.
          </h2>
        </div>

        <div className="grid grid-cols-1 ml-16 md:grid-cols-2 gap-6">
          {/* Required Fields */}
          {[
            {
              name: "businessType",
              label: "Business Type",
              placeholder: "e.g., Retail, Technology, Food & Beverage",
            },
            {
              name: "targetAudience",
              label: "Target Audience",
              placeholder:
                "e.g., Teenagers, Professionals, Fitness Enthusiasts",
            },
            {
              name: "goals",
              label: "Goals",
              placeholder:
                "e.g., Increase sales, Boost engagement, Build brand awareness",
            },
            {
              name: "specialEvents",
              label: "Special Events or Themes",
              placeholder:
                "e.g., Holiday Sales, Product Launches, Anniversaries",
            },
            {
              name: "postingDays",
              label: "Number of Posting Days per Month",
              placeholder: "e.g., 10, 20, or 'Not sure, suggest for me'",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-[#F0F9FF]">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-2/3 bg-[#1E3A8A] text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="bg-[#1E3A8A] text-[#93C5FD] p-4 sm:p-6 rounded-md w-full md:w-3/4 text-center shadow-md">
            <p className="text-sm sm:text-base text-[#F0F9FF]">
              Describe your plan, and we'll create the{" "}
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
