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



  constructor(private database: DatabaseService,private router: Router) {
    this.database.onAuth().then((state)=>{
      console.log(state)
      if(state == 1){
        this.router.navigate[('/home')]
       let user = this.database.getUser();
        console.log('im online')
        console.log(user)
      }
      else{
        this.router.navigate[('')]
        console.log('im offline')
      }
    })
    console.log('users!')
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
