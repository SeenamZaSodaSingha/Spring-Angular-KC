import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-function1',
  templateUrl: './admin-function1.component.html',
  styleUrls: ['./admin-function1.component.css']
})
export class AdminFunction1Component {
  authenticated: boolean;
  role: string;
  menuCnt: number = 0;
  funcCnt: number = 0;
  userFuncCnt: number = 0;
  
  constructor(private oauthService: OAuthService, private router: Router, private http: HttpClient, private authService: AuthService) {
    this.authenticated = authService.isAuthenticated();
    this.role = authService.getUserRole();
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new  NullValidationHandler();
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // In your component class
  goToAdminMenu() {
    if (this.authenticated && this.role === 'Client-Admin') {this.http.get('http://localhost:8081/api/v1/admin', { observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => {
        this.menuCnt = response.body as number;
        if (response.status === 200) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/error']);
          console.error('Received a non-200 status code:', response.status);
        }
      },
      (error) => {
        // Handle error if needed
        console.error('An error occurred:', error);
      }
    );} else {
      //fix to go to 401
      this.router.navigate(['/unauth']);
    }
  }

  goToAdminFunc() {
    if (this.authenticated && this.role === 'Client-Admin') { this.http.get('http://localhost:8081/api/v1/admin/func', { observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => { // Explicitly type the response as HttpResponse<any>
        this.funcCnt = response.body as number;
        if (response.status === 200) {
          this.router.navigate(['/admin/func']); // Replace 'home' with your desired route
        } else {
          this.router.navigate(['/error']);
          console.error('Received a non-200 status code:', response.status);
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );} else {
      this.router.navigate(['/unauth']);
    }
  }

  goToUserFunc() {
    if (this.authenticated && ((this.role === 'Client-User') || (this.role === 'Client-Admin'))) {this.http.get('http://localhost:8081/api/v1/user/func', { observe: 'response' })
    .subscribe(
      (response: HttpResponse<any>) => {
        this.userFuncCnt = response.body as number;
        if (response.status === 200) {
          this.router.navigate(['/user/func']);
        } else {
          console.error('Received a non-200 status code:', response.status);
        }
      },
      (error) => {
        // Handle error if needed
        console.error('An error occurred:', error);
      }
    );} else {
      //fix to go to 401
      this.router.navigate(['/unauth']);
    }
  }

  logout() {
    this.router.navigate(['/']);
    this.oauthService.logOut();
  }
}
