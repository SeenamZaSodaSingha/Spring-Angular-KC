import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-public-function1',
  templateUrl: './public-function1.component.html',
  styleUrls: ['./public-function1.component.css']
})
export class PublicFunction1Component {


  constructor(private oauthService: OAuthService, private router: Router, private http: HttpClient) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // In your component class
  goToPublicMenu() {
    this.http.get('http://localhost:8081/', { observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => { // Explicitly type the response as HttpResponse<any>
        // Handle the response from the backend as needed
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
    this.http.get('http://localhost:8081/func', { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => { // Explicitly type the response as HttpResponse<any>
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
