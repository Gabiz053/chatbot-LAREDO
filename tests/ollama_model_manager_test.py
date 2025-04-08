# -*- coding: utf-8 -*-
"""
Test file for the ModelManager2 class.
"""

from src.utils.ollama_model_manager import ModelManager


def main():
    # Create a ModelManager instance
    model_manager = ModelManager()

    # Test the LLM model
    test_prompt = "Hello, how are you?"
    response = model_manager.llm.invoke([{"role": "user", "content": test_prompt}])
    print(f"LLM Response: {response}")

    # Test the embeddings model
    test_embedding = model_manager.embeddings.embed_query("What's our Q1 revenue?")
    print(f"Embedding Sample: {test_embedding[:10]}")


if __name__ == "__main__":
    main()
