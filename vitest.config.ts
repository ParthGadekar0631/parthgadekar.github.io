import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "api/**/*.test.ts"],
    exclude: ["portfolio/**", "dist/**", "node_modules/**"],
    environment: "node",
  },
});
