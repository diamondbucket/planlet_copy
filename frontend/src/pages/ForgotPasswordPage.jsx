import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { forgotPassword } from "../utils/api"; // Update your API utility

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = async () => {
    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  return (
    <AuthLayout>
      <AuthForm title="Reset Password">
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p className="text-green-500 text-sm">{message}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleResetRequest}>Send Reset Link</Button>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-fuchsia-600 hover:text-fuchsia-700"
          >
            Back to login
          </button>
        </div>
      </AuthForm>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;