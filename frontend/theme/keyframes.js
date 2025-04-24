// Keyframes for chatbot UI animations used in Tailwind CSS theme extension.
// Each key defines a custom animation for chatbot components.

// Modularized boxShadow values for reuse
const baseShadow = "theme('boxShadow.chatbot')";
const pulseShadow = `${baseShadow}, 0 0 20px 5px theme('colors.light-blue / 0.3'), 0 0 25px 10px theme('colors.light-blue / 0.4')`;
const noShadow = `${baseShadow}, 0 0 0 0 theme('colors.light-blue / 0'), 0 0 0 0 theme('colors.light-blue / 0')`;

const keyframes = {
  // Pulsing shadow effect for chatbot and button (used for attention or activity indication)
  chatbotPulseShadow: {
    // 0%: No shadow (start)
    "0%": {
      boxShadow: noShadow,
    },
    // 30%: Shadow appears (pulse starts)
    "30%": {
      boxShadow: pulseShadow,
    },
    // 60%: Shadow remains (pulse held)
    "60%": {
      boxShadow: pulseShadow,
    },
    // 100%: Shadow disappears (pulse ends)
    "100%": {
      boxShadow: noShadow,
    },
  },

  // Spinner animation for loading indicator in chatbot UI
  chatbotSpinner: {
    // 0%: Spinner is small, visible, with pulsing shadow
    "0%": {
      transform: "scale(0)",
      opacity: 1,
      boxShadow: pulseShadow,
    },
    // 100%: Spinner grows, fades out, shadow disappears
    "100%": {
      transform: "scale(1)",
      opacity: 0,
      boxShadow: noShadow,
    },
  },

  // Panel expand animation for chatbot opening (scales up from bottom right)
  chatbotPanelExpand: {
    // 0%: Collapsed (hidden)
    "0%": { transform: "scale(0)", transformOrigin: "bottom right" },
    // 50%: Slightly overshoots for bounce effect
    "50%": {
      transform: "scale(1.01) translate(-10px, -10px)",
      transformOrigin: "bottom right",
    },
    // 75%: Slightly undershoots for bounce effect
    "75%": {
      transform: "scale(0.99) translate(-5px, -5px)",
      transformOrigin: "bottom right",
    },
    // 100%: Fully expanded in place
    "100%": {
      transform: "scale(1) translate(0px, 0px)",
      transformOrigin: "bottom right",
    },
  },

  // Panel contract animation for chatbot closing (scales down to bottom right)
  chatbotPanelContract: {
    // 0%: Fully expanded
    "0%": { transform: "scale(1)", transformOrigin: "bottom right" },
    // 100%: Collapsed (hidden)
    "100%": { transform: "scale(0)", transformOrigin: "bottom right" },
  },

  // Button expand animation for chatbot button (scales up slightly)
  chatbotButtonExpand: {
    // 0%: Normal size
    "0%": { transform: "scale(1)", transformOrigin: "bottom right" },
    // 100%: Enlarged size
    "100%": { transform: "scale(1.2)", transformOrigin: "bottom right" },
  },

  // Button contract animation for chatbot button (scales down with bounce effect)
  chatbotButtonContract: {
    // 0%: Enlarged size
    "0%": { transform: "scale(1.2)", transformOrigin: "bottom right" },
    // 30%: Slightly smaller with translation
    "30%": {
      transform: "scale(0.99) translate(8px, 8px)",
      transformOrigin: "bottom right",
    },
    // 60%: Slightly larger with translation
    "60%": {
      transform: "scale(1.1) translate(4px, 4px)",
      transformOrigin: "bottom right",
    },
    // 80%: Slightly smaller with no translation
    "80%": {
      transform: "scale(1.05) translate(0px, 0px)",
      transformOrigin: "bottom right",
    },
    // 100%: Normal size
    "100%": { transform: "scale(1)", transformOrigin: "bottom right" },
  },

  // Assistant message fade-in animation para chat aesthetic
  assistantMessage: {
    "0%": {
      opacity: 0,
      transform: "scale(1.2)",
      filter: "blur(6px)",
    },

    "100%": {
      opacity: 1,
      transform: "scale(1)",
      filter: "blur(0)",
    },
  },

  // BrandName letter shadow animation
  brandNameLetter: {
    // 0%: No shadow
    "0%": {
      textShadow: "none",
    },
    "100%": {
      textShadow:
        "0 0 20px theme('colors.light-blue / 0.4'), 0 0 25px theme('colors.light-blue / 0.5')",
    },
  },
};

export default keyframes;
