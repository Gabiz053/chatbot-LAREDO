# LaredocMind

## Description
LaredocMind is an intelligent chatbot platform that enables users to interact with documents and data through a modern web interface and a powerful backend. The application consists of two main parts:
- **Frontend:** User interface built with React and Tailwind CSS.
- **Backend:** Python-based REST API that handles conversational logic, document processing, and AI model integration.

This solution is designed to facilitate information retrieval, analysis, and management, allowing users to get contextual and accurate answers from their own documents.

---

## Quick Setup & Run

### Prerequisites
- **Python 3.13+** for the backend.
- **Node.js** (v22 or higher) aditional tools option not needed.

### 1. Clone the repository and enter the main folder
```sh
cd LaredocMind
```

### 2. Configure environment variables
- Copy `.env.example` to `.env` in both the `backend` and `frontend` directories and fill in the required values.

### 3. Automatic installation (recommended)
Run the following script from the project root to install dependencies and set up both environments:
```sh
setup_app.bat
```
This will open two terminals: one for the backend and one for the frontend. Follow the instructions in each window.

### 4. Running the application
To start the full application in development mode:
```sh
run-app.bat
```
This will open two terminals: one running the backend and the other running the frontend.

---

## Project Structure
```
chatbot-laredo/
├── backend/         # API, business logic, and data processing
├── frontend/        # Web interface and chat widget
├── run-app.bat      # Script to run the entire app
├── setup_app.bat    # Script to install dependencies for both environments
└── LICENSE          # MIT License
```

- See the `README.md` files in `backend/` and `frontend/` for technical details and troubleshooting specific to each part.

---

## Basic Usage
1. Access the web interface at [http://localhost:22000](http://localhost:22000) (or your configured port).
2. Interact with the chatbot, upload documents, and explore available models.
3. Check the documentation in `backend/docs/` for user guides and advanced details.

---

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute the software as long as you retain the copyright notice.

See the `LICENSE` file for more information.
