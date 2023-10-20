import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { AuthGuard } from './guard/auth.guard';
import { authConfig } from './auth.config';

export function configureAuth(oauthService: OAuthService) {

  oauthService.configure(authConfig);
  oauthService.setupAutomaticSilentRefresh();
  return () => oauthService.loadDiscoveryDocumentAndTryLogin();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8081/'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    OAuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OAuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
