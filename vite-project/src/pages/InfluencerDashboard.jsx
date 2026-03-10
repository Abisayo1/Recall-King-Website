import React, { useEffect, useState } from "react";
import { getInfluencerDashboard } from "../services/authService";
import { Copy, CheckCircle, Users, DollarSign, Activity, FileText } from "lucide-react";

export default function InfluencerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfluencerDashboard();
        setData(response);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopy = () => {
    if (data?.influencer?.referralCode) {
      navigator.clipboard.writeText(data.influencer.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 max-w-md text-center">
            <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { influencer, summary, details } = data;
  
  // Filter for only subscription details
  const subscriptionDetails = details?.filter(d => d.type === "subscription") || [];
  
  const totalPaidCommission = subscriptionDetails.filter(d => d.isPaid).reduce((acc, curr) => acc + (curr.commissionAmount || 0), 0);
  const totalPendingCommission = subscriptionDetails.filter(d => !d.isPaid).reduce((acc, curr) => acc + (curr.commissionAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Welcome, {influencer?.name}
            </h1>
            <p className="text-gray-500 mt-1">Here's your performance summary</p>
          </div>
          
          <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <div>
              <p className="text-xs text-blue-600 uppercase font-semibold tracking-wider">Referral Code</p>
              <p className="text-lg font-mono font-bold text-gray-800">{influencer?.referralCode}</p>
            </div>
            <button 
              onClick={handleCopy}
              className="p-2 ml-2 bg-white rounded-lg shadow-sm border border-blue-100 hover:bg-blue-50 transition-colors focus:outline-none"
              title="Copy Referral Code"
            >
              {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-blue-500" />}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Referrals" 
            value={summary?.totalReferredUsers || 0} 
            icon={<Users className="w-6 h-6 text-indigo-500" />} 
            bg="bg-indigo-50"
          />
          <StatCard 
            title="Active Subscribers" 
            value={summary?.activeSubscribers || 0} 
            icon={<Activity className="w-6 h-6 text-emerald-500" />} 
            bg="bg-emerald-50"
          />
          <StatCard 
            title="Total Commission" 
            value={`$${summary?.totalCommissionEarned || 0}`} 
            icon={<FileText className="w-6 h-6 text-blue-500" />} 
            bg="bg-blue-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Breakdown */}
          <div className="lg:col-span-1 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm overflow-hidden h-fit">
             <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                Monthly Breakdown
             </h2>
             <div className="space-y-4">
                {summary?.monthlyBreakdown?.length > 0 ? (
                  summary.monthlyBreakdown.map((month, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                      <div className="font-semibold text-gray-700">{formatMonthYear(month.monthYear)}</div>
                      <div className="text-lg font-bold text-blue-600">${month.subscriptionCommission}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">No monthly data available.</p>
                )}
             </div>
          </div>

          {/* Referred Users Table */}
          <div className="lg:col-span-2 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                  Recent Subscriptions
              </h2>
              <div className="flex items-center gap-3">
                <div className="bg-green-50 border border-green-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Total Paid:</span>
                  <span className="text-sm font-bold text-green-700">${totalPaidCommission}</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Pending:</span>
                  <span className="text-sm font-bold text-amber-700">${totalPendingCommission}</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto flex-1 h-fit">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-sm text-gray-500">
                    <th className="pb-3 font-medium px-4">User</th>
                    <th className="pb-3 font-medium px-4">Amount Paid</th>
                    <th className="pb-3 font-medium px-4">Commission</th>
                    <th className="pb-3 font-medium px-4">Status</th>
                    <th className="pb-3 font-medium px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {subscriptionDetails.length > 0 ? (
                    subscriptionDetails.map((user, idx) => (
                       <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4">
                            <p className="font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-700">${user.amountPaid}</td>
                          <td className="py-4 px-4 font-bold text-blue-600">${user.commissionAmount}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${user.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {user.isPaid ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{formatMonthYear(user.monthYear)}</td>
                       </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500 italic">No subscriptions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* All Referred Users Table */}
        <div className="border border-gray-100 bg-white rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col h-fit mt-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
              All Referred Users
          </h2>
          <div className="overflow-x-auto flex-1 h-fit">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="pb-3 font-medium px-4">User</th>
                  <th className="pb-3 font-medium px-4">Current Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.referredUsers?.length > 0 ? (
                  data.referredUsers.map((user, idx) => (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${user.hasSubscription ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                            {user.hasSubscription ? 'Subscribed' : 'No Subscription'}
                          </span>
                        </td>
                      </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-8 text-center text-gray-500 italic">No referred users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${bg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function formatMonthYear(monthYearStr) {
  if (!monthYearStr) return "";
  const [year, month] = monthYearStr.split("-");
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}
