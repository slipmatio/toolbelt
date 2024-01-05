import type { LocationQueryValue } from 'vue-router'

export function isString(value: string | LocationQueryValue[]): value is string {
  return typeof value === 'string'
}
