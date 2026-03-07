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