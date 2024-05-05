import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components from both branches
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  // Add routes from both branches
  { path: 'login', component: LoginComponent },
  { path: 'userprofile', component: ProfilComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
  // Add any other routes or guards as needed
  // { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
