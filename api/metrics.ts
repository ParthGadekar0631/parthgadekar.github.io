import { fetchPublicMetricsFromLangfuse } from "./_lib/langfuse";

type RequestLike = {
  method?: string;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
};

export default async function handler(_req: RequestLike, res: ResponseLike) {
  try {
    const metrics = await fetchPublicMetricsFromLangfuse();
    res.status(200).json(metrics);
  } catch {
    res.status(200).json({
      totalChats: 0,
      avgLatencyMs: 0,
      popularModule: "Projects",
      serviceStatus: "Metrics unavailable",
      lastUpdated: new Date().toISOString(),
    });
  }
}
