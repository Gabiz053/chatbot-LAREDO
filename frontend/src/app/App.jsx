// Main application component
import ExamplePage from "@/pages/ExamplePage.jsx";
import ChatbotWidget from "@/ui/components/ChatbotWidget.jsx";

function App() {
  // Renders the main page and the chatbot portal
  return (
    <>
      <ExamplePage /> {/* Main content page */}
      <ChatbotWidget /> {/* Floating chatbot button + panel */}
    </>
  );
}

export default App;
