# CLAUDE.md

TypeScript utility library with browser utilities (default export) and Vue Router helpers (`/vue` export).

## Commands

```bash
pnpm dev          # Start development server (port 5173)
pnpm build        # Type check and build the library
pnpm ts           # Run TypeScript type checking only
```

### Linting

```bash
# Format, lint, and organize imports of all files
pnpm exec biome check --write


# Format, lint, and organize imports of specific files
pnpm exec biome check --write <files>
```

### Testing

```bash
pnpm test         # Run unit tests with Vitest
pnpm coverage     # Generate test coverage report

# Run a single test file
pnpm test path/to/mytest.spec.ts
```

#### E2E Testing

E2E tests require a backend server running:

```bash
# 1. First, start the backend server
uv run uvicorn api:app --reload

# 2. Then run E2E tests with Playwright UI
pnpm test:e2e
```

### Code Style

- 2 spaces indentation
- Single quotes
- ES5 trailing commas
- NEVER add ANY comments or docstrings in the code whatsoever unless explicitly asked to do so
- ALWAYS lint and format all ts/vue files you touch

### Project Structure

```
src/
├── browser.ts      # Browser utilities (main entry)
├── vue/            # Vue-specific utilities
│   └── index.ts    # Vue export entry
└── utils.ts        # General utilities

tests/
├── unit/           # Unit tests (Vitest)
└── e2e/            # E2E tests (Playwright)
```

### Testing Info

- Unit tests: Vitest with happy-dom
- E2E tests: Playwright (iPhone SE WebKit, Desktop Firefox)
- Tests can be co-located: `src/**/*.spec.ts`
- Dev server runs on port 5173
- Vue and Vue Router are optional peer dependencies
