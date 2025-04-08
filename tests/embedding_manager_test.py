from langchain_core.documents import Document
from src.utils.embedding_manager import EmbeddingManager
from src.utils.key_manager import KeyManager
from src.utils.gemini_model_manager import ModelManager

# Inicializar el KeyManager
key_manager = KeyManager()

# Inicializar el ModelManager y obtener el modelo de embeddings
modelos = ModelManager()
embedding_model = modelos.embeddings  # Asegúrate de que 'embeddings' esté disponible

# Ejemplo de documentos locales y web (reemplaza con tus datos reales)
local_documents = [
    Document(page_content="Contenido del manual 1"),
    Document(page_content="Contenido del manual 2"),
]
web_documents = [
    Document(page_content="Artículo web 1 sobre regresión"),
    Document(page_content="Artículo web 2 sobre regresión"),
]

# Crear una instancia de EmbeddingManager
embedding_manager = EmbeddingManager(
    embedding_model=embedding_model,
    local_documents=local_documents,
    web_documents=web_documents,
    persist_directory="./src/database",  # Directorio donde se almacenará la base de datos Chroma
    reset_database=True,  # Se reiniciará la base de datos
)

# Consultar los embeddings
query = "What is regression?"
results = embedding_manager.query_embeddings(
    query=query, k=1
)  # k=3 para obtener 3 documentos más relevantes

# Imprimir los resultados
for result in results:
    print(result.page_content)
