import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
  
})
export class LoginPageComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  fail: boolean;
  conditionFail:boolean;
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  login(details: NgForm){

    this.showSpinner = true;
    console.log(details.form.value.password);
    this.database.login(details.form.value.email, details.form.value.password).then(
      (data)=>{
       
        console.log(data.user.emailVerified);
        
        this.showSpinner = false;
<<<<<<< HEAD
        
         if(data.user.emailVerified ==true){
          this.router.navigate(['/home'])
          this.success = true;
       
         }else {
          // alert("Verify your email")
          this.fail = true;
           this.database.confirmation();
           this.database.logOut();
           
         }
        
       
=======
        this.success = true;
         this.router.navigate(['/products'])
>>>>>>> bfb1a1e8d303af7461d525e45c71640fb013daa0
      }
    ).catch(
      (error)=>{
        console.log(error);
        this.showSpinner = false;
        this.showFail();
      }
    );
  }

  showFail(){
    console.log('fail');
    this.fail = true;
    let timer = setInterval(()=>{
      this.fail = false;
      clearInterval(timer);
    }, 3000);
  }

  signup(){
    this.router.navigate(["/signup"]);
  }

}
