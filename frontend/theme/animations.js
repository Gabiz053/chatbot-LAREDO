// Custom animation definitions for Tailwind CSS theme extension.
// Maps animation names to their CSS shorthand, referencing keyframes and durations.

const animations = {
  "chatbot-pulse-shadow": "chatbotPulseShadow 4s infinite",
  "chatbot-pulse-shadow-btn": "chatbotPulseShadow 2s infinite",

  "chatbot-spinner": "chatbotSpinner 1.5s linear infinite",
  "chatbot-spinner-delayed": "chatbotSpinner 1.5s linear infinite 0.75s",
  "chatbot-panel-expand":
    "chatbotPanelExpand 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  "chatbot-panel-contract":
    "chatbotPanelContract 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  "chatbot-button-expand":
    "chatbotButtonExpand 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  "chatbot-button-contract":
    "chatbotButtonContract 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  "assistant-message": "assistantMessage 2s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  "brand-name-letter":
    "brandNameLetter 1s cubic-bezier(0.25, 0.1, 0.25, 1.0) both",
};

export default animations;
