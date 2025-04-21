# -*- coding: utf-8 -*-
"""
Test file for the documentManager class.
"""

from src.utils.document_manager import DocumentManager
from src.config.config_url import DOCS_URL


def main():
    # Prueba con documentos locales
    document_manager = DocumentManager(directory_path="./docs")
    print(f"Loaded {len(document_manager.local_documents)} local documents.")
    print(f"Split into {len(document_manager.local_sections)} local sections.")

    # Prueba con documentos web
    web_paths = DOCS_URL
    document_manager_web = DocumentManager(web_paths=web_paths)
    print(f"Loaded {len(document_manager_web.web_documents)} web documents.")
    print(f"Split into {len(document_manager_web.web_sections)} web sections.")

    # print(document_manager_web.web_documents[1])
    # print("Local DOCS Sections:")
    # for section in document_manager.local_sections:
    #     print(
    #         section.page_content[:1000]
    #     )  # Print the first 100 characters of each section

    # print("WEB Sections:")
    # for section in document_manager_web.web_sections:
    #     print(
    #         section.page_content[:100]
    #     )  # Print the first 100 characters of each section


if __name__ == "__main__":
    main()
