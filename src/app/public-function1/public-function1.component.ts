import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-function1',
  templateUrl: './public-function1.component.html',
  styleUrls: ['./public-function1.component.css']
})
export class PublicFunction1Component {

  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // In your component class
  goToPublicMenu() {
    this.router.navigate(['/']); // Navigate to the admin menu
    // window.location.href = 'http://localhost:8081';
  }

  goToPublicFunc() {
    this.router.navigate(['/public/func']); // Navigate to the admin menu
    // window.location.href = 'http://localhost:8081/func';
  }

  login() {
    this.oauthService.initCodeFlow();
  }
}
