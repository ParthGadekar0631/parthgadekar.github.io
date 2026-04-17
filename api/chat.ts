import { getCopilotResponse } from "./_lib/anthropic";
import { sendTraceToLangfuse } from "./_lib/langfuse";
import { createTraceId } from "./_lib/shared";
import { ChatRequest } from "../src/types";

type RequestLike = {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const payload = req.body as ChatRequest;

  if (!payload || typeof payload.message !== "string" || payload.message.trim().length < 2) {
    res.status(400).json({ error: "A non-empty message is required." });
    return;
  }

  const traceId = createTraceId();
  const startTime = Date.now();

  try {
    const response = await getCopilotResponse(payload, traceId);
    const endTime = Date.now();

    void sendTraceToLangfuse({
      traceId,
      payload,
      answer: response.answer,
      startTime,
      endTime,
    });

    res.status(200).json(response);
  } catch {
    res.status(200).json({
      answer:
        "The Claude copilot is unavailable right now, but the portfolio routing and curated content remain available. Explore the Projects, Experience, and Skills routes for grounded detail.",
      citations: [],
      suggestedPrompts: [
        "Tell me about the F1 telemetry project.",
        "What roles is Parth targeting?",
        "Why is observability a recurring theme here?",
      ],
      traceId,
    });
  }
}
