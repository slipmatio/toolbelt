# Slipmat Toolbelt

**Note: this project is under active development, DO NOT USE IN PRODUCTION**

General utilities for Web development

## Features

### Browser

- `copyToClipboard(content: string): boolean`
- `getCookie(name: string): string | null`
- `storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean`

### Vue

- `getNextPath(router?: Router): string` - returns the value of `?next` query param or `/`

## Installation

`pnpm add @slipmatio/toolbelt`

## Usage

`import { tool } from @slipmatio/toolbelt`

## Development

### Install dependencies

`pnpm i`

### Run development server

`pnpm dev`

### Run tests

`pnpm test`

## Contributing

Contributions are welcome! Please follow the [code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when interacting with others.

## Elsewhere

[Follow @uninen](https://twitter.com/uninen) on Twitter
