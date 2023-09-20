import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getUserInfo(): any {
    return this.oauthService.getIdentityClaims();
  }

  getUserRole: any = () => {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return (claims['resource_access']['springboot-keycloak']['roles']).toString();
  }

  isAdminRoute(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAdminRoute = route.data['isAdminRoute'];
    console.log('isAdminRoute: ' + isAdminRoute);
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return false;
    }
    if(isAdminRoute && (claims['resource_access']['springboot-keycloak']['roles']).toString() === 'Client-Admin'){
      console.log('userRole: ' + (claims['resource_access']['springboot-keycloak']['roles']).toString() + 'IsAdminRoute: ' + isAdminRoute);
      return true;
    }
    return false;
  }
}
