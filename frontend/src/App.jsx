import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FirstPage from "./pages/FirstPage";
import NewProject from "./pages/SecondPage";
import CalendarLayout from "./components/CalenderLayout";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protect these routes */}
        <Route
          path="/info"
          element={<ProtectedRoute element={<NewProject />} />}
        />
        <Route
          path="/calendar"
          element={<ProtectedRoute element={<CalendarLayout />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
