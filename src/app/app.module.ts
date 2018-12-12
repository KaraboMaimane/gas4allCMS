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
import { MediaService } from './media.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { SettingsComponent } from './settings/settings.component';
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'retrieve', component: RetrieveComponent},
  {path: 'map', component: MapComponent},
  {path: 'business', component: BusinessformComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'profile', component: BusinessProfileComponent},
    {path: 'products', component: CardlistComponent},
    {path: 'settings', component: SettingsComponent}
  ]},
  
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
    BusinessformComponent,
    DashboardComponent,
    CardlistComponent,
    BusinessProfileComponent, SettingsComponent
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
  providers: [DatabaseService, MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
