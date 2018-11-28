import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  async register(username, email, password) {
    console.log(username, email, password);
    await this.database.register(email, password).then((data) => {
      this.database.addUser(data.user.uid, username, data.user.email);
      alert('You have successfully registered!');
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error);
    })
  }

}

