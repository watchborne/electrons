#!/usr/bin/env bash
set -euo pipefail

echo "=== LINT ==="; npx eslint .
echo "=== FORMAT ==="; npx prettier --check .
echo "=== TYPECHECK ==="; npx tsc --noEmit
echo "=== BUILD ==="; npx tsup
echo "=== UNIT ==="; npx vitest run
