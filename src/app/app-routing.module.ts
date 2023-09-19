import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFunction1Component } from './admin-function1/admin-function1.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { PublicFunction1Component } from './public-function1/public-function1.component';
import { PublicPortalComponent } from './public-portal/public-portal.component';
import { UserFunction1Component } from './user-function1/user-function1.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';

const routes: Routes = [
  { path: '', component: PublicPortalComponent },
  { path: 'func', component: PublicFunction1Component },
  { path: 'user', component: UserPortalComponent },
  { path: 'user/func', component: UserFunction1Component },
  { path: 'admin', component: AdminPortalComponent },
  { path: 'admin/func', component: AdminFunction1Component },
  { path: 'error', component: ErrorHandlerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
