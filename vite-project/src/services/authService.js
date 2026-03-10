import { apiRequest } from "./apiService";


export const verifyOtp = async (email, otp) => {
    return await apiRequest("/api/v1/user/verifyOtp", "POST", {
        email,
        otp,
    });
};



export const registerInfluencer = async (name, email, password) => {
    return await apiRequest("/api/v1/user/register-influencer", "POST", {
        name,
        email,
        password,
    });
};

export const loginUser = async (email, password) => {
    return await apiRequest("/api/v1/user/login", "POST", {
        email,
        password,
    });
};

export const getInfluencerDashboard = async () => {
    return await apiRequest("/api/v1/user/influencer/dashboard", "GET");
};

export const getAdminCommissions = async () => {
    return await apiRequest("/api/v1/user/admin/influencers/commissions", "GET");
};

export const markInfluencerMonthPaid = async (influencerId, monthYear, payoutRef) => {
    return await apiRequest("/api/v1/user/influencer/mark-month-paid", "POST", {
        influencerId,
        monthYear,
        payoutRef,
    });
};

export const upgradeToInfluencer = async () => {
    return await apiRequest("/api/v1/user/upgrade-to-influencer", "POST");
};

export const getResetToken = async (email) => {
    return await apiRequest("/api/v1/user/getResetToken", "POST", { email }, true);
};

export const resetPassword = async (email, token, password) => {
    return await apiRequest("/api/v1/user/resetPassword", "POST", { email, token, password }, true);
};