import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getResetToken, resetPassword } from "../services/authService";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function Login() {

  // --- Login State ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [loading, setLoading] = useState(false);

  // --- Forgot Password State ---
  const [forgotMode, setForgotMode] = useState(false);
  const [fpStep, setFpStep] = useState(1); // 1 = email, 2 = token, 3 = new password
  const [fpEmail, setFpEmail] = useState("");
  const [fpToken, setFpToken] = useState("");
  const [fpNewPassword, setFpNewPassword] = useState("");
  const [fpLoading, setFpLoading] = useState(false);
  const [fpMessage, setFpMessage] = useState({ text: "", type: "error" });
  const [fpDone, setFpDone] = useState(false);

  const navigate = useNavigate();

  // --- Login Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "success" });

    try {
      const data = await loginUser(email, password);
      const rawToken = data.access_token || "";
      const validToken = rawToken.endsWith(".null") ? rawToken.slice(0, -5) : rawToken;
      localStorage.setItem("accessToken", validToken);
      setMessage({ text: data.message, type: "success" });

      setTimeout(() => {
        const role = data.role || data.user?.role || "user";
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "influencer") navigate("/influencer-dashboard");
        else navigate("/upgrade-to-influencer");
      }, 1500);

    } catch (error) {
      setMessage({ text: error.message || "Login failed", type: "error" });
    }

    setLoading(false);
  };

  // --- Forgot Password: Step 1 — Send Reset Token ---
  const handleSendToken = async (e) => {
    e.preventDefault();
    setFpLoading(true);
    setFpMessage({ text: "", type: "error" });

    try {
      await getResetToken(fpEmail);
      setFpMessage({ text: `Reset token sent to ${fpEmail}`, type: "success" });
      setTimeout(() => {
        setFpMessage({ text: "", type: "error" });
        setFpStep(2);
      }, 1500);
    } catch (err) {
      setFpMessage({ text: err.message || "Failed to send reset token.", type: "error" });
    }

    setFpLoading(false);
  };

  // --- Forgot Password: Step 2 — Verify Token ---
  const handleVerifyToken = (e) => {
    e.preventDefault();
    if (!fpToken.trim()) {
      setFpMessage({ text: "Please enter the token from your email.", type: "error" });
      return;
    }
    setFpMessage({ text: "", type: "error" });
    setFpStep(3);
  };

  // --- Forgot Password: Step 3 — Reset Password ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setFpLoading(true);
    setFpMessage({ text: "", type: "error" });

    try {
      await resetPassword(fpEmail, fpToken, fpNewPassword);
      setFpDone(true);
      setFpMessage({ text: "Password successfully changed! You can now log in.", type: "success" });
    } catch (err) {
      setFpMessage({ text: err.message || "Failed to reset password.", type: "error" });
    }

    setFpLoading(false);
  };

  const resetForgotFlow = () => {
    setForgotMode(false);
    setFpStep(1);
    setFpEmail("");
    setFpToken("");
    setFpNewPassword("");
    setFpMessage({ text: "", type: "error" });
    setFpDone(false);
  };

  const stepLabels = ["Enter Email", "Enter Token", "New Password"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">

        {/* ---- FORGOT PASSWORD MODE ---- */}
        {forgotMode ? (
          <div>
            {/* Back button */}
            <button
              onClick={resetForgotFlow}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Login
            </button>

            <h2 className="text-2xl font-bold mb-1 text-gray-900">Forgot Password</h2>
            <p className="text-sm text-gray-500 mb-6">
              {fpStep === 1 && "Enter your email address and we'll send you a reset token."}
              {fpStep === 2 && "Enter the reset token that was sent to your email."}
              {fpStep === 3 && "Set your new password below."}
            </p>

            {/* Step Progress Indicator */}
            {!fpDone && (
              <div className="flex items-center gap-2 mb-8">
                {stepLabels.map((label, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                        ${fpStep > i + 1 ? "bg-green-500 text-white" : fpStep === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}>
                        {fpStep > i + 1 ? <CheckCircle size={14} /> : i + 1}
                      </div>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${fpStep === i + 1 ? "text-blue-600" : "text-gray-400"}`}>{label}</span>
                    </div>
                    {i < 2 && <div className={`flex-1 h-0.5 mb-4 rounded-full transition-colors ${fpStep > i + 1 ? "bg-green-400" : "bg-gray-100"}`} />}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Feedback Message */}
            {fpMessage.text && (
              <div className={`mb-5 p-3.5 text-sm rounded-xl border ${fpMessage.type === "success" ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                {fpMessage.text}
              </div>
            )}

            {/* STEP 1: Email */}
            {fpStep === 1 && !fpDone && (
              <form onSubmit={handleSendToken} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={fpEmail}
                  onChange={(e) => setFpEmail(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
                <button
                  type="submit"
                  disabled={fpLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-colors disabled:opacity-60"
                >
                  {fpLoading ? "Sending..." : "Send Reset Token"}
                </button>
              </form>
            )}

            {/* STEP 2: Token Entry */}
            {fpStep === 2 && !fpDone && (
              <form onSubmit={handleVerifyToken} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Paste your reset token here"
                  value={fpToken}
                  onChange={(e) => setFpToken(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono tracking-widest text-center text-lg"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-colors"
                >
                  Verify Token
                </button>
              </form>
            )}

            {/* STEP 3: New Password */}
            {fpStep === 3 && !fpDone && (
              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={fpNewPassword}
                  onChange={(e) => setFpNewPassword(e.target.value)}
                  className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  minLength={8}
                />
                <button
                  type="submit"
                  disabled={fpLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-colors disabled:opacity-60"
                >
                  {fpLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* Done State */}
            {fpDone && (
              <button
                onClick={resetForgotFlow}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-xl transition-colors"
              >
                Back to Login
              </button>
            )}
          </div>

        ) : (
          /* ---- LOGIN MODE ---- */
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />

              {/* Forgot Password Link */}
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => setForgotMode(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {message.text && (
              <p className={`mt-4 text-center text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {message.text}
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}