import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer, { InitialState } from '@/client/redux/reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function configureStore(state: InitialState) {
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // @ts-ignore
  return createStore(rootReducer, state, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())))
}
