// MessageInput.jsx - Optimized chat input for chatbot UI
// ------------------------------------------------------
// Renders a textarea for user input and a send button. Handles message submission and input events.

import React from "react"; // Always import React in JSX files for clarity
import MessageTextarea from "./MessageTextarea.jsx";
import MessageSendButton from "./MessageSendButton.jsx";

/**
 * MessageInput Component
 *
 * @param {Object} props - Component props
 * @param {string} props.newMessage - Current value of the input
 * @param {boolean} props.isLoading - Whether the assistant is generating a response
 * @param {(value: string) => void} props.setNewMessage - Updates the input value
 * @param {() => void} props.submitNewMessage - Submits the message
 * @returns {JSX.Element}
 */
function MessageInput({
  newMessage,
  isLoading,
  setNewMessage,
  submitNewMessage,
}) {
  /**
   * Handles the keydown event for the textarea.
   * Submits the message when Enter is pressed (without Shift).
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      // e.preventDefault();
      submitNewMessage();
    }
  };

  // Animation classes for the input container
  // Adds a pulse effect when there is text in the input
  const animationClasses = `shadow-[0_10px_5px_rgba(0,0,0,0.25)]${newMessage ? " animate-chatbot-pulse-shadow" : ""}`;

  return (
    // Main input container with styling and animation
    <div
      className={`bg-gray flex items-center pl-5 pr-11 py-4 rounded-3xl relative border border-light-blue/30 ${animationClasses}`}
    >
      {/* Textarea for user message input */}
      <MessageTextarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        isLoading={isLoading}
      />
      {/* Send button, disabled while loading */}
      <MessageSendButton onClick={submitNewMessage} disabled={isLoading} />
    </div>
  );
}

export default MessageInput;
