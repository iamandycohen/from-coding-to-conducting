#!/usr/bin/env bash
# Restore demo-agent.md to its intentionally-broken state for the next rehearsal.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# The committed demo-agent.md IS the broken state. The .fixed.md is what you
# end up with after editing. So "reset" copies the broken version back.
# But after the demo, the file has been edited to match .fixed.md. We need a
# pristine "broken" template to restore. Use git to restore from index.
if git -C "$HERE/.." rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git -C "$HERE/.." checkout -- "02-lint-catches-lie/demo-agent.md"
  echo "✓ demo-agent.md restored from git."
else
  # Fallback: rewrite from the canonical broken template embedded below.
  cat > "$HERE/demo-agent.md" <<'EOF'
# Sub-agent: Finding Closer

You close one finding at a time. When done, record the result.

## Recording the outcome

Call the `migration-work-decide` tool with:

```json
{
  "kind": "finding",
  "key": "abc-123",
  "payload": { "shipped": true },
  "outcomeStatus": "shipped"
}
```

This marks the finding as closed.
EOF
  echo "✓ demo-agent.md restored from embedded template."
fi
