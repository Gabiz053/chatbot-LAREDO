"""
api.py - Main Flask API for the chatbot backend
------------------------------------------------
Defines endpoints for synchronous and streaming chatbot responses.
Includes CORS support and modular helpers for validation and error handling.
"""

from flask import Flask, jsonify, request, Response
from flask_cors import CORS
from src.api.chatbot_service import ChatbotService
import asyncio


def _get_question_from_request():
    """
    Extracts and validates the 'question' field from the incoming JSON request.
    Returns (question, error_response, status_code).
    """
    data = request.json
    if not data or "question" not in data or not isinstance(data["question"], str):
        return None, jsonify({"error": "A valid 'question' (string) is required"}), 400
    return data["question"], None, None


def _handle_exception(e):
    """
    Returns a JSON error response for any exception.
    """
    return jsonify({"error": str(e)}), 500


def create_app():
    """
    Creates and configures the Flask app, including all chatbot endpoints.
    """
    app = Flask(__name__)
    CORS(app)  # Enable CORS globally (can be fine-tuned)

    chatbot_service = ChatbotService()

    @app.route("/chatbot", methods=["POST"])
    async def chatbot_endpoint():
        """
        Synchronous endpoint: returns the full chatbot response as JSON.
        """
        try:
            question, error_response, status = _get_question_from_request()
            if error_response:
                return error_response, status
            response = await chatbot_service.generate_response(question)
            return jsonify({"answer": response}), 200
        except Exception as e:
            return _handle_exception(e)

    @app.route("/chatbot/stream", methods=["POST"])
    def chatbot_stream_endpoint():
        """
        Streaming endpoint: returns the chatbot response in real time using SSE.
        """
        try:
            question, error_response, status = _get_question_from_request()
            if error_response:
                return error_response, status

            # Async generator yielding SSE-formatted chunks from the chatbot service
            async def async_event_stream():
                async for chunk in chatbot_service.generate_response_stream(question):
                    yield chunk

            # Sync generator bridging async generator to Flask's streaming response
            def sync_event_stream():
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                agen = async_event_stream()
                try:
                    while True:
                        chunk = loop.run_until_complete(agen.__anext__())
                        # print(f"[SSE CHUNK SENT]: {repr(chunk)}")  # Debug: print each chunk before sending
                        yield chunk  # Each chunk is already SSE-formatted ("data: ...\n\n")
                except StopAsyncIteration:
                    pass
                finally:
                    loop.close()

            # Return a streaming response with the correct SSE mimetype
            return Response(sync_event_stream(), mimetype="text/event-stream")
        except Exception as e:
            return _handle_exception(e)

    @app.route("/hello", methods=["GET"])
    def saludo():
        """
        Simple health check endpoint.
        """
        return jsonify({"mensaje": "Hello, I'm working", "version": "1.0"}), 200

    return app


# Entrypoint for running the Flask application
app = create_app()

if __name__ == "__main__":
    app.run(port=20000, debug=True)
