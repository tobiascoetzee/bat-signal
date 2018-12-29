import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { VillainComponent } from './villain/villain.component';
import { AuthGuard } from './user/auth-guard.service';
import { VillainStartComponent } from './villain/villain-start/villain-start.component';
import { VillainEditComponent } from './villain/villain-edit/villain-edit.component';
import { VillainDetailComponent } from './villain/villain-detail/villain-detail.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'villains',
    canActivate: [AuthGuard],
    component: VillainComponent,
    children: [
      { path: '', component: VillainStartComponent },
      { path: 'new', component: VillainEditComponent },
      { path: ':id', component: VillainDetailComponent },
      { path: ':id/edit', component: VillainEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
