import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { authConfig } from '../auth.config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-public-portal',
  templateUrl: './public-portal.component.html',
  styleUrls: ['./public-portal.component.css'],
})
export class PublicPortalComponent {
  menuCnt: number = 0;
  funcCnt: number = 0;

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // In your component class
  goToPublicMenu() {
    // window.location.href = 'http://localhost:8081';
    this.http.get('http://localhost:8081/', { observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        // Explicitly type the response as HttpResponse<any>
        // Handle the response from the backend as needed
        this.menuCnt = response.body as number;
        if (response.status === 200) {
          // If the response status is 200 OK, redirect to a specific Angular route
          this.router.navigate(['/']); // Replace 'home' with your desired route
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

  goToPublicFunc() {
    // Send a GET request to your backend endpoint
    this.http
      .get('http://localhost:8081/func', { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          // Explicitly type the response as HttpResponse<any>
          this.funcCnt = response.body as number;
          // Handle the response from the backend as needed
          if (response.status === 200) {
            // If the response status is 200 OK, redirect to a specific Angular route
            this.router.navigate(['/func']); // Replace 'home' with your desired route
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

  login() {
    this.oauthService.initCodeFlow();
  }
}
