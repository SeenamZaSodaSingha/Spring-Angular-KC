// auth.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private oauthService: OAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {

    if (this.authService.isAuthenticated() && !this.authService.isAdminRoute(route, state) ) {
      return true;
    } else if (this.authService.isAuthenticated() && this.authService.isAdminRoute(route, state) ){
      return true;
    } else return false;
  }
}
