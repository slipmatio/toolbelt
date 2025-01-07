import { isString } from '@/type-helpers'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute } from 'vue-router'

/**
 * Safely extracts and validates the 'next' query parameter from the current route.
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
  if (route.query && route.query.next && isString(route.query.next) && route.query.next.startsWith('/')) {
    next = route.query.next as string
  }
  return next
}

export { isString }
