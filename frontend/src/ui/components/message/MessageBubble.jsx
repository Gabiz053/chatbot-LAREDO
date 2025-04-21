// MessageBubble.jsx
// -----------------------------------------------------------------------------------------------
// Renders a single chat message bubble for either the user or assistant, including error states.
// Uses MessageError for errors and MessageBubbleContent for message content.

import MessageError from "@/ui/components/message/MessageError.jsx";
import Markdown from "react-markdown";

// Common background and shadow for all message bubbles
const commonBgShadow =
  "bg-gray shadow-[0_6px_12px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)]";
// Common bubble shape, padding, and text color (text-chat-white)
const commonBubble = "text-chat-white break-words px-5 py-3 rounded-3xl";

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
        className={`${commonBgShadow} ${commonBubble} max-w-[70%] w-fit ml-auto`}
      >
        <span className="block whitespace-pre-line">{content}</span>
      </div>
    );
  }

  // assistant
  return (
    <div className={`${commonBubble}`}>
      <Markdown className="markdown-container">{content}</Markdown>
    </div>
  );
};

export default MessageBubble;
