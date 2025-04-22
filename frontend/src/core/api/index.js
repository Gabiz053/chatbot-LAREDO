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
  const endpoint = getChatbotEndpoint("/chatbot");
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
      error instanceof Error ? error : new Error(String(error)),
    );
  }

  let data;
  try {
    if (!response) throw new Error("No response received from API.");
    // Parse JSON response from the API
    data = await response.json();
  } catch (error) {
    throwInvalidJsonError(
      error instanceof Error ? error : new Error(String(error)),
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

/**
 * Streams the assistant's response in real time using Server-Sent Events (SSE).
 *
 * This function sends a user message to the backend and processes the streamed
 * response as it arrives, chunk by chunk. Each chunk is delivered to the provided
 * callback, allowing the UI to update the assistant's message in real time (e.g.,
 * for a typing effect or progressive markdown rendering).
 *
 * @param {string} userMessage - The user's message to send to the chatbot.
 * @param {(chunk: string) => void} onChunk - Callback invoked for each chunk of the assistant's response.
 * @param {AbortSignal} [signal] - Optional AbortSignal to allow cancellation of the request (e.g., on navigation).
 * @returns {Promise<void>} Resolves when the stream ends or is aborted.
 * @throws {Error} If the input is invalid or the network/stream fails.
 */
export const streamAssistantResponse = async (userMessage, onChunk, signal) => {
  // Validate input
  if (typeof userMessage !== "string" || !userMessage.trim()) {
    throw new Error("User message must be a non-empty string.");
  }
  // Build the streaming endpoint URL
  const endpoint = getChatbotEndpoint("/chatbot/stream");
  const payload = JSON.stringify({ question: userMessage.trim() });

  let response;
  try {
    // Send POST request to the streaming endpoint
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      signal,
    });
  } catch (error) {
    if (signal?.aborted) return; // Request was aborted by the caller
    throw new Error("Network error while connecting to streaming endpoint.");
  }

  if (!response.ok || !response.body) {
    throw new Error("Failed to connect to streaming endpoint.");
  }

  // Prepare to read the response as a stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  try {
    // Continuously read and process SSE events as they arrive
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Split buffer into complete SSE events (separated by double newlines)
      let events = buffer.split("\n\n");
      buffer = events.pop() ?? ""; // Save incomplete event for next chunk
      for (const event of events) {
        // Standard SSE: each event starts with 'data:'
        if (event.startsWith("data: ")) {
          // Extract everything after 'data: ' (preserve newlines for markdown)
          const chunk = event.slice(6);
          if (chunk) onChunk(chunk);
        }
      }
    }
  } finally {
    // Always release the reader lock when done
    reader.releaseLock();
  }
};
