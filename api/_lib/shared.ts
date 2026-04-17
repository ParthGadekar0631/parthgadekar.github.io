import { knowledgeDocuments, suggestedPrompts } from "../../src/content/knowledge";
import { moduleConfigs, publicMetricsSeed } from "../../src/content/site";
import { Citation, KnowledgeDocument, PublicMetrics } from "../../src/types";

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "what",
  "why",
  "with",
  "you",
]);

export { knowledgeDocuments, moduleConfigs, publicMetricsSeed, suggestedPrompts };

export function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

export function scoreKnowledgeDocument(document: KnowledgeDocument, query: string, moduleId: string, page: string) {
  const queryTokens = tokenize(query);
  const documentTokens = new Set(tokenize(`${document.title} ${document.summary} ${document.content} ${document.tags.join(" ")}`));

  let score = 0;

  for (const token of queryTokens) {
    if (documentTokens.has(token)) {
      score += 3;
    }
  }

  if (document.moduleId === moduleId) {
    score += 4;
  }

  if (page === document.path) {
    score += 6;
  }

  if (document.path.includes(page) || page.includes(document.path)) {
    score += 2;
  }

  return score;
}

export function selectKnowledge(query: string, moduleId: string, page: string) {
  return knowledgeDocuments
    .map((document) => ({
      document,
      score: scoreKnowledgeDocument(document, query, moduleId, page),
    }))
    .sort((left, right) => right.score - left.score)
    .filter((entry) => entry.score > 0)
    .slice(0, 4)
    .map((entry) => entry.document);
}

export function buildCitations(documents: KnowledgeDocument[]): Citation[] {
  return documents.map((document) => ({
    title: document.title,
    path: document.path,
  }));
}

export function buildFallbackAnswer(query: string, documents: KnowledgeDocument[]) {
  if (documents.length === 0) {
    return `I do not have a strong curated answer for "${query}" yet. Try asking about the F1 telemetry project, distributed pipelines, work experience, or core skills.`;
  }

  const summary = documents
    .map((document) => `${document.title}: ${document.summary}`)
    .join(" ");

  return `Based on the strongest matching portfolio documents, here is the concise answer: ${summary}`;
}

export function basicAuthHeader(publicKey: string, secretKey: string) {
  const token = Buffer.from(`${publicKey}:${secretKey}`).toString("base64");
  return `Basic ${token}`;
}

export function createTraceId() {
  return crypto.randomUUID().replace(/-/g, "");
}

export function createSpanId() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
}

export function createEmptyMetrics(): PublicMetrics {
  return {
    ...publicMetricsSeed,
    lastUpdated: new Date().toISOString(),
  };
}
