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

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private oauthService: OAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole: string = this.authService.getUserRole();
    if (userRole == null) {
      this.router.navigate(['/unauth']);
      return false;
    }
    if (
      route.data['isAdminRoute'] &&
      this.authService.isAuthenticated() &&
      userRole === 'Client-Admin'
    ) {
      console.log('Route daata: ' + route.data['isAdminRoute']);
      console.log('User role: ' + userRole);
      console.log('Auth' + this.authService.isAuthenticated());
      return true;
    } else if (
      this.authService.isAuthenticated() &&
      !route.data['isAdminRoute']
    ) {
      return true;
    } else {
      this.router.navigate(['/unauth']);
      console.log('User is not authorized to access this page');
      return false;
    }
  }
}
