import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    reporters:
      process.env.GITHUB_ACTIONS === "true"
        ? [
            "tree",
            [
              "github-actions",
              {
                onWritePath: (path) => path.replace(/^\/app\//, `${process.env.GITHUB_WORKSPACE}/`),
              },
            ],
          ]
        : ["tree"],
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
