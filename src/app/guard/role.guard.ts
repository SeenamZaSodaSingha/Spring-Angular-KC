// role.guard.ts

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
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
    console.log(route.data ? 'User Have roles': 'No roles')
    const allowRoles: string[] = route.data['allowRoles'];
    console.log(allowRoles);
    if (userRole == null) {
      this.router.navigate(['/unauth']);
      return false;
    }
      const hasAllowedRole = allowRoles.includes(userRole);
      if (hasAllowedRole) {
        return true;
      } else { 
        this.router.navigate(['/unauth']);  
        return false;
      }
  }
}