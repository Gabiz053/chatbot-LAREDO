// Main API function for chatbot backend
import { getChatbotEndpoint } from "./endpoints.js";
import {
  throwNetworkError,
  throwInvalidJsonError,
  throwApiError,
  throwInvalidResponseFormat,
} from "./errors.js";

/**
 * Sends a message to the chatbot backend and returns the assistant's response.
 *
 * @param {string} userMessage - The user's message to send.
 * @returns {Promise<string>} The assistant's response.
 * @throws {Error} If the API call fails or the response is invalid.
 */
export const fetchAssistantResponse = async (userMessage) => {
  // Validate input
  if (typeof userMessage !== "string" || !userMessage.trim()) {
    throw new Error("User message must be a non-empty string.");
  }

  // Prepare endpoint and payload
  const endpoint = getChatbotEndpoint();
  const payload = JSON.stringify({ question: userMessage.trim() });

  let response = undefined;
  try {
    // Send POST request to the chatbot API
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
  } catch (error) {
    throwNetworkError(
      error instanceof Error ? error : new Error(String(error))
    );
  }

  let data;
  try {
    if (!response) throw new Error("No response received from API.");
    // Parse JSON response from the API
    data = await response.json();
  } catch (error) {
    throwInvalidJsonError(
      error instanceof Error ? error : new Error(String(error))
    );
  }

  // Handle non-OK HTTP responses
  if (!response || !response.ok) {
    throwApiError(response || new Response(), data);
  }

  // Validate the structure of the API response
  if (!data || typeof data.answer !== "string") {
    throwInvalidResponseFormat();
  }

  // Return the assistant's answer
  return data.answer;
};
