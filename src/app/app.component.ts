import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
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



  constructor(private database: DatabaseService) {

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
