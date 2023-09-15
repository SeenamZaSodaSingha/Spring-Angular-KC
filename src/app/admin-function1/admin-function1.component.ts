import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';

@Component({
  selector: 'app-admin-function1',
  templateUrl: './admin-function1.component.html',
  styleUrls: ['./admin-function1.component.css']
})
export class AdminFunction1Component {
  
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // In your component class
  goToAdminMenu() {
    this.router.navigate(['/admin']); // Navigate to the admin menu
  }

  goToAdminFunc() {
    this.router.navigate(['/admin/func']); // Navigate to the admin menu
  }

  goToUserFunc() {
    this.router.navigate(['/user/func']); // Navigate to the admin menu
  }

  logout() {
    this.oauthService.logOut();
  }
}
