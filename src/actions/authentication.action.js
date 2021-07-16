import { toast } from 'react-toastify'
import { APP_TOKEN, APP_REFRESH_TOKEN } from 'src/constants/constants'
import api from '../utils/api'
import { authConstants } from '../constants'

export const clearAuthToken = () => {
  localStorage.removeItem(APP_TOKEN)
  localStorage.removeItem(APP_REFRESH_TOKEN)
}

function accountSync() {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .syncAccount()
      .then(dispatch(success()))
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: authConstants.ACCOUNT_SYNC_REQUEST }
  }

  function success() {
    return { type: authConstants.ACCOUNT_SYNC_SUCCESS }
  }

  function failure(error) {
    return { type: authConstants.ACCOUNT_SYNC_FAILURE, error }
  }
}

function resendVerifyEmail(userId, message) {
  return (dispatch) => {
    dispatch(request())
    return api.authService
      .resendVerifyEmail(userId)
      .then((response) => {
        const email = response.data && response.data.response ? response.data.response.email : ''
        toast.success(message + email)
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: authConstants.RESEND_VERIFY_EMAIL_REQUEST }
  }

  function success(data) {
    return { type: authConstants.RESEND_VERIFY_EMAIL_SUCCESS, data }
  }

  function failure(error) {
    return { type: authConstants.RESEND_VERIFY_EMAIL_FAILURE, error }
  }
}

function resetPassword(userId, message) {
  return (dispatch) => {
    dispatch(request())
    return api.authService
      .resetPasswordEmail(userId)
      .then((response) => {
        toast.success(message)
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: authConstants.RESET_PASSWORD_REQUEST }
  }

  function success(data) {
    return { type: authConstants.RESET_PASSWORD_SUCCESS, data }
  }

  function failure(error) {
    return { type: authConstants.RESET_PASSWORD_FAILURE, error }
  }
}

export const authenticationActions = {
  accountSync,
  clearAuthToken,
  resendVerifyEmail,
  resetPassword,
}
