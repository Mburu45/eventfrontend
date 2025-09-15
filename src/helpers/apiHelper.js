/**
 * apiHelper.js
 * General helper functions for API interactions
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

/**
 * Get authorization headers with token
 * @returns {object} headers object
 */
function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Generic GET request
 * @param {string} endpoint
 * @returns {Promise<object>}
 */
export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Generic POST request
 * @param {string} endpoint
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function apiPost(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Generic PUT request
 * @param {string} endpoint
 * @param {object} data
 * @returns {Promise<object>}
 */
export async function apiPut(endpoint, data) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Generic DELETE request
 * @param {string} endpoint
 * @returns {Promise<object>}
 */
export async function apiDelete(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch events from backend
 * @returns {Promise<array>} events array
 */
export async function fetchEvents() {
  return await apiGet("/events");
}

/**
 * Fetch single event by ID
 * @param {string} eventId
 * @returns {Promise<object>} event object
 */
export async function fetchEventById(eventId) {
  return await apiGet(`/events/${eventId}`);
}

/**
 * Fetch user tickets
 * @returns {Promise<array>} tickets array
 */
export async function fetchUserTickets() {
  return await apiGet("/tickets");
}

/**
 * Purchase ticket for event
 * @param {string} eventId
 * @param {object} ticketData
 * @returns {Promise<object>} ticket object
 */
export async function purchaseTicket(eventId, ticketData) {
  return await apiPost(`/events/${eventId}/tickets`, ticketData);
}

/**
 * Fetch user profile
 * @returns {Promise<object>} user profile
 */
export async function fetchUserProfile() {
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
