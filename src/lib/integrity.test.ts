import { describe, expect, it } from "vitest";
import { validateContentIntegrity } from "./integrity";

describe("validateContentIntegrity", () => {
  it("accepts the current content model", () => {
    expect(() => validateContentIntegrity()).not.toThrow();
  });
});
