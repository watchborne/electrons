# CLAUDE.md

Guidance for AI coding agents working in this repository.

## What this is

`watchborne-design-system` — a standalone React component library
(`@watchborne/design-system`), published to GitHub Packages, holding the UI
primitives and design tokens shared across watchborne front-end apps. It is
not a Next.js app: it has no routes, no pages, and no server — it only
exports React components, a Tailwind preset, and a CSS tokens file for other
apps (currently `charge-points-frontend`) to consume.

Stack: React 18/19 (peer dependency, works with either), TypeScript (strict),
Tailwind utility classes (no Tailwind dependency itself — consumers bring
their own Tailwind build), Radix UI primitives, `class-variance-authority`,
`classnames`. Built with `tsup` (ESM + CJS + `.d.ts`). Tests: Vitest +
Testing Library.

## Layout

```
src/
  components/          # one component (or a small related family) per file,
                        #   kebab-case filenames, mirrors the source layout
                        #   in charge-points-frontend's components/ui/*
    __tests__/          # vitest + Testing Library, excluded from tsconfig build
  styles/
    tokens.css          # design tokens (CSS variables), copied verbatim from
                        #   charge-points-frontend's app/design-system/tokens.css
  index.ts              # the package's public API — every exported symbol
                        #   must be re-exported from here
tailwind-preset.js       # Tailwind `theme.extend` consumers plug in via
                        #   `presets: [require("@watchborne/design-system/tailwind-preset")]`
tsup.config.ts           # build config — bundles src/index.ts to dist/, banners
                        #   the output with "use client" (see below)
```

## Core patterns — follow these

### Adding a component

1. Create `src/components/<kebab-case-name>.tsx`. Keep components
   self-contained: no imports from an app's `@/lib`, `@/types`, or
   `next-intl` — this package must stay consumable by any watchborne app,
   not just `charge-points-frontend`. If a component needs copy/text, take it
   as props (do not bake in translations).
2. Style with Tailwind utility classes referencing the tokens in
   `src/styles/tokens.css` / `tailwind-preset.js` (e.g. `bg-primary`,
   `text-muted-foreground`) — never hardcode raw colors.
3. Re-export it from `src/index.ts`.
4. Add a smoke test in `src/components/__tests__/<name>.test.tsx`.
5. Only promote a component here once it's genuinely basic and already reused
   across multiple places in the consuming app(s) — this package is meant to
   stay small and load-bearing, not a dumping ground for one-off feature
   components.

### "use client"

Every component in this package is assumed to run inside a client boundary in
consuming Next.js App Router apps (several wrap interactive Radix
primitives). Rather than annotating each file, `tsup.config.ts` banners the
whole bundle with `"use client"` — do not add per-file `"use client"`
directives, they would be redundant and the banner already covers it.

### Design tokens

`src/styles/tokens.css` is a **copy** of `charge-points-frontend`'s
`app/design-system/tokens.css`, not a live link — the two currently need to
be kept in sync by hand when tokens change. If this drifts enough to hurt,
the fix is to make `charge-points-frontend` consume
`@watchborne/design-system/tokens.css` directly instead of keeping its own
copy — that migration hasn't happened yet.

### Publishing

The package is scoped `@watchborne/design-system` and installs from GitHub
Packages (`@watchborne:registry=https://npm.pkg.github.com` in `.npmrc`,
same as `charge-points-frontend`'s `@watchborne/charge-points-types`
dependency). There is no publish workflow wired up yet — that, and bumping
the consuming apps to a published version, is follow-up work.

## Commands

```bash
export NPM_TOKEN=<token>   # required to install/publish @watchborne/* on the GH registry
npm install
npm run build       # tsup -> dist/ (ESM + CJS + .d.ts) + copies tokens.css
npm run dev         # tsup --watch
npm run lint         # eslint . (lint:fix to autofix)
npm run typecheck   # tsc --noEmit
npm test            # vitest run (test:watch to iterate)
npm run test:ci      # vitest run
npm run format       # prettier --write . (format:check to verify only)
npm run all-checks  # scripts/all-checks.sh - runs the full CI suite locally
```

CI (`.github/workflows/build-test-pull-request.yml`) runs lint/format,
typecheck, build, and unit tests — keep them green. A Husky pre-commit hook
runs `lint-staged`, which applies Prettier to staged files and, for staged
`.ts/.tsx/.js/.jsx` files, ESLint (`--fix`) followed by
`vitest related --run` (only the tests affected by the staged files, not the
full suite).

## Coding conventions

### React

- Prefer arrow function components, like:

```typescript
export const MyComponent = () => {
  // ...
};
```

- Exception: components using `React.forwardRef` (most of the Radix-wrapped
  primitives) follow the existing `React.forwardRef<Ref, Props>(...)` pattern
  already used throughout `src/components/`.

### Tests

- Tests live in `__tests__/` folders (vitest + Testing Library) and are
  excluded from the tsconfig build.
- Prefer readable syntax with it SHOULD ... WHEN ..., like:

```typescript
describe("...", () => {
  it("SHOULD ... WHEN ...", () => {
    // ...
  });
});
```

### TypeScript

- TypeScript strict; path alias `@/*` maps to `./src/*`.
- Every exported component's public props type should also be exported (see
  `ButtonProps`, `BadgeProps`) so consumers can extend/type them.
