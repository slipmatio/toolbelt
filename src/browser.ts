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
    } catch {
      return false
    }
  } else {
    try {
      sessionStorage.setItem(testKey, testKey)
      sessionStorage.removeItem(testKey)
      return true
    } catch {
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
 * Deletes a browser cookie by setting its expiration date to the past.
 *
 * @param name The exact name of the cookie.
 * @param path The exact path the cookie was set with.
 * @param domain The exact domain the cookie was set with (use undefined if no domain was explicitly set).
 * @param secure Whether the cookie was set with the Secure flag.
 * @param sameSite The exact SameSite attribute value ('Lax', 'Strict', 'None') the cookie was set with, or undefined if it was not set.
 */
export function deleteCookie(
  name: string,
  path = '/',
  domain: string | undefined = undefined,
  secure = false,
  sameSite: 'Lax' | 'Strict' | 'None' | undefined = undefined
) {
  try {
    const encodedName = encodeURIComponent(name)
    let cookieString = `${encodedName}=; expires=Thu, 17 Dec 1979 17:18:19 GMT; path=${path}`

    if (domain) {
      cookieString += `; domain=${domain}`
    }
    if (secure) {
      cookieString += '; Secure'
    }
    if (sameSite) {
      cookieString += `; SameSite=${sameSite}`
    }

    document.cookie = cookieString
  } catch {
    return
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

      return urlHost === allowedHost || urlHost.endsWith(`.${allowedHost}`)
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

/**
 * Returns true if the browser is a bot or a headless browser.
 * Note: This is a *VERY* basic check and should not be used for security purposes.
 *
 * @param ssrReturn If true, the function will return true when called in SSR mode.
 */
export function isBot(ssrReturn = true) {
  if (isSSR()) {
    return ssrReturn
  }
  try {
    const userAgent = navigator.userAgent.toLowerCase()
    const commonBots = [
      'googlebot',
      'bingbot',
      'yandexbot',
      'duckduckbot',
      'slurp',
      'baiduspider',
      'facebookexternalhit',
      'twitterbot',
      'rogerbot',
      'linkedinbot',
      'embedly',
      'quora link preview',
      'showyoubot',
      'outbrain',
      'pinterest',
      'slackbot',
      'vkshare',
      'w3c_validator',
      'crawler',
      'spider',
      'axios',
      'curl',
      'wget',
      'claudebot',
      'google.com/bot',
      'gptbot',
      'searchbot',
      '/bot',
      'wordpress',
      'tiktokspider',
    ]
    const isCommonBot = commonBots.some((pattern) => userAgent.includes(pattern))
    const hasHeadlessFeatures =
      userAgent.includes('headless') ||
      navigator.webdriver ||
      // @ts-expect-error
      window.callPhantom ||
      // @ts-expect-error
      window._phantom ||
      // @ts-expect-error
      window.__selenium__ ||
      // @ts-expect-error
      window.domAutomation ||
      // @ts-expect-error
      window._Selenium_IDE_Recorder
    return hasHeadlessFeatures || isCommonBot
  } catch {
    return true
  }
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
