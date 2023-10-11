// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService
  ) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getAccessToken();

    console.log('Token Expire: ' + this.tokenService.isTokenExpired(token));

    // if (this.authService.isAuthenticated() && !this.tokenService.isTokenExpired(token)) {
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated());
      console.log('User is authenticated');
      // if(this.tokenService.isTokenExpired(token)){
      //   this.authService.login();
      //   return false;
      // }
      return true;
    } else {
      console.log('User is not authenticated');
      console.log(this.authService.isAuthenticated());
      this.authService.login();
      return false;
    }
  }
}