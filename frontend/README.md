# Laredo Chatbot Frontend

A modern, floating chatbot UI built with React and Tailwind CSS for the LAREDO platform. This project provides a reusable, accessible chatbot widget that can be embedded in any web application.

---

## Project Structure

```
frontend/
├── src/
│   ├── app/                # Main App component
│   ├── assets/             # Static assets (icons, images)
│   ├── core/               # Core logic (API, hooks, chatbot state)
│   ├── pages/              # Example and future pages
│   ├── types/              # Type definitions
│   ├── ui/
│   │   ├── components/     # UI components (chatbot, messages, spinner, etc.)
│   │   └── styles/         # Global and component CSS (Tailwind)
│   └── main.jsx            # React entry point
├── theme/                  # Tailwind theme extensions (colors, animations)
├── index.html              # Main HTML file
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.js          # Vite config
├── package.json            # Project metadata and scripts
├── jsconfig.json           # VSCode/JS path aliases
├── .env.example            # Example environment variables
└── ...                     # Other config files
```

---

## Main Components & Their Roles

- **App.jsx**: Root component, renders the main page and the floating chatbot widget.
- **ChatbotWidget.jsx**: Encapsulates the chatbot portal for easy embedding.
- **ChatbotPortal.jsx**: Manages the floating button and the chatbot panel/modal, including open/close, pinning, and focus.
- **ChatbotPanel.jsx**: The main floating chat panel UI, including controls, messages, and input.
- **ChatbotPanelControls.jsx**: Pin, clear, and close buttons for the chat panel.
- **ChatbotPanelMessagesArea.jsx**: Scrollable area for chat messages, auto-scrolls to the latest.
- **MessageList.jsx / MessageBubble.jsx**: Renders chat messages, including error and loading states.
- **MessageInput.jsx**: Handles user input, send button, and autosizing textarea.
- **Spinner.jsx**: Animated loading spinner for assistant responses.
- **Hooks**: Custom React hooks for autosizing, focus, scroll, and click-outside detection.
- **API Layer**: Handles communication with the backend chatbot API, error handling, and endpoint management.
- **Theme**: Custom Tailwind CSS theme for colors, animations, and keyframes.

---

## How It Works

1. **Floating Button**: A button appears in the bottom-right corner of the page. Clicking it opens the chatbot panel.
2. **Chatbot Panel**: The panel overlays the page, showing previous messages (persisted in localStorage), a welcome message, or the chat interface.
3. **Messaging**: Users type messages in the input area. Pressing Enter or clicking send submits the message.
4. **API Communication**: The frontend sends the message to the backend API (`VITE_API_URL/chatbot`). The assistant's reply is displayed in the chat.
5. **Persistence**: Chat history is saved in localStorage and restored on reload.
6. **Controls**: Users can pin the chat (keep it open), clear the conversation, or close the panel.
7. **Accessibility & UX**: The panel auto-focuses the input, auto-scrolls to new messages, and provides keyboard and screen reader support.

---

## Installation & Setup

### 1. Clone the Repository

```sh
git clone TODO
cd chatbot-laredo/frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and set the backend API URL:

```
VITE_API_URL=http://localhost:20000
```

Adjust the URL to match the backend.

### 4. Start the Development Server

```sh
npm run dev
```

The app will be available at [http://localhost:21000](http://localhost:21000) by default.

---

## Customization

- **Theme & Styles**: Modify `theme/colors.js`, `theme/animations.js`, and `theme/keyframes.js` for branding.
- **API Endpoint**: Set `VITE_API_URL` in your `.env` file.
- **Embedding**: Import and use `<ChatbotWidget />` in your app to add the chatbot.

---

## Scripts

- `npm run dev` – Start development server with hot reload.
- `npm run build` – Build for production.
- `npm run preview` – Preview production build.
- `npm run lint` – Lint code with ESLint.
- `npm run format` – Format code with Prettier.
- `npm run clean` – Remove build output.

---

## License

MIT

---

## Author

Gabriel Gomez Garcia

---

## Notes

- Uses React 18+, Vite, Tailwind CSS, and modern best practices.
- For questions or issues, open an issue on GitHub.
