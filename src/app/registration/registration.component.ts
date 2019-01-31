import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  constructor(private database: DatabaseService, public router: Router) { }

  ngOnInit() {
  }

  register(form: NgForm){
    this.showSpinner = true;
    this.database.register(form.form.value.email, form.form.value.password).then(
      (data)=>{
        console.log(data);
        this.showSpinner = false;
        this.success = true;
        let user = firebase.auth().currentUser;

       user.sendEmailVerification().then(function(a) {
         console.log(a);


       }).catch(function(error) {
       // An error happened.
       });
        // this.router.navigate(['/next-page']);


      }
    )
    .catch(
      (error)=>{
        console.log(error);
      }
    )
  }

}
