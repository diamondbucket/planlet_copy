import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FirstPage from "./pages/FirstPage";
import NewProject from "./pages/SecondPage";
import CalendarLayout from "./components/CalenderLayout";
// import ProfilePage from "./pages/ProfilePage";  // Updated import path
// import NotesPage from "./pages/NotesPage";      // Updated import path
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/info"
          element={<ProtectedRoute element={<NewProject />} />}
        />
        <Route
          path="/calendar"
          element={<ProtectedRoute element={<CalendarLayout />} />}
        />
        {/* <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        /> */}
        {/* <Route
          path="/notes"
          element={<ProtectedRoute element={<NotesPage />} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
