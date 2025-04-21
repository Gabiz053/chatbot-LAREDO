// useChatbotConversation.js - Custom React hook for chatbot state and logic
// -------------------------------------------------------------------------
// Manages chat messages, loading state, persistence, and API communication for the chatbot UI.

import { useState, useEffect, useCallback } from "react";
import { fetchAssistantResponse } from "@/core/api/index.js";
import {
  loadMessages,
  saveMessages,
  clearStoredMessages,
} from "./useChatbotStorage.js";
import {
  createUserMessage,
  createAssistantMessage,
} from "./useChatbotMessage.js";

/**
 * @typedef {Object} ChatbotConversationApi
 * @property {Array<{role: string, content: string}>} messages - The chat message history
 * @property {boolean} isLoading - Whether the assistant is generating a response
 * @property {(userInput: string) => Promise<void>} sendMessage - Sends a user message and fetches the assistant's reply
 * @property {() => void} clearChat - Clears the chat history
 */

/**
 * useChatbotConversation - Custom React hook
 *
 * Manages chatbot conversation state, persistence, and API calls.
 *
 * @returns {ChatbotConversationApi}
 */
function useChatbotConversation() {
  // State: chat messages and loading status
  const [messages, setMessages] = useState(loadMessages); // Load messages from localStorage
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Effect: persist messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Clears the chat history and localStorage
  const clearChat = useCallback(() => {
    setMessages([]);
    clearStoredMessages();
  }, []);

  /**
   * Sends a user message and fetches the assistant's reply.
   * Ignores empty or duplicate submissions while loading.
   *
   * @param {string} userInput - The user's message to send
   * @returns {Promise<void>}
   */
  const sendMessage = useCallback(
    /**
     * @param {string} userInput
     */
    async (userInput) => {
      if (isLoading) return; // Prevent multiple sends
      const trimmedMessage =
        typeof userInput === "string" ? userInput.trim() : "";
      if (!trimmedMessage) return; // Ignore empty input
      setMessages((prevMessages) => [
        ...prevMessages,
        createUserMessage(trimmedMessage),
      ]);
      setIsLoading(true);
      try {
        // Fetch assistant's reply from API
        const assistantReply = await fetchAssistantResponse(trimmedMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          createAssistantMessage(assistantReply),
        ]);
      } catch {
        // On error, show error message with error: true
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: "Error generating response.", error: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  // Return the chatbot conversation API
  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
}

export default useChatbotConversation;
