// Keyframes for chatbot UI animations used in Tailwind CSS theme extension.
// Each key defines a custom animation for chatbot components.

// Modularized boxShadow values for reuse
const pulseShadow ="0 0 20px 5px theme('colors.light-blue / 0.3'), 0 0 25px 10px theme('colors.light-blue / 0.3')";
const noShadow = "0 0 0 0 theme('colors.light-blue / 0')";

export default {
  // Animation for opening the chatbot without bounce effect.
  chatbotPop: {
    "0%": {
      transform: "scale(0.7) translateY(40px)",
      opacity: 0,
    },
    "100%": {
      transform: "scale(1) translateY(0)",
      opacity: 1,
    },
  },

  // Animation for pulsing shadow effect around the chatbot and button.
  chatbotPulseShadow: {
    // Start: no shadow
    "0%": {
      boxShadow: noShadow,
    },
    // Middle: visible shadow (maintain longer)
    "30%": {
      boxShadow: pulseShadow,
    },
    // Hold the shadow longer
    "60%": {
      boxShadow: pulseShadow,
    },
    // End: back to no shadow
    "100%": {
      boxShadow: noShadow,
    },
  },

  // Animation for spinner effect used in the chatbot UI.
  chatbotSpinner: {
    "0%": {
      transform: "scale(0)",
      opacity: 1,
      boxShadow: pulseShadow,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0,
      boxShadow: noShadow,
    },
  },
};
