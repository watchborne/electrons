// Prepends the "use client" directive to the built JS entry points.
//
// tsup/esbuild's `banner` option can't be used for this: esbuild treats an
// injected banner starting with a string literal as a directive prologue and
// silently drops it once dts generation forces an intermediate re-bundle
// pass ("Module level directives cause errors when bundled"). Every
// component in this package is assumed to run inside a client boundary in
// consuming Next.js App Router apps, so the whole bundle needs the directive
// rather than each source file individually.
import { readFileSync, writeFileSync } from "node:fs";

const DIRECTIVE = '"use client";\n';
const files = ["dist/index.js", "dist/index.cjs"];

for (const file of files) {
  const content = readFileSync(file, "utf8");
  if (!content.startsWith(DIRECTIVE)) {
    writeFileSync(file, DIRECTIVE + content);
  }
}
