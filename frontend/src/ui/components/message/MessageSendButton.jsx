// MessageSendButton.jsx - Modularized send button for chat input
// -------------------------------------------------------------
// Renders a button with a send icon, used to submit chat messages.

import sendIcon from "@/assets/images/icon-send.svg";

/**
 * MessageSendButton Component
 *
 * @param {Object} props - Component props
 * @param {() => void} props.onClick - Function to call when the button is clicked
 * @param {boolean} [props.disabled] - If true, disables the button
 * @returns {JSX.Element}
 */
function MessageSendButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="absolute top-1/2 -translate-y-1/2 right-5 disabled:opacity-50 flex items-center"
      onClick={onClick}
      disabled={disabled}
      aria-label="Send message"
    >
      <img src={sendIcon} alt="Send" className="h-5 w-5" draggable="false" />
    </button>
  );
}

export default MessageSendButton;
