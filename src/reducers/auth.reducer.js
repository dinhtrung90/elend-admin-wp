import { authConstants } from '../constants'

const initialState = {
  isFetched: false,
  isFetching: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.RESEND_VERIFY_EMAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case authConstants.RESEND_VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case authConstants.RESEND_VERIFY_EMAIL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case authConstants.RESET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case authConstants.RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case authConstants.RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}

export default authReducer
