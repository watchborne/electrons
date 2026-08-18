// conventional-changelog options for the release workflow's changelog step.
//
// PRs land on main as merge commits whose subject carries the conventional
// message ("feat(components): Add StatusPill component (#11)"), while the
// branch commits underneath are free-form. conventional-changelog passes
// --no-merges by default, so it saw only the free-form commits and produced
// empty release bodies. Keep merge commits: the non-conventional ones on both
// sides are dropped by the preset anyway.
export default { gitRawCommitsOpts: { merges: null } };
