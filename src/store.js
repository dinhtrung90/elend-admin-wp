import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    loadingBarMiddleware({
      scope: 'sectionBar',
    }),
  ),
)
export default store
