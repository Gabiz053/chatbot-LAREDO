// MessageBubble.jsx
// -----------------------------------------------------------------------------------------------
// Renders a single chat message bubble for either the user or assistant, including error states.
// Uses MessageError for errors and MessageBubbleContent for message content.

import MessageError from "@/ui/components/message/MessageError.jsx";
import Markdown from "react-markdown";

// Common background and shadow for all message bubbles
const SHADOW_CHAT =
  "bg-gray shadow-chatbot";
// Common bubble shape, padding, and text color (text-chat-white)
const COMMON_STYLE = "text-chat-white break-words px-5 py-3 rounded-3xl";

/**
 * MessageBubble Component
 *
 * Renders a chat message bubble for either the user or assistant.
 *
 * @component
 * @param {Object} props - Component props
 * @param {"user"|"assistant"} props.role - The role of the message sender
 * @param {string} props.content - The message content
 * @param {boolean} props.error - Whether the message is an error
 * @returns {JSX.Element}
 */
const MessageBubble = ({ role, content, error }) => {
  if (error) return <MessageError />;

  if (role === "user") {
    return (
      <div
        className={`${SHADOW_CHAT} ${COMMON_STYLE} max-w-[70%] w-fit ml-auto`}
      >
        <span className="block whitespace-pre-line">{content}</span>
      </div>
    );
  }

  // assistant
  return (
    <div className={`${COMMON_STYLE}`}>
      <Markdown className="markdown-container">{content}</Markdown>
    </div>
  );
};

export default MessageBubble;
