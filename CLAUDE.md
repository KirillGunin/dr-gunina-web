# Project Context

This is a **Nuxt 3** application using **TypeScript**.

## Tech Stack

- **Framework**: Nuxt 3 (latest)
- **Language**: TypeScript (strict mode)
- **Styling**: (scss)
- **State**: ()
- **Package manager**: (npm)

## Project Structure

```
.
├── components/        # Auto-imported components
├── composables/       # Composables (use* prefix, imported explicitly)
├── pages/             # File-based routing
├── types/             # Shared TypeScript types
├── utils/             # Client-side utilities
└── nuxt.config.ts
```

## Commands

```bash
npm dev          # Dev server http://localhost:3000
npm build        # Production build
npm generate     # Static site generation
npm typecheck    # vue-tsc type check
npm lint         # ESLint
```

## Code Style & Rules

### TypeScript
- Always use `defineProps<{}>()` with TypeScript generics
- Prefer `type` over `interface` for props/emits
- No `any` — use `unknown` + type guard if needed
- Strict mode is on

### Vue / Nuxt Conventions
- **Composition API only** — no Options API
- Use `<script setup lang="ts">` in all components
- Auto-imports are active — never manually import `ref`, `computed`, `useRoute`, etc.
- Component names: PascalCase files → auto-imported as `<PascalCase />`
- Composables: `use` prefix, file name matches function name

### Server API Routes
- Use `defineEventHandler` with typed body: `readBody<MyType>(event)`
- Throw errors with `createError({ statusCode, message })`
- Keep DB logic in `server/utils/`, not inline in route handlers

### Naming
- Pages: kebab-case files (`user-profile.vue` → `/user-profile`)
- Components: PascalCase (`UserCard.vue`)
- Composables: camelCase with `use` prefix (`useUserData.ts`)
- Stores: camelCase + `Store` suffix (`useUserStore.ts`)

## Key Nuxt 3 Patterns

### Data fetching
```ts
// In 
export const fetchUsers = async () => {
    const { $axios } = useNuxtApp();

    return $axios
        .get('/users')
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
};
```

### Shared state
```ts
// Simple

// Complex → Pinia store
```

## What Claude Should NOT Do
- Do not use Options API
- Do not manually import Vue/Nuxt auto-imports
- Do not use `<script>` without `setup` and `lang="ts"`
- Do not create `.js` files — always `.ts`
- Do not use `any` type