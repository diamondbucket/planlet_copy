import React from "react";

const Button = ({ children, onClick, secondary = false }) => (
  <button
    onClick={onClick}
    className={`w-full py-2 px-4 rounded-lg transition-all ${
      secondary
        ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
        : "bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
    }`}
  >
    {children}
  </button>
);

export default Button;
