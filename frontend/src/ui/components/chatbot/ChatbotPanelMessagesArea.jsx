// ChatbotPanelMessagesArea.jsx
// ---------------------------------------------
// This component renders the scrollable area containing all chatbot messages.
// It automatically scrolls to the bottom when new messages arrive or loading state changes.

import MessageList from "@/ui/components/message/MessageList.jsx";
import useAutoScroll from "@/core/hooks/useScrollToBottom.js";

/**
 * ChatbotPanelMessagesArea
 *
 * Provides a scrollable container for chatbot messages and ensures the view
 * auto-scrolls to the latest message or loading indicator.
 * @param {{ messages: Array<any>, isLoading: boolean }} props
 * @param {Object} props
 * @param {Array<Object>} props.messages - Array of message objects to display.
 * @param {boolean} props.isLoading - Whether a message is currently being sent/received.
 * @returns {JSX.Element}
 */
function ChatbotPanelMessagesArea({ messages, isLoading }) {
  // Ref that triggers auto-scroll when messages or loading state change
  const scrollContentRef = useAutoScroll([messages.length, isLoading]);

  return (
    <div
      className="flex-1 overflow-auto overflow-y-auto overflow-x-hidden pr-3"
      ref={scrollContentRef}
    >
      {/* Renders the list of chat messages and loading indicator if needed */}
      <MessageList messages={messages} isLoading={isLoading} />
    </div>
  );
}

export default ChatbotPanelMessagesArea;
