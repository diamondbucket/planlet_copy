import React from "react";

const AuthForm = ({ children, title }) => (
  <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      {title}
    </h2>
    {children}
  </div>
);

export default AuthForm;
