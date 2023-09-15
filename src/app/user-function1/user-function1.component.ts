import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-function1',
  templateUrl: './user-function1.component.html',
  styleUrls: ['./user-function1.component.css']
})
export class UserFunction1Component {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  goToUserMenu() {
    this.router.navigate(['/user']); // Navigate to the admin menu
  }

  goToUserFunc() {
    this.router.navigate(['/user/func']); // Navigate to the admin menu
  }

  logout() {
    this.oauthService.logOut();
  }
}
