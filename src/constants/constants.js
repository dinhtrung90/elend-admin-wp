export const APP_TOKEN = 'APP_TOKEN'
export const APP_REFRESH_TOKEN = 'APP_REFRESH_TOKEN'

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
}

export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
}

export const DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || ''

export const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://api.fingmeup.com'

export const SERVICE_DOMAIN = '/services/clientcenterservice'
