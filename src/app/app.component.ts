import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase'
import { Alert } from 'selenium-webdriver';

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
<<<<<<< HEAD
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // User is signed in.
    //     console.log("im online")
    //     router.navigate(['/home']);
    //   } else {
    //     // No user is signed in.
    //     console.log("im offline")
    //     router.navigate(['/app']);
    //   }
    // });
=======
    firebase.auth().onAuthStateChanged(function(userx) {
      if (userx) {
        // User is signed in.

        let user = firebase.auth().currentUser;
        console.log(user);

      
        console.log("im online")
   
      
        if(user.emailVerified == true){
       
          router.navigate(['/home']);
          
    
    }else{

      alert("confirm");
    }

    

      } else {
        // No user is signed in.
        console.log("im offline")
        router.navigate(['/app']);
      }
    });
>>>>>>> 67ed67c483c85f47654fdc478c7fd383d4cf0a65

  }


  login(email, password){
    this.database.login(email, password).then((data)=>{
      console.log(data);
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
