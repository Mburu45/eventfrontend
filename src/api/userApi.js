/**
 * userApi.js
 * API functions for user-related operations
 */

import { apiPost, apiGet, apiPut } from "../helpers/apiHelper";

/**
 * Login user
 * @param {object} credentials - {email, password}
 * @returns {Promise<object>} user data and token
 */
export async function loginUser(credentials) {
  try {
    const response = await apiPost("/auth/login", credentials);
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userRole", response.user.role);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Register new user
 * @param {object} userData - {name, email, password, role}
 * @returns {Promise<object>} user data and token
 */
export async function registerUser(userData) {
  try {
    const response = await apiPost("/auth/register", userData);
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userRole", response.user.role);
    }
    return response;
  } catch (error) {
    throw error;
  }
}

/**
 * Logout user
 * @returns {void}
 */
export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
}

/**
 * Get current user profile
 * @returns {Promise<object>} user profile
 */
export async function getUserProfile() {
  return await apiGet("/users/profile");
}

/**
 * Update user profile
 * @param {object} profileData
 * @returns {Promise<object>} updated profile
 */
export async function updateUserProfile(profileData) {
  return await apiPut("/users/profile", profileData);
}

/**
 * Change user password
 * @param {object} passwordData - {oldPassword, newPassword}
 * @returns {Promise<object>} success message
 */
export async function changePassword(passwordData) {
  return await apiPut("/users/change-password", passwordData);
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!localStorage.getItem("authToken");
}

/**
 * Get user role
 * @returns {string} user role
 */
export function getUserRole() {
  return localStorage.getItem("userRole");
}
