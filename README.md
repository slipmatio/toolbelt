# Slipmat Toolbelt

**Note: this project is under active development**, you should pin the strict version to avoid breakages.

General utilities for Web development

## Features

### Browser

- `browserIsIE()`
- `browserIsSupported()`
- `copyToClipboard(content: string)`
- `deleteCookie(name: string, path = '/', domain: string | undefined = undefined, secure = false, sameSite: 'Lax' | 'Strict' | 'None' | undefined = undefined)`
- `getCookie(name: string)`
- `hasTimeZoneSupport()`
- `isBot()`
- `isValidSecureUrl(url: string)`
- `prefetchImages(url: string|string[])`
- `storageAvailable(type: 'localStorage' | 'sessionStorage')`

### Vue

- `getNext(allowedDomains: string[], router?: Router)` - returns the value of `?next` query param or `/`
- `getNextPath(router?: Router)` - returns the value of `?next` query param or `/`
- `isString(value: string | LocationQueryValue[])`

## Installation

`pnpm add @slipmatio/toolbelt`

## Usage

Browser tools: `import { tool } from @slipmatio/toolbelt`

Vue tools (`vue` and `vue-router` required): `import { tool } from @slipmatio/toolbelt/vue`

## Development

### Install dependencies

`pnpm i`

### Run development server

`pnpm dev`

### Testing

Type check: `pnpm ts`

#### Unittests

1. `pnpm test`

#### E2E

1. Run the backend: `uv run uvicorn api:app --reload`
2. `pnpm test:e2e`

### Publishing

Bump version number in `package.json`, merge to main.

## Contributing

Contributions are welcome! Please follow the [code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when interacting with others.

## Elsewhere

[Follow @uninen](https://twitter.com/uninen) on Twitter
