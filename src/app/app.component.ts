import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

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
    }, 600000); // 1 minutes (adjust the duration as needed)
  }
}