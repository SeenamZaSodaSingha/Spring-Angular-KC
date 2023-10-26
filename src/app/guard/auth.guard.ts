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
import { Observable, catchError, map, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   // if (this.authService.isAuthenticated() && !this.tokenService.isTokenExpired(this.oauthService.getAccessToken())) {
  //   if (this.authService.isAuthenticated()) {
  //     // console.log('Session check: ' + this.authService.sessionCheck());
  //     // this.authService.sessionCheck();
  //     console.log(this.authService.isAuthenticated());
  //     console.log('User is authenticated');
  //     return true;
  //   } else {
  //     console.log('User is not authenticated');
  //     console.log(this.authService.isAuthenticated());
  //     this.authService.login();
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    return this.authService.isAuthenticated().pipe(
      map((response: HttpResponse<any>) => {
        console.log('Response from auth service: ' + response.status);
        if (response && response.status === 200) {
          console.log('User is authenticated');
          return true;
        } else if (response && response.status === 401) {
          console.log('User is not authenticated');
          return false;
        } else {
          console.log('Unknown response or error');
          return false; // Handle other statuses or errors
        }
      }),
      catchError((error) => {
        console.log('HTTP request error:', error);
        // Handle the error as needed, e.g., redirect to a login page
        return of(false); // Return false to prevent activation in case of an error
      })
    );
  }
}
