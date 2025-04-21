// ChatbotPanel.jsx - Floating Chatbot Panel UI
// ---------------------------------------------------------------
// Main floating panel for the chatbot interface. Contains control buttons,
// the chat area (messages or welcome), and the input area for sending messages.

import ChatbotPanelControls from "./ChatbotPanelControls.jsx";
import ChatbotPanelWelcome from "./ChatbotPanelWelcome.jsx";
import ChatbotPanelMessagesArea from "@/ui/components/chatbot/ChatbotPanelMessagesArea.jsx";
import ChatbotPanelInputArea from "@/ui/components/chatbot/ChatbotPanelInputArea.jsx";

// Frosted glass effect for chatbot panel using custom theme colors
const FROSTED_GLASS_PANEL_CLASS = "backdrop-blur-lg";

const SHADOW_PANEL_CLASS =
  "bg-dark-gray/80 shadow-[0_6px_12px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)]";

/**
 * ChatbotPanel
 *
 * Floating panel UI for the chatbot. Renders controls, messages/welcome, and input.
 *
 * Props:
 * @param {Object} props
 * @param {Array<{role: string, content?: string, error?: boolean}>} props.messages - Chat message history
 * @param {boolean} props.isLoading - Whether the assistant is generating a response
 * @param {(msg: string) => void} props.sendMessage - Function to send a new message
 * @param {boolean} props.pinned - Whether the chat is pinned open
 * @param {() => void} props.onPin - Handler to pin/unpin the chat
 * @param {() => void} props.onClear - Handler to clear the chat history
 * @param {() => void} props.onClose - Handler to close the chat panel
 * @param {React.RefObject<HTMLInputElement>} [props.inputRef] - Ref for focusing the input (optional)
 * @param {React.RefObject<HTMLDivElement>} props.containerRef - Ref for click-outside detection
 */
function ChatbotPanel({
  messages,
  isLoading,
  sendMessage,
  pinned,
  onPin,
  onClear,
  onClose,
  inputRef, // For focusing the input
  containerRef, // For click-outside detection
}) {
  // Decide what to show in the main chat area
  let mainContent;
  if (messages.length > 0) {
    mainContent = (
      <ChatbotPanelMessagesArea messages={messages} isLoading={isLoading} />
    );
  } else {
    mainContent = <ChatbotPanelWelcome />;
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-6 p-6 rounded-3xl ${SHADOW_PANEL_CLASS} ${FROSTED_GLASS_PANEL_CLASS}`}
      style={{
        width: "min(max(480px, 50vw), 900px)",
        height: "90vh",
      }}
    >
      {/* Top control buttons: pin, clear, close */}
      <ChatbotPanelControls
        pinned={pinned}
        onPin={onPin}
        onClear={onClear}
        onClose={onClose}
      />
      {/* Main chat area: welcome or messages */}
      {mainContent}
      {/* Input area for sending new messages */}
      <ChatbotPanelInputArea isLoading={isLoading} sendMessage={sendMessage} />
    </div>
  );
}

export default ChatbotPanel;
