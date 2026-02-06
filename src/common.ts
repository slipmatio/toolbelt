export function isSSR() {
  try {
    return typeof window === 'undefined' && typeof document === 'undefined'
  } catch {
    return true
  }
}
