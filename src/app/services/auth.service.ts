import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userInfoUrl = 'http://localhost:8080/realms/enterprise/protocol/openid-connect/userinfo';
  private authCheckUrl = 'http://localhost:8081/authorized';

  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.oauthService.setupAutomaticSilentRefresh(); // If not already configured
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  // isAuthenticated(): boolean {
  //   console.log('get user info: ' + this.getUserInfo());
  //   return this.oauthService.hasValidAccessToken();
  // }

  isAuthenticated() {
    return this.http.get(this.authCheckUrl, { observe: 'response' });
  }

  getUserInfo(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
    });

    return this.http.get(this.userInfoUrl, { headers }).pipe(
      map(() => true), // If the request is successful, return true.
      catchError(() => {
        console.error('Error fetching user info');
        return of(false); // If there's an error, return false.
      })
    );
  }

  getUserRole: any = () => {
    const accessToken: any = this.oauthService.getAccessToken();
    if (!accessToken) {
      return null;
    }
    console.log(accessToken == null ? 'Token is null' : 'Token is not null');
    console.log(accessToken);
    const decodedToken: any = jwt_decode(accessToken);
    console.log('User have claims');
    console.log(decodedToken);
    // console.log((claims['resource_access']).toString());
    if (decodedToken['resource_access']['Keycloak-Auth'] == null) {
      console.log('Have claims but not roles  `');
      return null;
    }
    console.log('User have claims from get user roles');
    console.log(decodedToken['resource_access']['Keycloak-Auth']['roles']);
    return decodedToken['resource_access']['Keycloak-Auth']['roles'].toString();
  };
}
