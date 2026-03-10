const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const apiRequest = async (endpoint, method = "GET", body = null, skipAuth = false) => {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    version: API_VERSION,
  };

  if (token && !skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  const data = await response.json();

  if (!response.ok) {
    // Extract error message from various common field names the backend might use
    const errMsg = data.message || data.error || data.detail || JSON.stringify(data);
    throw new Error(errMsg || "Request failed");
  }

  return data;
};