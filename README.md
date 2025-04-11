# Chatbot LAREDO

## Description
Chatbot LAREDO is a modular application designed to integrate document management, chatbot functionality, and advanced language model capabilities. The project is structured to facilitate the creation of a chatbot that can process local and web-based documents, generate responses, and provide contextual answers.

---

## Project Structure

```
├── docs/                    # Documentation for the app (guides, reports, etc.)
├── src/                     # Source code for the application
│   ├── chatbot/             # Core chatbot logic and initialization
│   ├── config/              # Configuration files for parameters, URLs, and settings
│   └── utils/               # Utility modules for document loading, logging, and more
├── tests/                   # Unit and integration tests for the project
├── main.py                  # Main script to run the application
├── README.md                # Project documentation (this file)
├── requirements.txt         # Dependencies required to run the project
└── init.bat                 # Script to adjust PYTHONPATH if needed
```

---

## Detailed Folder and File Descriptions

### `docs/`
Contains documentation related to the app, such as user guides, reports, and any other relevant materials.

---

### `src/`
The main source code for the application is organized into three subfolders:

#### `chatbot/`
This folder contains all the classes and logic required to build and run the chatbot:
- **`chat_initializer.py`**: Initializes the chatbot's core components.
- **`core_initializer.py`**: Sets up the key components of the application, such as models, embeddings, and document management.
- **`graph_initializer.py`**: Manages the chatbot's state graph, including search, answer generation, and summarization.
- **`evaluators.py`**: Implements evaluation metrics like BLEU and ROUGE-L for assessing chatbot responses.
- **`example_creation.py`**: Contains example prompts and templates for chatbot interactions.
- **`main.py`**: The entry point for running the chatbot.

#### `config/`
Defines configuration parameters for the application:
- **`config_chatbot.py`**: Contains prompt templates and chatbot-specific settings.
- **`config_init.py`**: Defines configurations for document splitting, LLM settings, and embeddings.
- **`config_url.py`**: Stores URLs for web-based documents used by the application.

#### `utils/`
Provides utility classes and functions to support the application:
- **`directory_loader.py`**: Handles loading of local Markdown documents from a specified directory.
- **`document_manager.py`**: Manages the loading, splitting, and organization of local and web documents.
- **`embedding_manager.py`**: Manages embeddings for document retrieval and similarity searches.
- **`gemini_model_manager.py`**: Initializes and manages the Gemini language model and embeddings.
- **`key_manager.py`**: Reads, validates, and stores API keys in the system environment.
- **`logger_manager.py`**: Configures and initializes the logging system using Loguru.
- **`web_loader.py`**: Fetches and processes web pages, converting them into Markdown documents.

---

### `tests/`
Contains unit and integration tests for validating the functionality of the application:
- **`document_manager_test.py`**: Tests the `DocumentManager` class for loading and splitting documents.
- **`keys_manager_test.py`**: Verifies the functionality of the `KeyManager` for handling API keys.

---

### `main.py`
The main script to run the application. It initializes the core components and starts the chatbot.

---

### `requirements.txt`
Lists all the dependencies required to run the project. Install them using:
```bash
pip install -r requirements.txt
```

---

### `init.bat`
A script to adjust the `PYTHONPATH` if necessary. This ensures that the application can locate all modules correctly.

---

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies:
   
   First, make sure you have develep for desktop(7gb): https://visualstudio.microsoft.com/es/visual-cpp-build-tools/
   ```bash
   pip install -r requirements.txt
   ```

3. Adjust the `PYTHONPATH` if needed:
   ```bash
   init.bat
   ```

4. Run the application:
   ```bash
   python main.py
   ```

---

## Key Features

- **Document Management**: Load and split local Markdown files and web-based documents for processing.
- **Chatbot Integration**: A modular chatbot capable of generating responses based on local and web contexts.
- **Evaluation Metrics**: BLEU and ROUGE-L metrics for assessing chatbot responses.
- **Extensibility**: Easily configurable components for adapting to different use cases.

---

## Troubleshooting

### PYTHONPATH Issues
If you encounter issues with module imports, ensure that the `PYTHONPATH` is correctly set. Use the `init.bat` script to adjust it automatically.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.