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
  { testid: 'u9', url: '/vue/?next=https%3A%2F%2Fapi.slipmat.io%2Fo%2Fauthorize%2F%3Fclient_id%3D3LJ9LyesgD0Ug5EV7kaQzGCCaHv1n3MuVFaBiNA7%26nonce%3Dde479929e075f9d49ab35825a5b192928e1690e7e6e9154f6764ebe05236a99a%26redirect_uri%3Dhttps%253A%252F%252Fbackstage.slipmat.io%252Fauth%252Foidc%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3Dc75b86b6c9bb74fd8c017d29956fbc0c0ac0bdbb7957d1c4', expected: 'https://api.slipmat.io/o/authorize/?client_id=3LJ9LyesgD0Ug5EV7kaQzGCCaHv1n3MuVFaBiNA7&nonce=de479929e075f9d49ab35825a5b192928e1690e7e6e9154f6764ebe05236a99a&redirect_uri=https%3A%2F%2Fbackstage.slipmat.io%2Fauth%2Foidc%2Fcallback&response_type=code&scope=openid+email+profile&state=c75b86b6c9bb74fd8c017d29956fbc0c0ac0bdbb7957d1c4' },
]
