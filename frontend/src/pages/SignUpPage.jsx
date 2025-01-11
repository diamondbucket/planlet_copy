import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthForm from "../components/AuthForm";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { register } from "../utils/api";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await register(name, email, password);
      console.log("Registration successful:", data);

      // Navigate to the login page after successful registration
      navigate("/login"); // Or replace with "/calendar" if required
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <AuthLayout>
      <AuthForm title="Create an Account">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign Up</Button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-fuchsia-600 hover:text-fuchsia-700"
          >
            Log in
          </button>
        </div>
      </AuthForm>
    </AuthLayout>
  );
};

export default SignUpPage;
