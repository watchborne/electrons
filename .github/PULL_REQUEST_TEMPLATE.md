# Context

<!-- Problem/issue this PR addresses + background for reviewers. Link related issues/commits. -->

## Solution

<!-- Main changes and how they address the problem. Reasoning / trade-offs if relevant. -->

## Testing

<!-- Unit test coverage added or updated. -->

## Definition of Done

- [ ] Build passes (`npm run build`)
- [ ] Lint, format and typecheck pass
- [ ] Unit tests pass, with a smoke test added for any new component
- [ ] New/changed component is re-exported from `src/index.ts`, with its public props type also exported
- [ ] Styled with Tailwind classes referencing `src/styles/tokens.css` / `tailwind-preset.js` — no hardcoded raw colors
- [ ] No unrelated changes
