import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InfluencerSignup() {

  const [name, setName] = useState("");
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

    const response = await fetch(
      "https://cute-toma-recallking-758d8dd8.koyeb.app/api/v1/user/register-influencer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          version: "1.0.0",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log("API RESPONSE:", data);

    if (!response.ok) {
      setMessage(data.message || "Registration failed");
      return;
    }

    setMessage(data.message);

    navigate("/verify-otp", { state: { email } });

  } catch (error) {
    console.error("FETCH ERROR:", error);
    setMessage("Network error. Please try again.");
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