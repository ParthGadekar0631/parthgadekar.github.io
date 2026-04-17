import { describe, expect, it } from "vitest";
import { parseRoute } from "./routes";

describe("parseRoute", () => {
  it("parses top-level routes", () => {
    expect(parseRoute("/")).toEqual({ kind: "home" });
    expect(parseRoute("/experience")).toEqual({ kind: "experience" });
    expect(parseRoute("/projects")).toEqual({ kind: "projects" });
    expect(parseRoute("/skills")).toEqual({ kind: "skills" });
    expect(parseRoute("/education")).toEqual({ kind: "education" });
    expect(parseRoute("/contact")).toEqual({ kind: "contact" });
  });

  it("parses detail routes", () => {
    expect(parseRoute("/projects/f1-telemetry")).toEqual({
      kind: "project-detail",
      slug: "f1-telemetry",
    });
  });

  it("normalizes trailing slashes", () => {
    expect(parseRoute("/projects/")).toEqual({ kind: "projects" });
    expect(parseRoute("/contact/")).toEqual({ kind: "contact" });
  });
});
