// ChatbotPortal.jsx
// -----------------------------------------------------------------------------
// This component manages the floating chatbot button and the chatbot panel/modal.
// It handles visibility, pinning, focus, and click-outside logic for the chatbot.
// -----------------------------------------------------------------------------

import { useState, useRef } from "react";
import ChatbotPanel from "./ChatbotPanel.jsx";
import ChatbotPanelButton from "./ChatbotPanelButton.jsx";
import useChatbotConversation from "@/core/chatbot/useChatbotConversation.js";
import useClickOutside from "@/core/hooks/useClickOutside.js";
import useFocusOnOpen from "@/core/hooks/useFocusOnOpen.js";

/**
 * ChatbotPortal
 *
 * Renders a floating button that opens a chatbot panel. Handles panel visibility,
 * pinning (to keep the panel open), focus management, and closing on outside click.
 *
 * - When the button is clicked, the chatbot panel appears.
 * - When the panel is open, clicking outside closes it (unless pinned).
 * - The input is auto-focused when the panel opens.
 * - The panel can be pinned to prevent auto-close.
 */
function ChatbotPortal() {
  // State for panel visibility and pinning
  const [isVisible, setIsVisible] = useState(false);
  const [pinned, setPinned] = useState(false);

  // Refs for focus and click-outside detection
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Chatbot conversation state and actions
  const { messages, isLoading, sendMessage, clearChat } =
    useChatbotConversation();

  // Close panel on outside click (unless pinned)
  useClickOutside(
    containerRef,
    () => setIsVisible(false),
    isVisible && !pinned
  );
  // Focus input when panel opens
  useFocusOnOpen(isVisible, inputRef);

  // Toggle pin state
  const handlePin = () => setPinned((p) => !p);
  // Clear chat conversation
  const handleClear = () => clearChat();
  // Close chatbot panel
  const handlePanelClose = () => setIsVisible(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating chatbot panel or button */}
      {isVisible ? (
        <div className="chatbot-portal-panel">
          <ChatbotPanel
            messages={messages}
            isLoading={isLoading}
            sendMessage={sendMessage}
            pinned={pinned}
            onPin={handlePin}
            onClear={handleClear}
            onClose={handlePanelClose}
            inputRef={inputRef}
            containerRef={containerRef}
          />
        </div>
      ) : (
        <div className="chatbot-portal-button">
          <ChatbotPanelButton onClick={() => setIsVisible(true)} />
        </div>
      )}
    </div>
  );
}

export default ChatbotPortal;
