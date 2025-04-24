from langchain.prompts import PromptTemplate

# -----------------------------
# Prompt Templates for Chatbot
# -----------------------------

# 1. Answer Prompt (Improved)
ANSWER_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""
    
Always use Markdown format in your response (headings, lists, code blocks, etc.) as much as possible.
Respond in the same language as the question.

Relevant information for answering:

<context>{context}</context>

User question:
<question>{question}</question>

Instructions for the answer:
1. Respond clearly, precisely, and based on the information provided in the context. (Do not say you are using the context to answer. just answer.)
2. If the information is insufficient, kindly indicate that you do not know.
2. If the information is insufficient, kindly indicate this and suggest how the user can get a better answer.
3. Maintain a warm, professional, and empathetic tone at all times.
4. Avoid repeating the question and do not include irrelevant information.
5. You may use your own knowledge only if it is directly related to the topic.
""",
)

# 2. Recent Messages Prompt (Improved)
RECENT_MESSAGES_PROMPT = PromptTemplate(
    input_variables=["messages"],
    template="""
Recent conversation history:

<messages>{messages}</messages>

This history summarizes the key points and the development of the conversation so far.

Guidelines for the answer:
1. If the user asks about the last message, requests more details, or expresses confusion (e.g., "can you explain more?", "I don't understand", "please clarify"), use the recent conversation history to understand what they are referring to and provide a relevant, coherent response. If you are unsure, use last message as a reference.
4. If the user shows doubts or confusion, use the history to clarify or revisit the topic.
5. If a new topic arises, address it independently, without relying on the history.
6. Keep your response aligned with the flow and tone of the previous conversation.
""",
)

# 3. Summary Prompt (Improved, summary is optional)
SUMMARY_PROMPT = PromptTemplate(
    input_variables=["summary"],
    template="""
Conversation summary:

<summary>{summary}</summary>

This summary highlights the main points and the evolution of the conversation.

Guidelines for the answer:
1. You may use the summary to understand the general context before responding, but it is not always required.
2. Respond consistently with the previous development, without repeating unnecessary details.
3. If a new topic is introduced, address it clearly and separately from the summary.
""",
)

# 4. Summarization Prompt (Improved, LLM-oriented)
SUMMARIZATION_PROMPT = PromptTemplate(
    input_variables=["summary", "messages"],
    template="""
Previous conversation summary:

<summary>{summary}</summary>

New recent messages:
<messages>{messages}</messages>

Instructions to update the summary:
1. Read the current summary and the new messages to identify important topics, details, or changes.
2. Update the summary by integrating the new points clearly and in order.
3. Avoid unnecessary repetition and keep the summary brief but complete.
4. Ensure the summary accurately reflects the development and main topics of the conversation.
5. Use language that is clear, unambiguous, and easy for a language model to process. Focus on structure and explicitness rather than naturalness for humans.
""",
)
