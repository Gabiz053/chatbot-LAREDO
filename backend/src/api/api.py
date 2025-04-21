from flask import Flask, jsonify, request
from flask_cors import CORS
from src.api.chatbot_service import ChatbotService

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS globally (can be fine-tuned)

    chatbot_service = ChatbotService()

    @app.route("/chatbot", methods=["POST"])
    async def chatbot_endpoint():
        try:
            # Get the data from the request
            data = request.json

            # Validate input data
            if not data or "question" not in data or not isinstance(data["question"], str):
                return jsonify({"error": "A valid 'question' (string) is required"}), 400

            question = data["question"]

            # Call the asynchronous service method to generate a response
            response = await chatbot_service.generate_response(question)

            # Ensure the response is in the correct format for frontend
            return jsonify({"answer": response}), 200

        except Exception as e:
            # Return a general error message with a 500 status code if anything goes wrong
            return jsonify({"error": str(e)}), 500

    # Define a simple GET endpoint at /hello that returns a greeting
    @app.route("/hello", methods=["GET"])
    def saludo():
        return jsonify({"mensaje": "Hello, I'm working", "version": "1.0"}), 200

    return app

# Run the Flask application
app = create_app()

if __name__ == "__main__":
    app.run(port=20000, debug=True)
