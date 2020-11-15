import * as types from '@/redux/types'

export type InitialState = {
  count: number
}

export default function rootReducer(state: InitialState, action: any) {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 2
      }
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 2
      }
    default:
      return { ...state }
  }
}
