// Endpoint utility for chatbot API

/**
 * Retrieves the base URL for the API from environment variables.
 * @returns {string} The base API URL.
 * @throws {Error} If the environment variable is not set.
 */
export const getApiBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (!url) throw new Error("API base URL is not defined in environment variables.");
  return url;
};

/**
 * Constructs the chatbot endpoint URL.
 * @returns {string} The chatbot endpoint URL.
 */
export const getChatbotEndpoint = () => `${getApiBaseUrl()}/chatbot`;
