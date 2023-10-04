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
    // console.log('User role from ROLE G.: ' + userRole);
    console.log(route.data ? 'Have roles': 'No roles')
    const allowRoles: string[] = route.data['allowRoles'];
    console.log(allowRoles);
    if (userRole == null) {
      this.router.navigate(['/unauth']);
      return false;
    }
      const hasAllowedRole = allowRoles.includes(userRole);
      // console.log('has role: ' + hasAllowedRole);
      if (hasAllowedRole) {
        return true;
      } else { 
        this.router.navigate(['/unauth']);  
        return false;
      }
    
  }
}