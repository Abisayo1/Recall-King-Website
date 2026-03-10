import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const data = await loginUser(email, password);
      // Fallback clean if the backend still appends `.null` to the token
      const rawToken = data.access_token || "";
      const validToken = rawToken.endsWith(".null") ? rawToken.slice(0, -5) : rawToken;

      localStorage.setItem("accessToken", validToken);

      setMessage(data.message);

      setTimeout(() => {
        // Assume backend will be updated to return either data.role or data.user.role
        const role = data.role || data.user?.role || "influencer"; // fallback to influencer if missing

        if (role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/influencer-dashboard");
        }
      }, 1500);

    } catch (error) {
      setMessage(error.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
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