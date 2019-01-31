import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  fail: boolean;
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  login(details: NgForm){
    this.showSpinner = true;
    console.log(details.form.value.password);
    this.database.register(details.form.value.email, details.form.value.password).then(
      (data)=>{
        console.log(data);
        this.router.navigate(['/signin']);

        let user = firebase.auth().currentUser;
        if(user.emailVerified == true){
          
    
    }else{

      //alert("confirm your email");
      this.database.confirmation();
    }

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

  signin(){
    this.router.navigate(["/signin"]);
  }
}
