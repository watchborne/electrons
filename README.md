# 🎨 watchborne/design-system

Shared React component library and design tokens for the watchborne EV
charge-point platform (`@watchborne/design-system`). Ships the UI primitives
and tokens that are reused across watchborne front-end apps (starting with
`charge-points-frontend`), so they have a single source of truth instead of
being duplicated per app.

## 🚀 Installation

1. Ask and set the `NPM_TOKEN` env var (GitHub Packages registry):

   ```bash
   export NPM_TOKEN=<token>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the package:

   ```bash
   npm run build
   ```

## 📦 Using the package in an app

```bash
npm install @watchborne/design-system
```

```tsx
import { Button, Badge, Callout } from "@watchborne/design-system";

export const Example = () => (
  <Callout variant="success" title="Saved">
    <Button>Continue</Button>
    <Badge>New</Badge>
  </Callout>
);
```

Components are styled with Tailwind utility classes and consume the same CSS
variables as `charge-points-frontend`'s `app/design-system/tokens.css`. To
render correctly, a consuming app needs:

1. The design tokens, once (e.g. in a root layout):

   ```ts
   import "@watchborne/design-system/tokens.css";
   ```

2. The Tailwind preset, so the utility classes used inside the package are
   generated and its class names are actually scanned:

   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require("@watchborne/design-system/tailwind-preset")],
     content: [
       "./app/**/*.{js,ts,jsx,tsx}",
       "./node_modules/@watchborne/design-system/dist/**/*.{js,mjs}",
     ],
   };
   ```

## 🧩 What's exported (v0.1.0)

The first pass exports the most basic, already-reused primitives from
`charge-points-frontend`, unchanged in behavior:

- `Button`, `Badge`, `Input`, `Label`, `Switch` — form/action primitives
  (from `components/ui/*`, shadcn-generated originally)
- `Tabs`, `Table`, `Collapsible` — layout/structure primitives
- `Callout` — inline message box (`default` / `info` / `error` / `warning` /
  `success`)
- `Tag`, `Loader`, `Skeleton`, `StatCard` — small reusable display components

Not exported yet (left in the app, either more composite/config-heavy, or
tied to app-specific types/i18n): `Dialog`, `AlertDialog`, `Popover`,
`DropdownMenu`, `Select`, `Command`, `Calendar`, `Datepicker`, `Form`,
`ConnectorStatusIcon`, `WsStatusBadge`. These are good candidates for a
follow-up export once this package is published and wired up in
`charge-points-frontend`.

## Commands

```bash
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
`.ts/.tsx/.js/.jsx` files, ESLint (`--fix`) followed by `vitest related --run`.
