import { ChatRequest, ChatResponse } from "../../src/types";
import { buildCitations, buildFallbackAnswer, selectKnowledge, suggestedPrompts } from "./shared";

type AnthropicContentBlock = {
  type: string;
  text?: string;
};

type AnthropicMessageResponse = {
  content?: AnthropicContentBlock[];
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
};

function extractText(response: AnthropicMessageResponse) {
  return (response.content ?? [])
    .filter((item) => item.type === "text" && item.text)
    .map((item) => item.text as string)
    .join("\n");
}

export async function getCopilotResponse(payload: ChatRequest, traceId: string): Promise<ChatResponse> {
  const selectedDocs = selectKnowledge(payload.message, payload.module, payload.page);
  const citations = buildCitations(selectedDocs);
  const fallback = buildFallbackAnswer(payload.message, selectedDocs);

  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      answer: fallback,
      citations,
      suggestedPrompts,
      traceId,
    };
  }

  const promptContext = selectedDocs
    .map(
      (document, index) =>
        `[Doc ${index + 1}] ${document.title}\nPath: ${document.path}\nSummary: ${document.summary}\nContent: ${document.content}`,
    )
    .join("\n\n");

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
      max_tokens: 700,
      system:
        "You are the portfolio copilot for Parth Gadekar. Answer in first person as Parth. Stay factual, concise, and grounded in the provided documents. If the answer is uncertain, say so directly. Do not invent achievements. Avoid markdown tables. Prefer short paragraphs or bullets. Mention only the supplied evidence.",
      messages: [
        ...payload.history.slice(-6).map((item) => ({
          role: item.role,
          content: item.text,
        })),
        {
          role: "user",
          content:
            `Current module: ${payload.module}\nCurrent page: ${payload.page}\n\n` +
            `Relevant documents:\n${promptContext}\n\n` +
            `User question: ${payload.message}\n\n` +
            `Answer as Parth. Keep it specific and grounded in the documents.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return {
      answer: fallback,
      citations,
      suggestedPrompts,
      traceId,
    };
  }

  const data = (await response.json()) as AnthropicMessageResponse;
  const answer = extractText(data).trim() || fallback;

  return {
    answer,
    citations,
    suggestedPrompts,
    traceId,
  };
}
