export class CappedCollection<T> {
  private chunks: T[][] = []
  private readonly capacity: number
  private readonly chunkSize: number
  private count = 0
  private headChunkIndex = 0
  private headItemIndex = 0

  constructor(capacity: number, chunkSize = 256) {
    if (capacity < 1) throw new Error('Capacity must be positive')
    if (chunkSize < 1) throw new Error('Chunk size must be positive')
    this.capacity = capacity
    this.chunkSize = chunkSize
  }

  add(item: T): void {
    if (this.chunks.length === 0) {
      this.chunks.push([])
    }

    const lastChunk = this.chunks[this.chunks.length - 1]

    if (lastChunk.length === this.chunkSize) {
      this.chunks.push([item])
    } else {
      lastChunk.push(item)
    }

    if (this.count < this.capacity) {
      this.count++
    } else {
      this.headItemIndex++
      if (this.headItemIndex === this.chunks[this.headChunkIndex].length) {
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

  addMany(items: T[]): void {
    for (const item of items) {
      this.add(item)
    }
  }

  get(): T[] {
    if (this.chunks.length === 0) return []

    const result = new Array(this.count)
    let resultIdx = 0

    for (let i = this.headItemIndex; i < this.chunks[this.headChunkIndex].length; i++) {
      result[resultIdx++] = this.chunks[this.headChunkIndex][i]
    }

    for (let chunkIdx = this.headChunkIndex + 1; chunkIdx < this.chunks.length; chunkIdx++) {
      const chunk = this.chunks[chunkIdx]
      for (let i = 0; i < chunk.length; i++) {
        result[resultIdx++] = chunk[i]
      }
    }

    return result
  }

  clear(): void {
    this.chunks = []
    this.count = 0
    this.headChunkIndex = 0
    this.headItemIndex = 0
  }

  get size(): number {
    return this.count
  }

  get isFull(): boolean {
    return this.count === this.capacity
  }
}
