import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CalendarLayout = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [calendarDays, setCalendarDays] = useState([]);
  const [contentPlan, setContentPlan] = useState([]); // New state for content plan
  const navigate = useNavigate();

  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const storedBusinessInfo = localStorage.getItem("businessInfo");
    if (storedBusinessInfo) {
      try {
        const parsedInfo = JSON.parse(storedBusinessInfo);
        setBusinessInfo(parsedInfo);
        console.log("Business Info:", parsedInfo);
      } catch (error) {
        console.error("Error parsing businessInfo from localStorage:", error);
      }
    }
  }, []);

  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const chunk = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  useEffect(() => {
    generateCalendarDays();
  }, []);

  const ContentDetails = ({ content }) => (
    <div className="bg-sky-100 p-2 rounded-lg mt-2 shadow-sm">
      <h4 className="font-medium text-gray-800">{content.contentType}</h4>
      <p className="text-sm text-gray-600">{content.content}</p>
      <div className="mt-1 flex gap-2">
        <span className="text-xs bg-sky-200 px-2 py-1 rounded">
          {content.theme}
        </span>
        <span className="text-xs bg-green-200 px-2 py-1 rounded">
          {content.goal}
        </span>
      </div>
    </div>
  );

  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysBeforeMonth = firstDay.getDay();
    const totalDays = lastDay.getDate();

    let days = [];

    for (let i = 0; i < daysBeforeMonth; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    const totalCells = Math.ceil(days.length / 7) * 7;

    while (days.length < totalCells) {
      days.push({ date: null, isCurrentMonth: false });
    }

    setCalendarDays(days);
  };

  const Sidebar = () => (
    <div className="bg-fuchsia-400 w-20 md:w-32 flex flex-col space-y-6 p-4 h-screen fixed left-0 shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="text-black hover:bg-fuchsia-300 rounded p-2 transition-colors duration-200"
      >
        <span className="text-xl">←</span>
      </button>
      <div className="space-y-4 text-gray-800">
        {["Profile", "Notes", "Connect", "Saved"].map((item) => (
          <Link
            to={`/${item.toLowerCase()}`}
            key={item}
            className="block cursor-pointer hover:bg-fuchsia-300 p-2 rounded transition-all duration-200 transform hover:scale-105"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );

  const Header = () => {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className="flex justify-between items-center p-4 bg-sky-200">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Planlet*</h1>
          <div className="ml-4">
            <svg viewBox="0 0 100 100" className="w-12 h-12 animate-spin-slow">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="#98FB98"
                className="drop-shadow-md"
              />
              <circle cx="50" cy="50" r="15" fill="#FFD700" />
            </svg>
          </div>
        </div>
        <div className="text-lg font-medium text-gray-700">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
            Hi! {JSON.parse(localStorage.getItem("user"))?.name || "Guest"}
          </div>
        </div>
      </div>
    );
  };

  const CalendarGrid = () => {
    const getContentForDate = (day) => {
      if (!day.fullDate) return null;
      const dateStr = day.fullDate.toISOString().split("T")[0];
      return contentPlan.find((post) => post.date === dateStr);
    };

    return (
      <div className="mx-4 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {days.map((day) => (
                <th
                  key={day}
                  className="p-4 text-left border-b border-gray-200 bg-white text-gray-600 font-medium"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chunk(calendarDays, 7).map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td
                    key={`${weekIndex}-${dayIndex}`}
                    className={`border-r border-b border-gray-100 p-4 h-32 align-top cursor-pointer 
                      transition-colors duration-200
                      ${!day.isCurrentMonth ? "bg-gray-50" : "hover:bg-sky-50"}
                      ${getContentForDate(day) ? "bg-sky-50" : ""}`}
                    onClick={() =>
                      day.isCurrentMonth && setSelectedDate(day.date)
                    }
                  >
                    {day.isCurrentMonth && (
                      <>
                        <div className="font-medium text-gray-700">
                          {day.date}
                        </div>
                        {selectedDate === day.date &&
                          getContentForDate(day) && (
                            <ContentDetails content={getContentForDate(day)} />
                          )}
                        {!selectedDate && getContentForDate(day) && (
                          <div className="bg-green-100 w-2 h-2 rounded-full mt-1" />
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const PromptBox = () => {
    const [promptExpanded, setPromptExpanded] = useState(false);
    const [tempInput, setTempInput] = useState("");
    const [summary, setSummary] = useState(""); // State to store summary

    const handleExpandToggle = () => {
      setPromptExpanded((prevState) => !prevState);
    };

    const handleSubmit = async () => {
      if (tempInput.trim() === "") return;

      try {
        const response = await fetch("http://127.0.0.1:5000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: tempInput,
            businessType: businessInfo.businessType,
            targetAudience: businessInfo.targetAudience,
            goals: businessInfo.goals,
            postingDays: businessInfo.postingDays,
            specialEvents: businessInfo.specialEvents,
            contentFormats: "Mixed",
            geographicArea: "Global",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit");
        }

        const data = await response.json();
        setContentPlan(data.posts); // Update content plan
        setSummary(data.summary); // Store summary in state
        setTempInput("");
        setPromptExpanded(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };

    return (
      <div
        className={`fixed bottom-8 left-0 right-0 mx-auto bg-white p-4 rounded-lg shadow-lg transition-all duration-300 ${
          promptExpanded ? "h-64" : "h-20"
        } w-11/12 md:w-2/3 lg:w-1/2`}
      >
        <textarea
          className="w-full h-10 p-2 border rounded-md resize-none focus:outline-none"
          placeholder="Enter your prompt..."
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={promptExpanded} // Disable input if showing summary
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handleSubmit}
          disabled={promptExpanded} // Disable button if showing summary
        >
          Submit
        </button>
        <button
          className="text-sm text-gray-500 underline mt-2 ml-4"
          onClick={handleExpandToggle}
        >
          {promptExpanded ? "Collapse" : "Expand"}
        </button>

        {promptExpanded && summary && (
          <div className="mt-4 p-2 bg-gray-100 rounded-md shadow-sm overflow-y-auto h-32">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-sm">{summary}</p>
          </div>
        )}
      </div>
    );
  };

  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
  `;
  document.head.appendChild(style);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300">
      <Sidebar />
      <div className="ml-20 md:ml-32">
        <Header />
        <main className="pt-4 pb-32">
          <CalendarGrid />
        </main>
        <PromptBox />
      </div>
    </div>
  );
};

export default CalendarLayout;
