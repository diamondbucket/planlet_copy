import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetRequest = () => {
    console.log("Reset password for:", email);
    // Add password reset logic here
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
