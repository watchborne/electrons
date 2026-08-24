// conventional-changelog options for the release workflow's changelog step.
//
// PRs land on main as merge commits whose subject carries the conventional
// message ("feat(components): Add StatusPill component (#11)"), while the
// branch commits underneath are free-form. conventional-changelog passes
// --no-merges by default, so it saw only the free-form commits and produced
// empty release bodies. Keep merge commits: the non-conventional ones on both
// sides are dropped by the preset anyway.
//
// Accepts all conventional commit prefixes (feat, fix, chore, refactor, etc.)
// in formats: "prefix(scope): message" or "prefix: message"
export default {
  gitRawCommitsOpts: { merges: null },
  types: [
    { type: "feat", section: "✨ Features", hidden: false },
    { type: "fix", section: "🐛 Bug Fixes", hidden: false },
    { type: "perf", section: "⚡ Performance Improvements", hidden: false },
    { type: "refactor", section: "♻️ Code Refactoring", hidden: false },
    { type: "chore", section: "🔧 Chores", hidden: false },
    { type: "style", section: "💅 Styling", hidden: true },
    { type: "test", section: "✅ Tests", hidden: true },
    { type: "docs", section: "📚 Documentation", hidden: true },
    { type: "ci", section: "⚙️ CI/CD", hidden: true },
  ],
};
