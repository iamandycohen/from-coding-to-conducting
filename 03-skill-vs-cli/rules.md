# Pick the next finding

Given a tracker, return one finding ID.

Rules, in order:
1. Only consider findings with status `planned`.
2. Exclude any finding where `blocked: true`.
3. Prefer the smallest sizing (S before M before L).
