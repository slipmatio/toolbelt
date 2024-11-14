export const testUrls = [
  { testid: 'vue', url: '/vue/', expected: '/' },
  { testid: 'foo', url: '/vue/?next=foo', expected: '/' },
  { testid: 'foobar', url: '/vue/?next=http://foo.bar', expected: '/' },
  { testid: 'next', url: '/vue/?next=/next-url/', expected: '/next-url/' },
]
