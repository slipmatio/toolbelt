/**
 * Checks whether the given Storage is available and usable.
 */
export function storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
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
