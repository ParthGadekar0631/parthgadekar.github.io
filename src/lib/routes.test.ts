import { describe, expect, it } from "vitest";
import { parseRoute } from "./routes";

describe("parseRoute", () => {
  it("parses top-level routes", () => {
    expect(parseRoute("/")).toEqual({ kind: "about" });
    expect(parseRoute("/about")).toEqual({ kind: "about" });
    expect(parseRoute("/projects")).toEqual({ kind: "projects" });
    expect(parseRoute("/credentials")).toEqual({ kind: "credentials" });
    expect(parseRoute("/experience")).toEqual({ kind: "credentials" });
    expect(parseRoute("/skills")).toEqual({ kind: "credentials" });
    expect(parseRoute("/education")).toEqual({ kind: "credentials" });
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
