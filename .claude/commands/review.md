---
description: Review a file or component for Nuxt 3 / TypeScript best practices
---

Review the file `$ARGUMENTS` for:

1. **TypeScript** — no `any`, proper types, correct generics
2. **Vue patterns** — Composition API, correct `<script setup>`, no Options API
3. **Nuxt patterns** — correct use of auto-imports, data fetching, routing
4. **Performance** — unnecessary watchers, missing `shallowRef`, heavy computed
5. **Code quality** — DRY, naming conventions, separation of concerns
   Format your review as:
- 🔴 Critical issues (bugs, type errors, broken patterns)
- 🟡 Improvements (better patterns, missing types)
- 🟢 Good practices worth noting
  For each issue found — show the problematic code, explain why it's wrong, and show the fixed snippet.