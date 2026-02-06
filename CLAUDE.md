# Slipmat Toolbelt

TypeScript utility library with browser utilities (default export) and Vue Router helpers (`/vue` export).

## Commands

- `pnpm dev` - Start development server (port 5173)
- `pnpm build` - Type check and build the library
- `pnpm ts` - Type check
- `pnpm lint` - Lint

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
- **Never** add or remove ANY comments or docstrings unless explicitly asked to do so
- **Always** lint and format the FULL codebase

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
