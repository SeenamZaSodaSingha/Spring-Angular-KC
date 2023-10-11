import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private authService: AuthService) {}

  // Retrieve the access token from local storage
  getAccessToken(): string | null {
    return sessionStorage.getItem('refresh_token');
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
