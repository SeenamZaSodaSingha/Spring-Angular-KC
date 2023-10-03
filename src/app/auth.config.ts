import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/enterprise',
    redirectUri: 'http://localhost:4200',
    clientId: 'springboot-keycloak',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email',
    options: {
        onLoad: 'login-required',
        checkLoginIframe: false
    }
}