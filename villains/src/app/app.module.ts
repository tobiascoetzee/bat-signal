import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { VillainListComponent } from './villain/villain-list/villain-list.component';
import { VillainDetailComponent } from './villain/villain-detail/villain-detail.component';
import { VillainEditComponent } from './villain/villain-edit/villain-edit.component';
import { VillainComponent } from './villain/villain.component';
import { AuthGuard } from './user/auth-guard.service';
import { AuthService } from './user/auth.service';
import { HttpModule } from '@angular/http';
import { VillainItemComponent } from './villain/villain-list/villain-item/villain-item.component';
import { VillainStartComponent } from './villain/villain-start/villain-start.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    VillainListComponent,
    VillainDetailComponent,
    VillainEditComponent,
    VillainComponent,
    VillainItemComponent,
    VillainStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
