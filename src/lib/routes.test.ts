import { describe, expect, it } from "vitest";
import { parseRoute } from "./routes";

describe("parseRoute", () => {
  it("parses top-level routes", () => {
    expect(parseRoute("/")).toEqual({ kind: "home" });
    expect(parseRoute("/copilot")).toEqual({ kind: "copilot" });
    expect(parseRoute("/projects")).toEqual({ kind: "projects" });
    expect(parseRoute("/case-studies")).toEqual({ kind: "case-studies" });
    expect(parseRoute("/about")).toEqual({ kind: "about" });
  });

  it("parses detail routes", () => {
    expect(parseRoute("/projects/f1-telemetry")).toEqual({
      kind: "project-detail",
      slug: "f1-telemetry",
    });
    expect(parseRoute("/case-studies/making-telemetry-readable")).toEqual({
      kind: "case-study-detail",
      slug: "making-telemetry-readable",
    });
  });

  it("normalizes trailing slashes", () => {
    expect(parseRoute("/projects/")).toEqual({ kind: "projects" });
    expect(parseRoute("/about/")).toEqual({ kind: "about" });
  });
});
