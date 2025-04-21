/**
 * ChatbotPanelWelcome
 * Renders a welcome message and brief instructions for the LAREDO chatbot assistant.
 *
 * This component is intended to be shown when the chatbot panel is opened and no conversation has started yet.
 */
function ChatbotPanelWelcome() {
  return (
    <div className="flex-1 overflow-auto text-light-blue text-xl font-light space-y-2 ">
      <p aria-label="Hello" role="img">
        👋 Hello!
      </p>
      <p>
        I am your conversational assistant, powered by LAREDO, an advanced tool
        for building AI-powered workflows.
      </p>
      <p>
        I can help you create and manage workflows, or answer questions about
        how to use LAREDO.
      </p>
      <p>How can I assist you today?</p>
    </div>
  );
}

export default ChatbotPanelWelcome;
