import React from "react";

const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-sky-200 to-sky-300 flex flex-col justify-center items-center p-4">
    <div className="flex items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Planlet*</h1>
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
    {children}
  </div>
);

export default AuthLayout;
