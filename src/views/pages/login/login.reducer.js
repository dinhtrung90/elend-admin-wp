import * as t from './login.types';

const initialState = {
  isFetched: false,
  isFetching: false,
  isRedirect: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRedirect: false
      });
    case t.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isRedirect: true
      })
    case t.LOGIN_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error
      });
    default:
      return state
  }
}