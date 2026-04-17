import { ChatRequest, ChatResponse, PublicMetrics } from "../types";

export async function fetchChatResponse(payload: ChatRequest) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ChatResponse | { error?: string };

  if (!response.ok) {
    throw new Error(data && "error" in data && data.error ? data.error : "Chat request failed.");
  }

  return data as ChatResponse;
}

export async function fetchPublicMetrics() {
  const response = await fetch("/api/metrics");

  if (!response.ok) {
    throw new Error("Metrics request failed.");
  }

  return (await response.json()) as PublicMetrics;
}
