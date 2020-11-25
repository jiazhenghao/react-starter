import * as types from '@/client/redux/types'

export function increment() {
  return { type: types.INCREMENT }
}

export function decrement() {
  return { type: types.DECREMENT }
}
