import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private oauthService: OAuthService, private router: Router) {}

  title = 'spring-kc-frontend';

  idleTimer: any = null;
  delay(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }


  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  async resetIdleTimer(event: MouseEvent | KeyboardEvent) {
    clearTimeout(this.idleTimer);
    
    this.idleTimer = setTimeout(async () => {
      console.log('User is idle');
      console.log('Logging out');
      await this.delay(1000);
      this.authService.logout();
    }, 60000000); // 1 minutes (adjust the duration as needed)
  }
}