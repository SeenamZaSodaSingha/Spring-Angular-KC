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
    // console.log('claims: ' + claims);
    //not have role
    // console.log(claims['resource_access']['springboot-keycloak'] == null);
    //have role
    if (!claims) {
      return null;
    } if(claims['resource_access']['springboot-keycloak'] == null){
      console.log('Have claims but not roles  `');
      return null;
    }
    console.log('User have claims from get user roles');
    return (claims['resource_access']['springboot-keycloak']['roles']).toString();
  }
}
