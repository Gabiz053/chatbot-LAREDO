// Component encapsulated to import the chatbot into the app
import ChatbotPortal from "@/ui/components/chatbot/ChatbotPortal.jsx";

// Allows passing the backend URL as a prop (defaults to localhost)
function ChatbotWidget({ apiUrl = "http://localhost:20000" }) {
  return <ChatbotPortal apiUrl={apiUrl} />;
}

export default ChatbotWidget;
