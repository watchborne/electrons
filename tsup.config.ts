import { defineConfig } from "tsup";

import pkg from "./package.json";

// Every runtime dependency is left external (resolved from the consumer's
// node_modules) rather than bundled in, so this package's own output stays
// small and consumers dedupe on their own copy of React/Radix.
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
];

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external,
  // NOTE: tsup/esbuild's `banner` option cannot be used to add "use client"
  // here — esbuild treats an injected banner starting with a string literal
  // as a directive prologue and silently drops it ("Module level directives
  // cause errors when bundled") once dts/treeshake forces an intermediate
  // re-bundle pass. The directive is prepended post-build instead, see
  // scripts/prepend-use-client.mjs and the "build" script in package.json.
});
