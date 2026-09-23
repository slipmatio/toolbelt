import { describe, expect, test } from 'vitest'
import type { Router } from 'vue-router'

import { getNext, getNextPath } from '@/vue'

function routerWithNext(next: string): Router {
  return { currentRoute: { value: { query: { next } } } } as unknown as Router
}

const offsiteLocalLookingPaths = [
  '//evil.example',
  '//evil.example/login/',
  '/\\evil.example',
  '/\\\\evil.example',
  '/\t/evil.example',
  '/\n/evil.example',
  '/\r/evil.example',
  '/\t\r\n\\evil.example',
  '//local.invalid/login',
  '/\\local.invalid/login',
  '/\t/local.invalid/login',
  '//local.invalid:80/login',
]

const localPaths = [
  '/',
  '/next-url/',
  '/account/?tab=profile',
  '/artist/djuninen/#chat',
  '/a//b/',
  '/a\\b/',
  '/\taccount/',
  '/account/?next=//evil.example',
]

describe.each([
  ['getNextPath', (next: string) => getNextPath(routerWithNext(next))],
  ['getNext', (next: string) => getNext(['slipmat.io'], routerWithNext(next))],
])('%s', (_name, resolveNext) => {
  test.each(offsiteLocalLookingPaths)('rejects %j, which a browser opens on another site', (next) => {
    expect(new URL(next, 'https://slipmat.io/login/').origin).not.toBe('https://slipmat.io')
    expect(resolveNext(next)).toBe('/')
  })

  test.each(localPaths)('keeps local path %j', (next) => {
    expect(resolveNext(next)).toBe(next)
  })
})
