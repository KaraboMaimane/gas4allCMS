import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  login(details: NgForm){
    this.showSpinner = true;
    console.log(details.form.value.password);
    this.database.login(details.form.value.email, details.form.value.password).then(
      (data)=>{
        console.log(data);
        this.showSpinner = false;
        this.success = true;
        this.router.navigate(['/products'])
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

}
