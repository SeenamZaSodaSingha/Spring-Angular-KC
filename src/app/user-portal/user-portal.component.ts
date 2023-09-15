import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent {


  constructor(private oauthService: OAuthService, private router: Router, private http: HttpClient) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  goToUserMenu() {
    // this.router.navigate(['/user']); // Navigate to the admin menu
    this.http.get('http://localhost:8081/api/v1/user', { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => { // Explicitly type the response as HttpResponse<any>
          // Handle the response from the backend as needed
          if (response.status === 200) {
            // If the response status is 200 OK, redirect to a specific Angular route
            this.router.navigate(['/home']); // Replace 'home' with your desired route
          } else {
            // Handle other status codes if needed
            console.error('Received a non-200 status code:', response.status);
          }
        },
        (error) => {
          // Handle error if needed
          console.error('An error occurred:', error);
        }
      );
  }

  goToUserFunc() {
    this.router.navigate(['/user/func']); // Navigate to the admin menu
  }

  logout() {
    this.oauthService.logOut();
  }

}
