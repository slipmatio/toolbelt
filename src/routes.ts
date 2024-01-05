import { useRoute } from 'vue-router'
import { isString } from './type-helpers'

/**
 * Helper for figuring our ?next= query param in a safe way.
 */
export function getNextPath(): string {
  const route = useRoute()

  let next = '/'
  if (
    route.query &&
    route.query.next &&
    isString(route.query.next) &&
    route.query.next.startsWith('/')
  ) {
    next = route.query.next as string
  }
  return next
}
