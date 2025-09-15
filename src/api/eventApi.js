/**
 * eventApi.js
 * API functions for event-related operations
 */

import { apiGet, apiPost, apiPut, apiDelete } from "../helpers/apiHelper";

/**
 * Fetch all events
 * @param {object} filters - optional filters {category, date, location}
 * @returns {Promise<array>} events array
 */
export async function getEvents(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = queryString ? `/events?${queryString}` : "/events";
  return await apiGet(endpoint);
}

/**
 * Fetch single event by ID
 * @param {string} eventId
 * @returns {Promise<object>} event object
 */
export async function getEventById(eventId) {
  return await apiGet(`/events/${eventId}`);
}

/**
 * Create new event (organizer/admin only)
 * @param {object} eventData
 * @returns {Promise<object>} created event
 */
export async function createEvent(eventData) {
  return await apiPost("/events", eventData);
}

/**
 * Update event (organizer/admin only)
 * @param {string} eventId
 * @param {object} eventData
 * @returns {Promise<object>} updated event
 */
export async function updateEvent(eventId, eventData) {
  return await apiPut(`/events/${eventId}`, eventData);
}

/**
 * Delete event (organizer/admin only)
 * @param {string} eventId
 * @returns {Promise<object>} success message
 */
export async function deleteEvent(eventId) {
  return await apiDelete(`/events/${eventId}`);
}

/**
 * Get events created by current user (organizer)
 * @returns {Promise<array>} user's events
 */
export async function getMyEvents() {
  return await apiGet("/events/my-events");
}

/**
 * Search events
 * @param {string} query
 * @returns {Promise<array>} search results
 */
export async function searchEvents(query) {
  return await apiGet(`/events/search?q=${encodeURIComponent(query)}`);
}

/**
 * Get event categories
 * @returns {Promise<array>} categories array
 */
export async function getEventCategories() {
  return await apiGet("/events/categories");
}

/**
 * Register for event
 * @param {string} eventId
 * @returns {Promise<object>} registration confirmation
 */
export async function registerForEvent(eventId) {
  return await apiPost(`/events/${eventId}/register`, {});
}

/**
 * Unregister from event
 * @param {string} eventId
 * @returns {Promise<object>} success message
 */
export async function unregisterFromEvent(eventId) {
  return await apiDelete(`/events/${eventId}/register`);
}

/**
 * Get event attendees
 * @param {string} eventId
 * @returns {Promise<array>} attendees array
 */
export async function getEventAttendees(eventId) {
  return await apiGet(`/events/${eventId}/attendees`);
}
