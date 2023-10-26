import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { authConfig } from '../auth.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private authService: AuthService, private http: HttpClient) {}
  private introspectUrl = 'http://localhost:8080/realms/enterprise/protocol/openid-connect/token/introspect';


  // Retrieve the access token from local storage
  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  introspection(): Observable<{ active: boolean }> {
    const token = this.getAccessToken();
    const clientId = authConfig.clientId;
    const clientSecret = authConfig.dummyClientSecret;

    const body = `token=${token}&client_id=${clientId}&client_secret=${clientSecret}&token_type_hint=access_token`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    // .set('Access-Control-Allow-Origin', '*');
    return this.http.post<{ active: boolean }>(this.introspectUrl, body, { headers });
  }

  sessionExipre(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.introspection().subscribe(
        (response) => {
          if (response.active) {
            console.log("response status from if: " + response.active);
            console.log('Access token is active');
            resolve(true);
          } else {
            console.log("response status from else: " + response.active);
            console.log('Access token is not active');
            resolve(false);
          }
        },
        (error) => {
          console.error('Error introspecting token:', error);
          reject(error); // You can also reject the promise in case of an error
        }
      );
    });
  }
  


  // Check if a token is expired
  isTokenExpired(token: string | null): boolean {
    console.log('Toekn expire is called');
    if (!token) {
      console.log('Token is null');
      return true; // Token is invalid or not present
    }

    const tokenData = this.parseToken(token);
    if (!tokenData) {
      console.log('Token is invalid');
      return true; // Token is invalid or expired
    }
    // console.log('Token Expire: ' + tokenData.exp);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    console.log('Current Time: ' + currentTime);
    console.log('Token Expire: ' + tokenData.exp);
    if (tokenData.exp < currentTime)
      {this.authService.logout();}
      return tokenData.exp < currentTime;
  }

  // Helper function to parse a JWT token and extract its payload
  private parseToken(token: string): any | null {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        return null;
      }
      const payload = JSON.parse(atob(tokenParts[1]));
      if (!payload.exp) {
        return null;
      }
      return payload;
    } catch (error) {
      return null;
    }
  }
}
