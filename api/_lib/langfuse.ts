import { ChatRequest, PublicMetrics } from "../../src/types";
import { basicAuthHeader, createEmptyMetrics, createSpanId } from "./shared";

function getLangfuseConfig() {
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const baseUrl = process.env.LANGFUSE_BASE_URL || "https://cloud.langfuse.com";

  if (!publicKey || !secretKey) {
    return null;
  }

  return {
    publicKey,
    secretKey,
    baseUrl,
  };
}

function toNano(timestampMs: number) {
  return `${timestampMs}000000`;
}

export async function sendTraceToLangfuse({
  traceId,
  payload,
  answer,
  startTime,
  endTime,
}: {
  traceId: string;
  payload: ChatRequest;
  answer: string;
  startTime: number;
  endTime: number;
}) {
  const config = getLangfuseConfig();

  if (!config) {
    return;
  }

  const rootSpanId = createSpanId();
  const generationSpanId = createSpanId();

  const body = {
    resourceSpans: [
      {
        resource: {
          attributes: [
            { key: "service.name", value: { stringValue: "parth-portfolio-copilot" } },
            { key: "deployment.environment", value: { stringValue: "production" } },
          ],
        },
        scopeSpans: [
          {
            scope: {
              name: "portfolio-copilot",
            },
            spans: [
              {
                traceId,
                spanId: rootSpanId,
                name: "portfolio-chat-request",
                kind: 1,
                startTimeUnixNano: toNano(startTime),
                endTimeUnixNano: toNano(endTime),
                attributes: [
                  { key: "langfuse.observation.type", value: { stringValue: "chain" } },
                  { key: "langfuse.observation.input", value: { stringValue: JSON.stringify(payload) } },
                  { key: "langfuse.trace.name", value: { stringValue: "portfolio-chat" } },
                  { key: "langfuse.trace.tags", value: { stringArrayValue: { values: [{ stringValue: payload.module }, { stringValue: payload.page }] } } },
                  { key: "langfuse.user.id", value: { stringValue: "public-visitor" } },
                ],
              },
              {
                traceId,
                parentSpanId: rootSpanId,
                spanId: generationSpanId,
                name: "claude-response",
                kind: 1,
                startTimeUnixNano: toNano(startTime),
                endTimeUnixNano: toNano(endTime),
                attributes: [
                  { key: "langfuse.observation.type", value: { stringValue: "generation" } },
                  { key: "langfuse.observation.input", value: { stringValue: payload.message } },
                  { key: "langfuse.observation.output", value: { stringValue: answer } },
                  { key: "gen_ai.request.model", value: { stringValue: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest" } },
                  { key: "langfuse.prompt.name", value: { stringValue: "portfolio-copilot-v1" } },
                  { key: "langfuse.prompt.version", value: { stringValue: "1" } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  await fetch(`${config.baseUrl}/api/public/otel/v1/traces`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(config.publicKey, config.secretKey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch(() => undefined);
}

export async function fetchPublicMetricsFromLangfuse(): Promise<PublicMetrics> {
  const config = getLangfuseConfig();

  if (!config) {
    return createEmptyMetrics();
  }

  const now = new Date();
  const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const to = now.toISOString();

  const requests = [
    fetch(
      `${config.baseUrl}/api/public/metrics?query=${encodeURIComponent(
        JSON.stringify({
          view: "traces",
          metrics: [{ measure: "count", aggregation: "count" }],
          dimensions: [{ field: "name" }],
          filters: [{ column: "name", operator: "eq", value: "portfolio-chat" }],
          fromTimestamp: from,
          toTimestamp: to,
        }),
      )}`,
      {
        headers: {
          Authorization: basicAuthHeader(config.publicKey, config.secretKey),
        },
      },
    ),
    fetch(
      `${config.baseUrl}/api/public/metrics?query=${encodeURIComponent(
        JSON.stringify({
          view: "observations",
          metrics: [{ measure: "latency", aggregation: "avg" }],
          dimensions: [{ field: "name" }],
          filters: [{ column: "name", operator: "eq", value: "claude-response" }],
          fromTimestamp: from,
          toTimestamp: to,
        }),
      )}`,
      {
        headers: {
          Authorization: basicAuthHeader(config.publicKey, config.secretKey),
        },
      },
    ),
    fetch(
      `${config.baseUrl}/api/public/metrics?query=${encodeURIComponent(
        JSON.stringify({
          view: "traces",
          metrics: [{ measure: "count", aggregation: "count" }],
          dimensions: [{ field: "tags" }],
          filters: [{ column: "name", operator: "eq", value: "portfolio-chat" }],
          fromTimestamp: from,
          toTimestamp: to,
          orderBy: [{ field: "count_count", direction: "desc" }],
          rowLimit: 1,
        }),
      )}`,
      {
        headers: {
          Authorization: basicAuthHeader(config.publicKey, config.secretKey),
        },
      },
    ),
  ];

  const [countResponse, latencyResponse, moduleResponse] = await Promise.all(requests);

  if (!countResponse.ok || !latencyResponse.ok || !moduleResponse.ok) {
    return createEmptyMetrics();
  }

  const countData = (await countResponse.json()) as { data?: Array<Record<string, string>> };
  const latencyData = (await latencyResponse.json()) as { data?: Array<Record<string, string>> };
  const moduleData = (await moduleResponse.json()) as { data?: Array<Record<string, string | string[]>> };

  const totalChats = Number(countData.data?.[0]?.count_count ?? 0);
  const avgLatencyMs = Math.round(Number(latencyData.data?.[0]?.latency_avg ?? 0));
  const topModuleValue = moduleData.data?.[0]?.tags;
  const popularModule = Array.isArray(topModuleValue) ? topModuleValue[0] ?? "AI Copilot" : "AI Copilot";

  return {
    totalChats,
    avgLatencyMs,
    popularModule,
    serviceStatus: "Tracing connected",
    lastUpdated: now.toISOString(),
  };
}
