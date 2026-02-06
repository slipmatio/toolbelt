import { isSSR } from './common'

/**
 * A fixed-capacity collection that maintains only the most recent items.
 * Older items are automatically removed when capacity is reached.
 */
export class CappedCollection<T> {
  private chunks: T[][] = []
  private readonly capacity: number
  private readonly chunkSize: number
  private count = 0
  private headChunkIndex = 0
  private headItemIndex = 0

  /**
   * @param capacity - Maximum number of items to retain
   * @param chunkSize - Internal chunk size for memory efficiency (default: 256)
   */
  constructor(capacity: number, chunkSize = 256) {
    if (capacity < 1) throw new Error('Capacity must be positive')
    if (chunkSize < 1) throw new Error('Chunk size must be positive')
    this.capacity = capacity
    this.chunkSize = chunkSize
  }

  /**
   * Adds an item to the collection.
   */
  add(item: T): void {
    if (this.chunks.length === 0) {
      this.chunks.push([])
    }

    const lastChunk = this.chunks[this.chunks.length - 1]

    if (lastChunk && lastChunk.length === this.chunkSize) {
      this.chunks.push([item])
    } else if (lastChunk) {
      lastChunk.push(item)
    }

    if (this.count < this.capacity) {
      this.count++
    } else {
      this.headItemIndex++
      if (this.headItemIndex === this.chunks[this.headChunkIndex]?.length) {
        this.headChunkIndex++
        this.headItemIndex = 0
      }
    }

    const maxChunks = Math.ceil(this.capacity / this.chunkSize) + 1
    if (this.chunks.length > maxChunks) {
      const toRemove = this.chunks.length - maxChunks
      this.chunks.splice(0, toRemove)
      this.headChunkIndex = Math.max(0, this.headChunkIndex - toRemove)
    }
  }

  /**
   * Adds multiple items to the collection.
   */
  addMany(items: T[]): void {
    for (const item of items) {
      this.add(item)
    }
  }

  /**
   * Returns all items in the collection.
   */
  get(): T[] {
    if (this.chunks.length === 0) return []

    const result = Array.from({ length: this.count }) as T[]
    let resultIdx = 0

    const headChunk = this.chunks[this.headChunkIndex]
    if (headChunk) {
      for (let i = this.headItemIndex; i < headChunk.length; i++) {
        result[resultIdx++] = headChunk[i]!
      }
    }

    for (let chunkIdx = this.headChunkIndex + 1; chunkIdx < this.chunks.length; chunkIdx++) {
      const chunk = this.chunks[chunkIdx]
      if (chunk) {
        for (let i = 0; i < chunk.length; i++) {
          result[resultIdx++] = chunk[i]!
        }
      }
    }

    return result
  }

  /**
   * Removes all items from the collection.
   */
  clear(): void {
    this.chunks = []
    this.count = 0
    this.headChunkIndex = 0
    this.headItemIndex = 0
  }

  /**
   * The current number of items in the collection.
   */
  get size(): number {
    return this.count
  }

  /**
   * Whether the collection has reached its capacity.
   */
  get isFull(): boolean {
    return this.count === this.capacity
  }
}

/**
 * Checks if the domain of the given URL is in the list of allowed domains.
 */
export function isAllowedDomain(url: string, allowedDomains: string[]): boolean {
  try {
    const parsedUrl = new URL(url)
    const hostWithPort = parsedUrl.port ? `${parsedUrl.hostname}:${parsedUrl.port}` : parsedUrl.hostname

    return allowedDomains.some((allowedDomain) => {
      const [allowedHost, allowedPort] = allowedDomain.split(':')
      const [urlHost, _] = hostWithPort.split(':')

      if (allowedPort) {
        return hostWithPort === allowedDomain
      }

      return urlHost === allowedHost || (urlHost && urlHost.endsWith(`.${allowedHost}`))
    })
  } catch {
    return false
  }
}

/**
 * Basic URL validation that checks if string can be parsed as URL
 */
export function isValidSecureUrl(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname === 'localhost') {
      return true
    }

    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}
/**
 * Simple helper to prefetch images
 * @param urls URL or array of URLs to prefetch
 */
export async function prefetchImages(urls: string | string[]) {
  if (isSSR()) {
    return []
  }

  const urlList = Array.isArray(urls) ? urls : [urls]

  return await Promise.all(
    urlList.map(
      (url) =>
        new Promise<{ url: string; success: boolean }>((resolve) => {
          const img = new Image()

          function cleanup() {
            img.onload = null
            img.onerror = null
          }

          img.onload = () => {
            cleanup()
            resolve({ url, success: true })
          }

          img.onerror = () => {
            cleanup()
            resolve({ url, success: false })
          }

          img.src = url
        })
    )
  )
}

/**
 * Reads a GET parameter from the current URL's query string.
 *
 * @param name The name of the parameter to retrieve.
 * @returns The parameter's value as a string, or null if it doesn't exist.
 */
export function getParam(name: string) {
  if (isSSR()) {
    return null
  }

  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(name)
}
