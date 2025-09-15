/**
 * authHelper.js
 * Helper functions to interact with backend authentication routes
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

/**
 * Login user with credentials
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} user data or error
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    // Save token to localStorage or cookie as needed
    localStorage.setItem("authToken", data.token);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Register new user
 * @param {object} userDetails - {name, email, password}
 * @returns {Promise<object>} user data or error
 */
export async function registerUser(userDetails) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Logout user by removing token
 */
export function logoutUser() {
  localStorage.removeItem("authToken");
}

/**
 * Get auth token from storage
 * @returns {string|null}
 */
export function getAuthToken() {
  return localStorage.getItem("authToken");
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

/**
 * Get user role from stored token or user info
 * @returns {string|null} user role or null if not found
 */
export function getUserRole() {
  try {
    const token = getAuthToken();
    if (!token) return null;
    // Decode JWT token payload (assuming JWT)
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.role || null;
  } catch (error) {
    return null;
  }
}

/**
 * Get user ID from stored token
 * @returns {string|null} user ID or null if not found
 */
export function getUserId() {
  try {
    const token = getAuthToken();
    if (!token) return null;
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.userId || payload.id || null;
  } catch (error) {
    return null;
  }
}

/**
 * Get user info from stored token
 * @returns {object|null} user info object or null if not found
 */
export function getUserInfo() {
  try {
    const token = getAuthToken();
    if (!token) return null;
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Check if token is expired
 * @returns {boolean} true if expired or invalid
 */
export function isTokenExpired() {
  try {
    const token = getAuthToken();
    if (!token) return true;
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}
