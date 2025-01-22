export function isSSR() {
  try {
    return typeof window === 'undefined' && typeof document === 'undefined'
  } catch {
    return true
  }
}

export function hasTimeZoneSupport() {
  if (isSSR()) {
    return false
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return Boolean(tz)
  } catch {
    return false
  }
}

/**
 * Checks whether the given Storage is available and usable.
 */
export function storageAvailable(type: 'localStorage' | 'sessionStorage') {
  if (isSSR()) {
    return false
  }

  const testKey = '__storage_test__'

  if (type === 'localStorage') {
    try {
      localStorage.setItem(testKey, testKey)
      localStorage.removeItem(testKey)
      return true
    } catch (_e) {
      return false
    }
  } else {
    try {
      sessionStorage.setItem(testKey, testKey)
      sessionStorage.removeItem(testKey)
      return true
    } catch (_e) {
      return false
    }
  }
}

/**
 * Returns the cookie as a string or null if not found.
 */
export function getCookie(name: string) {
  if (isSSR()) {
    return null
  }
  let cookieValue = ''
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  // Infering the output type doesn't work properly w/o this 🤷‍♂️
  if (cookieValue.length > 0) {
    return cookieValue
  }
  return null
}

/**
 * Simple clipboard copy for modern browsers. Returns true if successful.
 */
export function copyToClipboard(content: string) {
  if (isSSR()) {
    return false
  }
  const d = document
  try {
    const el = document.createElement('input')
    el.setAttribute('style', 'opacity:0;')
    el.setAttribute('value', content)
    d.body.appendChild(el)
    el.select()
    d.execCommand('copy')
    d.body.removeChild(el)
    return true
  } catch {
    return false
  }
}

/**
 * Checks if the domain of the given URL is in the list of allowed domains.
 */
export function isAllowedDomain(url: string, allowedDomains: string[]): boolean {
  try {
    const hostname = new URL(url).hostname
    return allowedDomains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

/**
 * Basic URL validation that checks if string can be parsed as URL
 * Input must start with https://
 */
export function isValidSecureUrl(url: string) {
  try {
    const parsed = new URL(url)
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

  return Promise.all(
    urlList.map(
      url =>
        new Promise<{ url: string; success: boolean }>(resolve => {
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

export function browserIsIE() {
  if (isSSR()) {
    return false
  }
  const ua = window.navigator.userAgent
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1
}

/**
 * Returns true if the browser has modern timezone support, localStorage is available and is not IE.
 */
export function browserIsSupported() {
  if (isSSR()) {
    return false
  }
  return !browserIsIE() && hasTimeZoneSupport() && storageAvailable('localStorage')
}
