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
  menuCnt: number = 0;
  funcCnt: number = 0;


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
      (response: HttpResponse<any>) => {
        this.menuCnt = response.body as number;
        if (response.status === 200) {
          this.router.navigate(['/']);
        } else {
          console.error('Received a non-200 status code:', response.status);
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  goToPublicFunc() {
    this.http.get('http://localhost:8081/func', { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          this.funcCnt = response.body as number;
          if (response.status === 200) {
            this.router.navigate(['/func']);
          } else {
            console.error('Received a non-200 status code:', response.status);
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }

  login() {
    this.oauthService.initCodeFlow();
  }
}
