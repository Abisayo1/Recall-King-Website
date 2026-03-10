import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerInfluencer } from "../services/authService";
import { Eye, EyeOff } from "lucide-react";

export default function InfluencerSignup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const data = await registerInfluencer(name, email, password);

    setMessage(data.message);

    navigate("/verify-otp", { state: { email } });

  } catch (error) {
    console.error(error);
    setMessage(error.message || "Registration failed");
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Become an Influencer
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg w-full pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-green-600">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}