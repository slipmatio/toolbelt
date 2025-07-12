import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute } from 'vue-router'
import { isAllowedDomain, isValidSecureUrl } from '@/browser'
import { isString } from '@/type-helpers'

/**
 * Safely extracts and validates the 'next' query parameter from the current route. Allows only local paths.
 *
 * @param router - Optional Vue Router instance. Required when used outside of component setup.
 * @returns A validated path string (starting with '/') or '/' if no valid next path exists.
 */
export function getNextPath(router?: Router): string {
  let route: RouteLocationNormalizedLoaded
  if (router) {
    route = router.currentRoute.value
  } else {
    route = useRoute()
  }

  let next = '/'
  if (route.query?.next && isString(route.query.next) && route.query.next.startsWith('/')) {
    next = route.query.next as string
  }
  return next
}

/**
 * Safely extracts and validates the 'next' query parameter from the current route.
 * Allows any valid local paths and valid URLs to the given domains.
 *
 * @param allowedDomains - Array of allowed domains.
 * @param router - Optional Vue Router instance. Required when used outside of component setup.
 * @returns A validated path string (starting with '/') or '/' if no valid next path exists.
 */
export function getNext(allowedDomains: string[], router?: Router): string {
  let route: RouteLocationNormalizedLoaded
  if (router) {
    route = router.currentRoute.value
  } else {
    route = useRoute()
  }

  let next = '/'
  // if next is a valid local path
  if (route.query?.next && isString(route.query.next) && route.query.next.startsWith('/')) {
    next = route.query.next as string
    // if next is a valid URL with allowed domain
  } else if (
    route.query?.next &&
    isString(route.query.next) &&
    isValidSecureUrl(route.query.next) &&
    isAllowedDomain(route.query.next, allowedDomains)
  ) {
    next = route.query.next as string
  }
  return next
}

export { isString }
