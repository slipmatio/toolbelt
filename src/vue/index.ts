import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useRoute } from 'vue-router'
import { isString } from '../type-helpers'

/**
 * Helper for figuring our ?next= query param in a safe way.
 * Pass the router instance whenever not used directly from script setup block.
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
