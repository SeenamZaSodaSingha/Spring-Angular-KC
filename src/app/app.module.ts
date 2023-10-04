import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
// import { initializeKeycloak } from './init/keycloak-init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './guard/auth.guard';
import { authConfig } from './auth.config';

export function configureAuth(oauthService: OAuthService) {

  oauthService.configure(authConfig);
  oauthService.setupAutomaticSilentRefresh();
  return () => oauthService.loadDiscoveryDocumentAndLogin();
}

@NgModule({
  declarations: [AppComponent, UnauthorizedComponent, ForbiddenComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
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
