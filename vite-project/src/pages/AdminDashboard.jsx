import React, { useEffect, useState } from "react";
import { getAdminCommissions, markInfluencerMonthPaid } from "../services/authService";
import { Copy, CheckCircle, Users, Activity, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingMonth, setUpdatingMonth] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await getAdminCommissions();
      setData(response);
    } catch (err) {
      setError(err.message || "Failed to load admin dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleMarkPaid = async (influencerId, monthYear) => {
    if (!window.confirm("Are you sure you have paid this user for the month?")) return;

    setUpdatingMonth(monthYear + influencerId);
    try {
      const payoutRef = `PAYSTACK_BATCH_${monthYear.replace("-", "_")}`;
      await markInfluencerMonthPaid(influencerId, monthYear, payoutRef);
      alert("Commission marked as paid successfully.");
      await fetchDashboardData();
    } catch (err) {
      alert("Error marking as paid: " + err.message);
    } finally {
      setUpdatingMonth(null);
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

  // Filter for only 'subscription' type, ignoring 'signup_bonus' as requested.
  const subscriptions = data.data?.filter(item => item.type === "subscription") || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">Overview of all influencer commissions and monthly breakdowns.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Monthly Breakdown Container (Takes up 1 column on XL screens) */}
            <div className="xl:col-span-1 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm overflow-hidden h-fit">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  Monthly Breakdown
              </h2>
              <div className="space-y-4">
                  {data.monthlyBreakdown?.length > 0 ? (
                    data.monthlyBreakdown.map((month, idx) => (
                      <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors">
                        <div className="font-semibold text-gray-700 flex justify-between items-center">
                          <span>{formatMonthYear(month.monthYear)}</span>
                          <span className="text-lg font-bold text-blue-600">${month.subscriptionCommission}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex justify-between items-end mt-2">
                            <div>
                              <span>Influencer:</span>
                              <span className="font-medium text-gray-700 ml-1">{month.influencerName}</span>
                              <div className="text-xs text-gray-400 truncate">{month.influencerEmail}</div>
                            </div>
                            {!month.subscriptionPaid && month.subscriptionCommission > 0 ? (
                              <button 
                                onClick={() => handleMarkPaid(month.influencerId, month.monthYear)}
                                disabled={updatingMonth === month.monthYear + month.influencerId}
                                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm disabled:opacity-50 whitespace-nowrap"
                              >
                                  {updatingMonth === month.monthYear + month.influencerId ? "Updating..." : "Mark Paid"}
                              </button>
                            ) : month.subscriptionPaid ? (
                              <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2 py-1 rounded-md">Paid</span>
                            ) : (
                               <span className="text-xs font-medium text-gray-400 italic px-2 py-1">No Payout Req.</span>
                            )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">No monthly data available.</p>
                  )}
              </div>
            </div>

            {/* Subscriptions Table Container (Takes up 3 columns on XL screens) */}
            <div className="xl:col-span-3 border border-gray-100 bg-white rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col h-fit">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800">
                    All Subscriptions
                </h2>
              </div>

              <div className="overflow-x-auto flex-1 h-fit">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-500">
                      <th className="pb-3 font-medium px-4">Influencer</th>
                      <th className="pb-3 font-medium px-4">Referred User</th>
                      <th className="pb-3 font-medium px-4">Amount</th>
                      <th className="pb-3 font-medium px-4">Comms.</th>
                      <th className="pb-3 font-medium px-4">Status & Admin</th>
                      <th className="pb-3 font-medium px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm border-t border-gray-100">
                    {subscriptions.length > 0 ? (
                      subscriptions.map((sub, idx) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            {/* Influencer Info */}
                            <td className="py-4 px-4 align-top">
                              <p className="font-semibold text-gray-800">{sub.influencerName || "N/A"}</p>
                              <p className="text-xs text-gray-500">{sub.influencerEmail || "N/A"}</p>
                            </td>
                            
                            {/* Referred User Info */}
                            <td className="py-4 px-4 align-top">
                              <p className="font-semibold text-gray-800">{sub.referredUserName || "N/A"}</p>
                              <p className="text-xs text-gray-500">{sub.referredUserEmail || "N/A"}</p>
                              {sub.subscriptionId && <p className="text-[10px] text-gray-400 mt-1 font-mono uppercase">ID: {sub.subscriptionId}</p>}
                            </td>
                            
                            {/* Amount Paid */}
                            <td className="py-4 px-4 font-medium text-gray-700 align-top">
                              ${sub.amountPaid ?? 0}
                            </td>
                            
                            {/* Commission */}
                            <td className="py-4 px-4 font-bold text-blue-600 align-top">
                              ${sub.commissionAmount ?? 0}
                            </td>
                            
                            {/* Status and Admin Info */}
                            <td className="py-4 px-4 align-top">
                              <div className="flex flex-col gap-1 items-start">
                                  <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${sub.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {sub.isPaid ? 'PAID' : 'PENDING'}
                                  </span>
                                  {sub.isPaid && sub.adminName && (
                                      <div className="mt-2 text-xs text-gray-500">
                                          <p>By: <span className="font-medium text-gray-700">{sub.adminName}</span></p>
                                          <p className="truncate max-w-[150px]" title={sub.adminEmail}>{sub.adminEmail}</p>
                                          {sub.payoutRef && <p className="text-[10px] font-mono mt-1 text-gray-400">Ref: {sub.payoutRef}</p>}
                                      </div>
                                  )}
                              </div>
                            </td>
                            
                            {/* Date Info */}
                            <td className="py-4 px-4 align-top text-gray-600">
                                {formatMonthYear(sub.monthYear)}
                            </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500 italic">No subscriptions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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
