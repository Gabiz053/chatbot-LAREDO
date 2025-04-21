import chatIcon from "@/assets/images/icon-chat.svg";

// Standardized button size using Tailwind's w-16 h-16
const BASE_BTN_CLASS =
  "flex items-center justify-center w-16 h-16 rounded-3xl hover:animate-chatbot-pulse-shadow-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-light-blue/80 transition-shadow";
const SHADOW_BTN_CLASS =
  "bg-gray shadow-[0_6px_12px_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)]";

/**
 * ChatbotButton - A reusable floating action button for the chatbot UI.
 *
 * Props:
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional Tailwind or custom classes for styling
 * @param {string} props.icon - Path to the icon image (SVG or other)
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} props.onClick - Handler for button click events
 * @param {string} props.title - Tooltip text for accessibility and hover
 * @param {string} [props.ariaLabel] - Optional aria-label for screen readers (defaults to title)
 *
 * @returns {JSX.Element} A styled button with an icon, accessible and keyboard-friendly
 */
function ChatbotButton({ className = "", icon, onClick, title, ariaLabel }) {
  // Render a button with icon and accessibility features
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BASE_BTN_CLASS} ${SHADOW_BTN_CLASS} ${className}`}
      title={title}
      aria-label={ariaLabel || title}
    >
      {/* Icon image for the button */}
      <img src={icon} className="w-8 h-8" alt="Chat icon" draggable={false} />
    </button>
  );
}

/**
 * ChatbotPanelButton - Floating action button to open the chatbot panel.
 *
 * Usage: Place this component where you want the chatbot open button to appear.
 *
 * Props:
 * @param {Object} props - Component props
 * @param {(e: React.MouseEvent<HTMLButtonElement>) => void} props.onClick - Handler to open the chatbot panel
 *
 * @returns {JSX.Element} The chatbot panel open button
 */
const ChatbotPanelButton = ({ onClick }) => {
  return <ChatbotButton onClick={onClick} icon={chatIcon} title="Open chat" />;
};

export default ChatbotPanelButton;
