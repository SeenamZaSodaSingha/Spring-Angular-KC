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


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
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
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.isAuthenticated());
      console.log('User is authenticated');
      return true; // User is authenticated, allow access
    } else {
      console.log('User is not authenticated');
      console.log(this.authService.isAuthenticated());
      this.authService.login();
      /**
       * After login, the system instantely check the token and redirect to the login page again
       * because of the pkce flow. So, we need to return false here and redirect to the login page
       */
      return false;
    }
  }
}