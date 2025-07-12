# Slipmat Toolbelt

TypeScript utility library for Web development. These small utilities

## Installation

```bash
pnpm add @slipmatio/toolbelt
```

## Usage

### Browser Utilities

```typescript
import { browserIsSupported, getCookie } from '@slipmatio/toolbelt'
```

- `browserIsIE()` - Check if browser is Internet Explorer
- `browserIsSupported()` - Check if browser has modern features (timezone support, localStorage, and is not IE)
- `copyToClipboard(content: string)` - Copy text to clipboard
- `deleteCookie(name, path?, domain?, secure?, sameSite?)` - Delete a cookie
- `getCookie(name: string)` - Get cookie value by name
- `hasTimeZoneSupport()` - Check if browser supports [computed timezone](https://caniuse.com/mdn-javascript_builtins_intl_datetimeformat_resolvedoptions_computed_timezone)
- `isBot(ssrReturn?: boolean)` - Detect if user agent is a bot
- `storageAvailable(type: 'localStorage' | 'sessionStorage')` - Check if storage is available

### General Utilities

```typescript
import { CappedCollection } from '@slipmatio/toolbelt'
```

- `CappedCollection<T>` - Fixed-capacity collection that maintains only the most recent items
- `isAllowedDomain(url: string, allowedDomains: string[])` - Check if URL domain is in allowed list
- `isValidSecureUrl(url: string)` - Validate HTTPS URL (allows localhost)
- `prefetchImages(urls: string | string[])` - Preload images

#### CappedCollection

```typescript
import { CappedCollection } from '@slipmatio/toolbelt'

// Create a collection that holds max 1000 items
const collection = new CappedCollection<string>(1000)

// Add items
collection.add('item1')
collection.addMany(['item2', 'item3'])

// Get all items
const items = collection.get() // ['item1', 'item2', 'item3']

// Check status
console.log(collection.size) // 3
console.log(collection.isFull) // false

// Clear all items
collection.clear()
```

### Vue Utilities

```typescript
import { getNext, getNextPath } from '@slipmatio/toolbelt/vue'
```

- `getNext(allowedDomains: string[], router?: Router)` - Get validated 'next' query param (allows URLs to specified domains)
- `getNextPath(router?: Router)` - Get validated 'next' query param (local paths only)

## Development

```bash
pnpm dev      # Development server
pnpm build    # Build library
pnpm test     # Run tests
```

### Publishing

Bump version number in `package.json`, merge to main.

## Contributing

Contributions are welcome! Please follow the [code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) when interacting with others.

## Elsewhere

[Follow @uninen](https://twitter.com/uninen) on Twitter
