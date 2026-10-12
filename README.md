# 🎨 watchborne/electrons

Shared React component library and design tokens for the watchborne EV
charge-point platform (`@watchborne/electrons`). Ships the UI primitives
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
npm install @watchborne/electrons
```

```tsx
import { Button, Badge, Callout } from "@watchborne/electrons";

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
   import "@watchborne/electrons/tokens.css";
   ```

2. The Tailwind preset, so the utility classes used inside the package are
   generated and its class names are actually scanned:

   ```js
   // tailwind.config.js
   module.exports = {
     presets: [require("@watchborne/electrons/tailwind-preset")],
     content: [
       "./app/**/*.{js,ts,jsx,tsx}",
       "./node_modules/@watchborne/electrons/dist/**/*.{js,mjs}",
     ],
   };
   ```

## 🧩 What's exported (v0.5.0)

Every component here was promoted from `charge-points-frontend`, once it was
generic and reused in several places.

- `Button`, `Badge`, `Input`, `Textarea`, `Label`, `Switch` — form/action
  primitives
- `Tabs`, `Table`, `Collapsible` — layout/structure primitives
- `Callout` — inline message box (`default` / `info` / `error` / `warning` /
  `success`)
- `Tag`, `ColorPill`, `Loader`, `Skeleton`, `StatCard` — small reusable
  display components (`StatusPill` is kept as a deprecated alias of
  `ColorPill`)
- `Tooltip` — Radix tooltip (`TooltipProvider`, `TooltipTrigger`,
  `TooltipContent`)
- `Dialog`, `AlertDialog`, `Popover` — overlays. `DialogContent` (and
  `CommandDialog`) take a `closeLabel` prop for the close button's
  screen-reader text (default `"Close"`): the package has no copy of its own,
  so pass a translated string from the app
- `DropdownMenu`, `Select` — menu-like primitives
- `Command` (cmdk) and `Calendar` (react-day-picker) — list/search and date
  grid primitives

Not exported (left in the app, tied to app-specific types, state or i18n):
`Datepicker` (popover + calendar wired to the app's date formatting and
locale), `Form` (`react-hook-form` coupling), `ConnectorStatusIcon`,
`WsStatusBadge`. The generic display/interaction components in the app's
`common/` folder are tracked separately for promotion.

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
