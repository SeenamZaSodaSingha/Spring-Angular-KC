// auth.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authenticated: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService
  ) {
    this.authenticated = authService.isAuthenticated();
    this.configure();}

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticated) {
      console.log(this.authenticated);
      console.log('User is authenticated');
      this.router.navigate(['/']);
      return true; // User is authenticated, allow access
    } else {
      console.log('User is not authenticated');
      console.log(this.authenticated);
      // User is not authenticated, redirect to the login page
      this.oauthService.initCodeFlow();
    }
    return true;
  }
}