import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/enterprise',
    redirectUri: window.location.origin,
    clientId: 'Keycloak-Auth',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    // sessionChecksEnabled: true,
    scope: 'openid profile',

    dummyClientSecret: 'U3k2n9VTPg4YxEXbr1bpqBJ0VYnDTG8B',
}
