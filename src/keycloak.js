import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak()
keycloak.loginRequired = true
keycloak.responseMode = 'query'

export default keycloak
