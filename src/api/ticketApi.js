/**
 * ticketApi.js
 * API functions for ticket-related operations
 */

import { apiGet, apiPost, apiPut, apiDelete } from "../helpers/apiHelper";

/**
 * Fetch all tickets for current user
 * @param {object} filters - optional filters {eventId, status}
 * @returns {Promise<array>} tickets array
 */
export async function getTickets(filters = {}) {
  const queryString = new URLSearchParams(filters).toString();
  const endpoint = queryString ? `/tickets?${queryString}` : "/tickets";
  return await apiGet(endpoint);
}

/**
 * Fetch single ticket by ID
 * @param {string} ticketId
 * @returns {Promise<object>} ticket object
 */
export async function getTicketById(ticketId) {
  return await apiGet(`/tickets/${ticketId}`);
}

/**
 * Purchase/create new ticket
 * @param {object} ticketData - {eventId, quantity, ticketType}
 * @returns {Promise<object>} created ticket
 */
export async function createTicket(ticketData) {
  return await apiPost("/tickets", ticketData);
}

/**
 * Update ticket (if allowed)
 * @param {string} ticketId
 * @param {object} ticketData
 * @returns {Promise<object>} updated ticket
 */
export async function updateTicket(ticketId, ticketData) {
  return await apiPut(`/tickets/${ticketId}`, ticketData);
}

/**
 * Cancel/delete ticket
 * @param {string} ticketId
 * @returns {Promise<object>} success message
 */
export async function deleteTicket(ticketId) {
  return await apiDelete(`/tickets/${ticketId}`);
}

/**
 * Get tickets for specific event
 * @param {string} eventId
 * @returns {Promise<array>} event tickets
 */
export async function getEventTickets(eventId) {
  return await apiGet(`/events/${eventId}/tickets`);
}

/**
 * Validate ticket (for check-in)
 * @param {string} ticketId
 * @param {string} validationCode
 * @returns {Promise<object>} validation result
 */
export async function validateTicket(ticketId, validationCode) {
  return await apiPost(`/tickets/${ticketId}/validate`, { validationCode });
}

/**
 * Get ticket types for an event
 * @param {string} eventId
 * @returns {Promise<array>} ticket types
 */
export async function getTicketTypes(eventId) {
  return await apiGet(`/events/${eventId}/ticket-types`);
}

/**
 * Transfer ticket to another user
 * @param {string} ticketId
 * @param {string} recipientEmail
 * @returns {Promise<object>} transfer confirmation
 */
export async function transferTicket(ticketId, recipientEmail) {
  return await apiPost(`/tickets/${ticketId}/transfer`, { recipientEmail });
}

/**
 * Download ticket PDF
 * @param {string} ticketId
 * @returns {Promise<blob>} ticket PDF
 */
export async function downloadTicket(ticketId) {
  return await apiGet(`/tickets/${ticketId}/download`, {}, 'blob');
}
