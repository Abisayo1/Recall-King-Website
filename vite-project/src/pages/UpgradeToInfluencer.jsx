import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { upgradeToInfluencer } from "../services/authService";
import { Sparkles, ArrowRight, UserCheck } from "lucide-react";

export default function UpgradeToInfluencer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    setLoading(true);
    setError("");

    try {
      await upgradeToInfluencer();
      setSuccess(true);
      setTimeout(() => {
        navigate("/influencer-dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to upgrade your account. Please try again.");
      setLoading(false);
    }
  };

  const handleDecline = () => {
    navigate("/"); // Send them back to the home page if they decline
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50 font-sans">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-50 max-w-lg w-full text-center relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-10"></div>
        <div className="absolute -top-10 -right-10 text-blue-100 opacity-50">
            <Sparkles size={180} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white">
              {success ? <UserCheck size={40} className="text-green-500" /> : <Sparkles size={40} />}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              Become an Influencer
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Unlock the ability to earn commissions! Refer users to Recall-King and watch your earnings grow seamlessly via your dedicated dashboard.
            </p>

            {error && (
              <div className="mb-6 p-4 w-full bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                {error}
              </div>
            )}

            {success ? (
               <div className="mb-6 w-full p-4 bg-green-50 text-green-700 font-semibold rounded-xl border border-green-100 flex flex-col items-center gap-2">
                 <span>Account upgraded successfully!</span>
                 <span className="text-sm font-normal text-green-600">Redirecting to your new dashboard...</span>
               </div>
            ) : (
                <div className="flex flex-col w-full gap-4 mt-2">
                    <button 
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Upgrading..." : "Yes, Upgrade Me"}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                    
                    <button 
                        onClick={handleDecline}
                        disabled={loading}
                        className="w-full bg-white text-gray-500 hover:text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors border-2 border-transparent hover:border-gray-100"
                    >
                        No Thanks, Take me Home
                    </button>
                </div>
            )}
        </div>
        
      </div>
    </div>
  );
}
