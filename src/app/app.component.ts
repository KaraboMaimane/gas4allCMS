import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email: string;
  password: string;
  username: string;
  
  loginDisplay = 'none';
  registerDispaly = 'none';



  constructor(private database: DatabaseService,router: Router) {
    
    console.log('users!')
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("im onine")
        router.navigate(['/next-page']);
      } else {
        // No user is signed in.
        console.log("im offline")
        router.navigate(['/app']);
      }
    });

  }


  login(email, password){
    this.database.login(email, password).then((data)=>{
      alert(`${data.user.email} is successfully registered`);
      console.log(data);
    }).catch((error)=>{
      alert(error);
    });
  }

  setUsername(event){
    this.username = event.target.value;
  }

  setEmail(event){
    this.email = event.target.value;
  }

  setPassword(event){
    this.password = event.target.value;
  }
}
