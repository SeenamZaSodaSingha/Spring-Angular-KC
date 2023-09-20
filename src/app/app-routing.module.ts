import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFunction1Component } from './admin-function1/admin-function1.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { PublicFunction1Component } from './public-function1/public-function1.component';
import { PublicPortalComponent } from './public-portal/public-portal.component';
import { UserFunction1Component } from './user-function1/user-function1.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { AuthGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', component: PublicPortalComponent,  data: { isAdminRoute: false } },
  { path: 'func', component: PublicFunction1Component,  data: { isAdminRoute: false } },
  { path: 'user', component: UserPortalComponent, canActivate: [AuthGuard], data: { isAdminRoute: false }},
  { path: 'user/func', component: UserFunction1Component, canActivate: [AuthGuard],  data: { isAdminRoute: false } },
  { path: 'admin', component: AdminPortalComponent, canActivate: [AuthGuard],  data: { isAdminRoute: true } },
  { path: 'admin/func', component: AdminFunction1Component,  canActivate: [AuthGuard],  data: { isAdminRoute: true } },
  { path: 'error', component: ErrorHandlerComponent, canActivate: [AuthGuard] },
  { path: 'unauth', component: UnauthorizedComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
