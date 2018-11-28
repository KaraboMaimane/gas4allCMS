import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  async login(username: string, password: string){
    await this.database.login(username, password).then(
      (data)=>{
        alert('You have successfully logged in');
        this.router.navigate(['/map']);
      }
    ).catch(error=>{
      console.log(error);
    });
  }

}
