import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { VillainListComponent } from './villain/villain-list/villain-list.component';
import { VillainDetailComponent } from './villain/villain-detail/villain-detail.component';
import { VillainEditComponent } from './villain/villain-edit/villain-edit.component';
import { VillainComponent } from './villain/villain.component';
import { HttpClientModule } from '@angular/common/http';
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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
