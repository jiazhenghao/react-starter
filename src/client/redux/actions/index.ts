import * as types from '@/redux/types'

export function increment() {
  return { type: types.INCREMENT }
}

export function decrement() {
  return { type: types.DECREMENT }
}
