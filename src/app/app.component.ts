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
    firebase.auth().onAuthStateChanged(function(userx) {
      if (userx) {
        // User is signed in.
<<<<<<< HEAD
        // let user = firebase.auth().currentUser;
        //console.log(userx);
      
        console.log("im online")
        if(userx.emailVerified == true){
          router.navigate(['/home'])
    }else{
      // alert("confirm");
    }
=======

        let user = firebase.auth().currentUser;
        console.log(user);

      
        console.log("im online")
   
      
        if(user.emailVerified == true){
       
          router.navigate(['/home']);
          
    
    }else{

      alert("confirm");
    }

    

>>>>>>> bfb1a1e8d303af7461d525e45c71640fb013daa0
      } else {
        // No user is signed in.
        console.log("im offline")
        router.navigate(['/app']);
      }
    });

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
