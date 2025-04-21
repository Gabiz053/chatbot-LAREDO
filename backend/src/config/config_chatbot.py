from langchain.prompts import PromptTemplate

# Define the prompt templates
SUMMARY_PROMPT = PromptTemplate(
    input_variables=["summary"],
    template="""
Conversation Background:

<summary>{summary}</summary>

This background highlights the key points and progression of our discussion so far.

Response Guidelines:
1. Use the provided background to fully understand the current context of the conversation.
2. Respond to the upcoming question or continue the discussion in a way that aligns with the established context, without referencing the background.
3. Avoid reiterating details that have already been covered.
4. If a new topic is introduced, address it independently of the provided background.
""",
)

RECENT_MESSAGES_PROMPT = PromptTemplate(
    input_variables=["messages"],
    template="""
Conversation Background:

<messages>{messages}</messages>

This background highlights the key points and progression of our discussion so far.

Response Guidelines:
1. Use the provided background to fully understand the current context of the conversation.
2. Respond to the upcoming question or continue the discussion in a way that aligns with the established context, without referencing the background.
3. Avoid reiterating details that have already been covered.
4. If the user expresses uncertainty or confusion, refer to the recent messages for context to understand.
5. If a new topic is introduced, address it independently of the provided background.
""",
)

ANSWER_PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""
Context provided for the answer:

<context>{context}</context>

Question:
<question>{question}</question>

Response Instructions:
1. Use the provided context to answer the question accurately and clearly.
2. Address only the topics present in the context, unless the question is personal.
3. If the context does not provide enough information to answer, respond to it with your knoweledge. If unable to find relevant information, indicate that you are unable to answer at the moment.
4. Provide friendly, detailed explanations and break down concepts so that the answer is easy to understand.
5. Answer directly using Markdown formatting (headers, lists, code blocks, etc.) to enhance readability.
6. Do not invent details or hallucinate; rely on the given context and any additional information found during your search.
7. If the question appears ambiguous, review previous messages and the context to clarify its intent before answering.
8. Maintain a warm, engaging tone throughout the response.
""",
)

SUMMARIZATION_PROMPT = PromptTemplate(
    input_variables=["summary", "messages"],
    template="""
Previous Conversation Summary:

<summary>{summary}</summary>

Instructions to Update the Summary:
1. Review the current summary to capture the key points and overall flow of the conversation.
2. Read the new messages below and update the summary to include any new topics, details, or shifts in the discussion.
3. Ensure the updated summary is clear, coherent, and maintains a logical order.
4. Avoid unnecessary repetition unless it is essential for maintaining context.
5. Keep the summary concise yet comprehensive, focusing on the main topics and developments.
6. Integrate any significant new points clearly into the updated summary.

New Messages:
<messages>{messages}</messages>
""",
)
