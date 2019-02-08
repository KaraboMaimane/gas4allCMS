import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
declare var Swal
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']

})
export class LoginPageComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  fail: boolean;
  conditionFail: boolean;
  message: boolean;
  messagetext: any;
  email: any;
  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  login(details: NgForm) {
    if (details.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please vnter valid infomation',
        footer: '<a href>Some fields are invalid or empty</a>'
      })
    } else {
      this.showSpinner = true;
      console.log(details.form.value.password);
      this.database.login(details.form.value.email, details.form.value.password).then(
        (data) => {

          console.log(data.user.emailVerified);

          this.showSpinner = false;
          this.success = true;
          this.router.navigate(['/home'])
        }
      ).catch(
        (error) => {
          console.log(error);
          // this.showSpinner = false;
          // this.showFail();

          console.log(error.message);
          this.message = true;
          this.messagetext = error.message;
          this.showSpinner = false;
          this.fail = true;
          let timer = setInterval(() => {
            this.fail = false;
            clearInterval(timer);
          }, 2000)
          let timer2 = setInterval(() => {
            this.message = false;
            clearInterval(timer2);
          }, 4000)
        }
      );
    }
  }

  showFail() {
    console.log('fail');
    this.fail = true;
    let timer = setInterval(() => {
      this.fail = false;
      clearInterval(timer);
    }, 3000);
  }

  signup() {
    this.router.navigate(["/signup"]);
  }

  passwordReset() {
    const { value: email } = Swal.fire({
      title: 'Enter your email address',
      input: 'email',
      showCancelButton: true,
      inputValidator: (value) => {
        if (value) {
          console.log(value)
          this.database.forgotPassword(value).then((email) => {
            console.log(email);
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'email has been sent,please check your emails',
              showConfirmButton: false,
              timer: 2500
            })
          })
          Swal.fire(`Your IP address is ${value}`)
        }
        return !value && 'You need to write something!';

      }

    })



    // const {value:email} = Swal.fire({
    //   title: 'Input email address',
    //   input: 'email',
    //   inputValue: ' ',
    //   inputPlaceholder: 'Enter your email address'
    // })
    // console.log(this.email)
    // if (email) {
    //   console.log(email)
    //   // this.database.forgotPassword(email).then((email)=>{
    //   //   console.log(email);
    //   // })
    //   Swal.fire('Entered email: ' + email)

    // }

  }

}
