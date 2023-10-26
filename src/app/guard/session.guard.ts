import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

export class sessionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    // private router: Router,
  ) {
    this.configure();
  }

  private configure() {

  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('Session guard is called, in status: ' + this.tokenService.sessionExipre());
    
    if (await this.tokenService.sessionExipre()) {
      console.log('Session not expire from guard');
      return true;
    } else {
      console.log('Session expire fronm guard');
      console.log('Kick user to login page');
      this.authService.login();
      return false;
    }
  }
}
