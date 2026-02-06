import { describe, expect, it } from 'vitest'
import { CappedCollection } from '@/utils'

describe('CappedCollection', () => {
  it('should initialize with correct capacity', () => {
    const collection = new CappedCollection<number>(5)
    expect(collection.size).toBe(0)
    expect(collection.isFull).toBe(false)
  })

  it('should throw error for invalid capacity', () => {
    expect(() => new CappedCollection<number>(0)).toThrow('Capacity must be positive')
    expect(() => new CappedCollection<number>(-1)).toThrow('Capacity must be positive')
  })

  it('should throw error for invalid chunk size', () => {
    expect(() => new CappedCollection<number>(10, 0)).toThrow('Chunk size must be positive')
    expect(() => new CappedCollection<number>(10, -1)).toThrow('Chunk size must be positive')
  })

  it('should accept custom chunk size', () => {
    const collection = new CappedCollection<number>(100, 10)
    for (let i = 0; i < 100; i++) {
      collection.add(i)
    }
    expect(collection.size).toBe(100)
    expect(collection.get()).toEqual(Array.from({ length: 100 }, (_, i) => i))
  })

  it('should add items and maintain order', () => {
    const collection = new CappedCollection<number>(3)
    collection.add(1)
    collection.add(2)
    collection.add(3)

    expect(collection.get()).toEqual([1, 2, 3])
    expect(collection.size).toBe(3)
    expect(collection.isFull).toBe(true)
  })

  it('should remove oldest items when capacity exceeded', () => {
    const collection = new CappedCollection<number>(3)
    collection.add(1)
    collection.add(2)
    collection.add(3)
    collection.add(4)

    expect(collection.get()).toEqual([2, 3, 4])
    expect(collection.size).toBe(3)
  })

  it('should handle addMany correctly', () => {
    const collection = new CappedCollection<number>(5)
    collection.addMany([1, 2, 3, 4, 5, 6, 7])

    expect(collection.get()).toEqual([3, 4, 5, 6, 7])
    expect(collection.size).toBe(5)
  })

  it('should clear all items', () => {
    const collection = new CappedCollection<number>(5)
    collection.addMany([1, 2, 3])
    collection.clear()

    expect(collection.get()).toEqual([])
    expect(collection.size).toBe(0)
    expect(collection.isFull).toBe(false)
  })

  it('should handle capacity of 1', () => {
    const collection = new CappedCollection<string>(1)
    collection.add('a')
    collection.add('b')

    expect(collection.get()).toEqual(['b'])
    expect(collection.size).toBe(1)
  })

  it('should handle large number of operations efficiently', () => {
    const collection = new CappedCollection<number>(1000)
    const start = performance.now()

    for (let i = 0; i < 10000; i++) {
      collection.add(i)
    }

    const elapsed = performance.now() - start

    expect(elapsed).toBeLessThan(100)
    expect(collection.size).toBe(1000)
    expect(collection.get()[0]).toBe(9000)
    expect(collection.get()[999]).toBe(9999)
  })

  it('should handle chunk boundaries correctly', () => {
    const collection = new CappedCollection<number>(300)

    for (let i = 0; i < 600; i++) {
      collection.add(i)
    }

    const items = collection.get()
    expect(items.length).toBe(300)
    expect(items[0]).toBe(300)
    expect(items[299]).toBe(599)
  })

  it('should handle chunk size of 1', () => {
    const collection = new CappedCollection<number>(5, 1)
    collection.addMany([1, 2, 3, 4, 5, 6, 7])

    expect(collection.get()).toEqual([3, 4, 5, 6, 7])
    expect(collection.size).toBe(5)
  })

  it('should handle chunk size larger than capacity', () => {
    const collection = new CappedCollection<number>(5, 100)
    collection.addMany([1, 2, 3, 4, 5, 6, 7])

    expect(collection.get()).toEqual([3, 4, 5, 6, 7])
    expect(collection.size).toBe(5)
  })

  it('should maintain correct order with custom chunk size when capacity exceeded', () => {
    const collection = new CappedCollection<number>(10, 3)
    for (let i = 0; i < 20; i++) {
      collection.add(i)
    }

    const items = collection.get()
    expect(items).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
    expect(collection.size).toBe(10)
  })

  it('should handle clearing and refilling with custom chunk size', () => {
    const collection = new CappedCollection<string>(4, 2)
    collection.addMany(['a', 'b', 'c', 'd'])
    collection.clear()
    collection.addMany(['e', 'f', 'g'])

    expect(collection.get()).toEqual(['e', 'f', 'g'])
    expect(collection.size).toBe(3)
  })

  it('should return defensive copy on get()', () => {
    const collection = new CappedCollection<number[]>(3)
    const arr = [1, 2, 3]
    collection.add(arr)

    const retrieved = collection.get()
    retrieved[0]?.push(4)

    expect(collection.get()[0]).toEqual([1, 2, 3, 4])
    expect(retrieved).not.toBe(collection.get())
  })
})
