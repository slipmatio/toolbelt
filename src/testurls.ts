export const testPaths = [
  { testid: 't1', url: '/vue/', expected: '/' },
  { testid: 't2', url: '/vue/?next=foo', expected: '/' },
  { testid: 't3', url: '/vue/?next=http://foo.bar', expected: '/' },
  { testid: 't4', url: '/vue/?next=/next-url/', expected: '/next-url/' },
  { testid: 't5', url: '/vue/?next=https://slipmat.io', expected: '/' },
]

export const testUrls = [
  { testid: 'u1', url: '/vue/', expected: '/' },
  { testid: 'u2', url: '/vue/?next=foo', expected: '/' },
  { testid: 'u3', url: '/vue/?next=http://foo.bar', expected: '/' },
  { testid: 'u4', url: '/vue/?next=/next-url/', expected: '/next-url/' },
  { testid: 'u5', url: '/vue/?next=https://slipmat.io', expected: 'https://slipmat.io' },
  { testid: 'u6', url: '/vue/?next=https://example.com/foo/', expected: '/' },
  { testid: 'u7', url: '/vue/?next=https://account.slipmat.io', expected: 'https://account.slipmat.io' },
  { testid: 'u8', url: '/vue/?next=https://next.slipmat.io/djuninen/', expected: 'https://next.slipmat.io/djuninen/' },
]
