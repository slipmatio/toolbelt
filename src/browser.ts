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

  let storage: Storage
  if (type === 'localStorage') {
    storage = window.localStorage
  } else {
    storage = window.sessionStorage
  }
  try {
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
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
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  // Infering the output type doesn't work properly w/o this 🤷‍♂️
  if (cookieValue.length > 0) {
    return cookieValue
  } else {
    return null
  }
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
 * Basic URL validation that checks if string can be parsed as URL
 * Input must start with https://
 */
export function isValidSecureUrl(url: string) {
  if (!url?.trim()) {
    return false
  }

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
