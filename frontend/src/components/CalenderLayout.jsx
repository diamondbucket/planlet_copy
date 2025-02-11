// planlet_copy/frontend/src/components/CalenderLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import Icon Libraries if used (e.g., Heroicons)
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

const CalendarLayout = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [summary, setSummary] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthlyContentPlan, setMonthlyContentPlan] = useState(() => {
    const stored = sessionStorage.getItem("monthlyContentPlan");
    return stored ? JSON.parse(stored) : {};
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState(null);
  const [expandedDate, setExpandedDate] = useState(null);
  const [mobileExpandedDate, setMobileExpandedDate] = useState(null); // New state for mobile expansion
  const username = JSON.parse(localStorage.getItem("user"))?.name || "Guest";

  useEffect(() => {
    sessionStorage.setItem("monthlyContentPlan", JSON.stringify(monthlyContentPlan));
  }, [monthlyContentPlan]);

  useEffect(() => {
    const storedBusinessInfo = localStorage.getItem("businessInfo");
    if (storedBusinessInfo) {
      try {
        const parsedInfo = JSON.parse(storedBusinessInfo);
        setBusinessInfo(parsedInfo);
      } catch (error) {
        console.error("Error parsing businessInfo from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const loadContentPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/content-plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const contentPlans = await response.json();
          const formattedPlans = contentPlans.reduce((acc, plan) => {
            const date = new Date(plan.date);
            const monthKey = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            acc[monthKey] = acc[monthKey] || [];
            acc[monthKey].push({
              date: date.toISOString(),
              content: plan.content,
            });
            return acc;
          }, {});

          setMonthlyContentPlan(formattedPlans);
        }
      } catch (error) {
        console.error("Error loading content plans:", error);
      }
    };

    loadContentPlans();
  }, []);

  const saveContentToDB = async (posts) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/content-plans", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ posts }),
      });

      if (!response.ok) throw new Error("Failed to save content");
      const responseData = await response.json();
      return responseData.contentPlan;
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    }
  };

  const previousMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chunk = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysBeforeMonth = firstDay.getDay(); // Days to fill before month starts
    const totalDays = lastDay.getDate(); // Total days in current month

    let days = [];

    // Fill days before current month
    for (let i = 0; i < daysBeforeMonth; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    // Fill days of the current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      });
    }

    // Fill extra days to complete the last week
    const totalCells = Math.ceil(days.length / 7) * 7;
    while (days.length < totalCells) {
      days.push({ date: null, isCurrentMonth: false });
    }

    setCalendarDays(days);
  };

  const getContentForDate = (date) => {
    if (!date) return null;

    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const monthContent = monthlyContentPlan[monthKey];

    if (!monthContent) return null;

    return monthContent.find((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getDate() === date.getDate() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const CalendarCell = ({ day }) => {
    const content = getContentForDate(day.fullDate);
    const isExpanded = expandedDate === day.fullDate?.toISOString();
    const hasContent = content && content.content;

    return (
      <td
        className={`
          relative p-2 sm:p-3 align-top border-r border-b border-gray-200 
          h-24 sm:h-32 
          ${!day.isCurrentMonth ? "bg-gray-50" : "bg-white hover:bg-gray-100"}
          ${expandedDate === day.fullDate?.toISOString() ? "bg-gray-200" : ""}
          transition-colors duration-200
        `}
        onClick={() => {
          if (window.innerWidth < 640) {
            setMobileExpandedDate(day.fullDate);
          } else {
            setExpandedDate(isExpanded ? null : day.fullDate?.toISOString());
          }
        }}
      >
        {day.isCurrentMonth && (
          <div className="h-full flex flex-col">
            <div className="font-medium text-gray-700 mb-1 flex justify-between items-center">
              <span>{day.date}</span>
              {hasContent && (
                <span
                  className="
                    inline-block w-6 h-6 rounded-full ml-1
                    relative before:absolute before:inset-0 before:rounded-full
                    before:bg-current before:opacity-30 before:animate-rainbow-pulse
                    after:absolute after:inset-0 after:rounded-full after:bg-current 
                    after:opacity-70 after:blur-[2px] after:animate-rainbow-pulse
                    shadow-lg shadow-current/30 animate-feather-pulse
                  "
                  style={{ filter: 'url(#feather-filter)' }}
                ></span>
              )}
            </div>
            
            {isExpanded && day.fullDate && content && (
              <div className="flex-1 overflow-y-auto text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-700 mb-2">{content.content}</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        content.contentType === 'video' 
                          ? 'bg-red-100 text-red-800'
                          : content.contentType === 'image'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {content.contentType}
                      </span>
                      <span className="text-xs text-gray-500 italic">
                        {content.theme}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </td>
    );
  };

  const CalendarGrid = () => (
    <div className="overflow-x-auto pb-4">
      <svg className="hidden">
        <filter id="feather-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </svg>
      <table className="w-full">
        <thead className="hidden sm:table-header-group">
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="text-sm sm:text-base p-2 text-gray-500">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sm:border-t border-gray-200">
          {chunk(calendarDays, 7).map((week, weekIndex) => (
            <tr key={weekIndex} className="grid grid-cols-7 gap-1 sm:table-row">
              {week.map((day, dayIndex) => (
                <CalendarCell key={`${weekIndex}-${dayIndex}`} day={day} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {/* Hamburger Button for Mobile */}
        <button
          className="sm:hidden absolute top-4 left-4 z-30 text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Sidebar */}
        <div
          className={`
            bg-fuchsia-400 w-20 md:w-32 flex flex-col space-y-6 p-4 h-screen fixed left-0 top-0 transform
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            sm:translate-x-0 transition-transform duration-300 z-20 shadow-lg
          `}
        >
          <button
            onClick={() => navigate(-1)}
            className="text-black hover:bg-fuchsia-300 rounded p-2 transition-colors duration-200"
          >
            <span className="text-xl">←</span>
          </button>
          <div className="space-y-4 text-gray-800">
            {["Profile", "Notes"].map((item) => (
              <Link
                to={`/${item.toLowerCase()}`}
                key={item}
                className="block cursor-pointer hover:bg-fuchsia-300 p-2 rounded transition-all duration-200 transform hover:scale-105"
              >
                {item}
              </Link>
            ))}
          </div>
          {/* User Greeting for Larger Screens */}
          <div className="mt-auto hidden sm:block">
            <div className="bg-green-100 px-6 py-2 rounded-full shadow-sm">
              Hi! {username}
            </div>
          </div>
        </div>

        {/* User Greeting for Mobile: Positioned Top Right */}
        {isOpen && (
          <div className="fixed top-4 right-4 sm:hidden z-30">
            <div className="bg-green-100 px-4 py-2 rounded-full shadow-sm">
              Hi! {username}
            </div>
          </div>
        )}

        {/* Overlay when Sidebar is open on Mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 sm:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </>
    );
  };

  const Header = () => {
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-3 sm:space-y-0 p-4 bg-sky-200 rounded-b-lg">
        {/* Title and Spinner */}
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Planlet*</h1>
          <div className="ml-4">
            <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-12 sm:h-12 animate-spin-slow">
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

        {/* Navigation and Month Display */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="flex items-center justify-center px-3 py-1 bg-sky-300 hover:bg-sky-400 rounded-lg transition-colors duration-200 text-gray-700 text-sm sm:text-base"
            >
              {/* Optional: Use Icons */}
              {/* <ChevronLeftIcon className="w-4 h-4 sm:hidden" /> */}
              <span className="hidden sm:inline">Previous</span>
              <svg
                className="w-4 h-4 sm:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMonth}
              className="flex items-center justify-center px-3 py-1 bg-sky-300 hover:bg-sky-400 rounded-lg transition-colors duration-200 text-gray-700 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Next</span>
              <svg
                className="w-4 h-4 sm:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Month and Year Display */}
          <div className="text-lg sm:text-xl font-medium text-gray-700">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
        </div>
      </div>
    );
  };

  const MobileExpansionPanel = () => {
    if (!mobileExpandedDate) return null;

    const content = getContentForDate(new Date(mobileExpandedDate));

    return (
      <div className="fixed inset-0 bg-white z-50 p-4 sm:hidden overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {new Date(mobileExpandedDate).toLocaleDateString()}
          </h3>
          <button
            onClick={() => setMobileExpandedDate(null)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
        {content && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700">{content.content}</p>
              <div className="flex gap-2 flex-wrap mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    content.contentType === 'video'
                      ? 'bg-red-100 text-red-800'
                      : content.contentType === 'image'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {content.contentType}
                </span>
                <span className="text-xs text-gray-500 italic">
                  {content.theme}
                </span>
              </div>
            </div>
            {/* Add more content as needed */}
          </div>
        )}
      </div>
    );
  };

  const PromptBox = () => {
    const [tempInput, setTempInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
      if (tempInput.trim() === "") return;
      setLoading(true);

      try {
        const businessInfo = JSON.parse(localStorage.getItem("businessInfo"));
        const token = localStorage.getItem("token");
        
        const response = await fetch("http://127.0.0.1:5000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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
            targetMonth: currentMonth.toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");
        const data = await response.json();
        

        if (data.posts && Array.isArray(data.posts)) {
          // Save to MongoDB
          const savedPlan = await saveContentToDB(data.posts);          
          // Extract saved posts array from response
          const savedPosts = savedPlan?.posts || [];
          
          if (!Array.isArray(savedPosts)) {
            throw new Error("Invalid saved posts format");
          }

          // Update state with saved data
          const updatedContent = {};
          savedPosts.forEach((post) => {
            const postDate = new Date(post.date);
            const monthKey = `${postDate.getFullYear()}-${String(
              postDate.getMonth() + 1
            ).padStart(2, "0")}`;
            
            if (!updatedContent[monthKey]) {
              updatedContent[monthKey] = [];
            }
            updatedContent[monthKey].push(post);
          });

          setMonthlyContentPlan(updatedContent);
        }

        setSummary(data.summary || "Content plan updated successfully!");
        setTempInput("");
        setPromptExpanded(false);
      } catch (error) {
        console.error("Error:", error);
        if (error.message.includes("401")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        setSummary("Error processing request: " + error.message);
      } finally {
        setLoading(false);
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
        className="fixed bottom-4 left-0 right-0 flex justify-center px-2 sm:px-0 z-40"
      >
        <div
          className={`relative bg-gray-800/90 backdrop-blur-sm w-full max-w-lg sm:max-w-2xl text-white rounded-xl shadow-lg transition-all duration-300 ease-in-out ${
            promptExpanded ? "h-auto" : "h-20 sm:h-24"
          }`}
        >
          {promptExpanded && (
            <button
              onClick={() => setPromptExpanded(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white p-2"
            >
              ✕
            </button>
          )}
          <div
            className="p-4 sm:p-6 cursor-pointer"
            onClick={() => !promptExpanded && setPromptExpanded(true)}
          >
            {!promptExpanded ? (
              <p className="text-lg text-gray-200">
                Click to expand and describe your plan. We'll create the perfect
                calendar for you.
              </p>
            ) : (
              <div className="space-y-4">
                {summary && (
                  <div className="bg-gray-700/50 p-4 rounded-lg mb-4 overflow-y-auto max-h-60">
                    <p className="whitespace-pre-wrap">{summary}</p>
                  </div>
                )}
                <textarea
                  className="w-full bg-gray-700/50 text-white rounded-lg p-4 outline-none resize-none"
                  placeholder="Describe your plan here..."
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={3}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit();
                  }}
                  className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto"
                >
                  Generate Content
                </button>
                {loading && (
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                    Typing...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Feather and Spin Animations using Tailwind Config
  useEffect(() => {
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
      @keyframes toggle-scale {
        0%, 100% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.4); opacity: 0.3; }
      }
      @keyframes rainbow {
        0% { background-color: #ef4444; }
        16% { background-color: #f97316; }
        32% { background-color: #eab308; }
        48% { background-color: #22c55e; }
        64% { background-color: #3b82f6; }
        80% { background-color: #8b5cf6; }
        100% { background-color: #ec4899; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 sm:ml-20 md:ml-32">
        <Header />
        <main className="flex-1 pt-4 pb-32 sm:pb-0">
          <CalendarGrid />
        </main>
        <PromptBox />
        <MobileExpansionPanel />
      </div>
    </div>
  );
};

export default CalendarLayout;