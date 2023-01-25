import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/authguard.service';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: ContactTableComponent},
  { path: 'signin-oidc', component: LoginCallbackComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}