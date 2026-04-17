import { describe, expect, it } from "vitest";
import { selectKnowledge } from "./shared";

describe("selectKnowledge", () => {
  it("returns F1 knowledge for telemetry queries", () => {
    const matches = selectKnowledge("Tell me about the F1 telemetry system", "projects", "/projects/f1-telemetry");

    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]?.id).toBe("f1-telemetry-knowledge");
  });

  it("boosts page-local knowledge", () => {
    const matches = selectKnowledge("How is this portfolio structured as a product?", "copilot", "/copilot");

    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]?.id).toBe("portfolio-system-knowledge");
  });
});
