import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { VillainComponent } from './villain/villain.component';
import { AuthGuard } from './user/auth-guard.service';

const routes: Routes = [
{ path: '', component: SigninComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'villains', canActivate: [AuthGuard], component: VillainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
