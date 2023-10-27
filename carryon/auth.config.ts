import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/enterprise',
    redirectUri: window.location.origin,
    clientId: 'Keycloak-Auth',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile',
    logoutUrl: 'http://localhost:4200',
    revocationEndpoint: 'http://localhost:8080/realms/enterprise/protocol/openid-connect/revoke',
    dummyClientSecret: 'U3k2n9VTPg4YxEXbr1bpqBJ0VYnDTG8B',
}
