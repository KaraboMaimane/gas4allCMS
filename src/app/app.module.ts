import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { AgmCoreModule } from '@agm/core';
import { HomeComponent } from './home/home.component';

import { Route, RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { MediaService } from './media.service';


//New Components
import { LoginPageComponent } from './login-page/login-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RegistrationComponent } from './registration/registration.component';
import * as firebase from 'firebase'
import { SignupComponent } from './signup/signup.component';
import { LoaderComponent } from './loader/loader.component';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDJdLBi-paptMqqNpIc6c5jHvIM6jOrb6s",
    authDomain: "fuelapp-6050c.firebaseapp.com",
    databaseURL: "https://fuelapp-6050c.firebaseio.com",
    projectId: "fuelapp-6050c",
    storageBucket: "fuelapp-6050c.appspot.com",
    messagingSenderId: "955542967293"
  };
  firebase.initializeApp(config);

const appRoutes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'signin', component: LoginPageComponent},
  {path:'home', component:HomeComponent},
  {path:'signup', component: RegistrationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent, 
    SpinnerComponent,
    RegistrationComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAT55USDnQ-tZLHJlzryDJbxseD8sLSdZE'
    }),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    NgxCleaveDirectiveModule
  ],
  providers: [DatabaseService, MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
