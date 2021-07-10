import { APP_TOKEN, APP_REFRESH_TOKEN } from 'src/constants/constants'

export const authHelpers = {
  setAccessToken,
  setFreshToken,
  getAccessToken,
  clearToken,
  isAuthenticated,
}

function isAuthenticated() {
  const token = localStorage.getItem(APP_TOKEN)
  if (token === null) return false
  return token && token.length > 0
}

function clearToken() {
  localStorage.removeItem(APP_TOKEN)
  localStorage.removeItem(APP_REFRESH_TOKEN)
}

function setAccessToken(token) {
  localStorage.setItem(APP_TOKEN, token)
}

function setFreshToken(refreshToken) {
  localStorage.setItem(APP_REFRESH_TOKEN, refreshToken)
}

function getAccessToken() {
  localStorage.getItem(APP_TOKEN)
}
