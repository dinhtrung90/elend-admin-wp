export const APP_TOKEN = 'APP_TOKEN';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
};

export const OKTA_DOMAIN = process.env.REACT_APP_OKTA_ORG_URL || '';

export const CLIEND_ID = process.env.REACT_APP_OKTA_CLIENT_ID || '';

export const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://api.fingmeup.com';

export const SERVICE_DOMAIN = '/services/clientcenterservice';
