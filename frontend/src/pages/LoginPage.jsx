import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { login } from "../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token, user } = await login(email, password); // Pass email and password separately
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/info"); // Redirect after successful login
    } catch (err) {
      setError(err); // Display the error message from the backend
    }
  };

  return (
    <AuthLayout>
      <AuthForm title="Welcome Back">
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="mb-6">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-fuchsia-600 hover:text-fuchsia-700"
          >
            Forgot password?
          </button>
        </div>
        <Button onClick={handleLogin}>Log In</Button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-fuchsia-600 hover:text-fuchsia-700"
          >
            Sign up
          </button>
        </div>
      </AuthForm>
    </AuthLayout>
  );
};

export default LoginPage;
