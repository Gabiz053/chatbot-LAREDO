// MessageList.jsx - Chat message list for the chatbot UI
// ------------------------------------------------------
// Renders all chat messages and a loading indicator when the assistant is thinking.
// MessageList solo mapea mensajes a MessageBubble, la lógica de rol está en MessageBubble

import MessageBubble from "./MessageBubble.jsx";
import MessageLoading from "./MessageLoading.jsx";

/**
 * @typedef {Object} Message
 * @property {"user"|"assistant"} role - Who sent the message
 * @property {string} [content] - The message text
 * @property {boolean} [error] - If true, message is an error (assistant only)
 */

/**
 * MessageList Component
 *
 * Displays a vertical list of chat messages. If the assistant is generating a response
 * (isLoading), shows a loading indicator at the end of the list.
 *
 * @param {{ messages: Message[], isLoading: boolean }} props
 * @returns {JSX.Element}
 */
function MessageList({ messages, isLoading }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Render each chat message as a bubble */}
      {messages.map((m, i) => (
        <MessageBubble
          key={i}
          role={m.role}
          content={m.content || ""}
          error={!!m.error}
        />
      ))}
      {/* Show the loading indicator if the assistant is thinking */}
      {isLoading && <MessageLoading />}
    </div>
  );
}

export default MessageList;
