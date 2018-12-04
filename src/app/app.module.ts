import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { BusinessformComponent } from './businessform/businessform.component';
import { HttpModule } from '@angular/http';
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'retrieve', component: RetrieveComponent},
  {path: 'map', component: MapComponent},
  {path: 'business', component: BusinessformComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RetrieveComponent,
    BusinessformComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAT55USDnQ-tZLHJlzryDJbxseD8sLSdZE'
    }),
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
    
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
