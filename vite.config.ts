import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const repository = env.GITHUB_REPOSITORY?.split("/")[1];
const owner = env.GITHUB_REPOSITORY?.split("/")[0]?.toLowerCase();
const isUserSite = repository?.toLowerCase() === `${owner}.github.io`;
const base = env.GITHUB_ACTIONS ? (isUserSite ? "/" : `/${repository}/`) : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
