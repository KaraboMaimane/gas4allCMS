import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
declare var Swal;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  showSpinner: boolean = false;
  success: boolean;
  fail: boolean;
  message: boolean;
  messagetext: string = '';
  constructor(private database: DatabaseService, public router: Router) { }

  ngOnInit() {
  }

  nextpage(page: string) {
    this.router.navigate([page]);
  }

  register(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please vnter valid infomation',
        footer: '<a href>Some fields are invalid or empty</a>'
      })
    } else {
      this.showSpinner = true;
      this.database.register(form.form.value.email, form.form.value.password).then(
        (data) => {
          console.log(data);
          this.showSpinner = false;
          this.success = true;
          let user = firebase.auth().currentUser;
          Swal.fire({
            position: 'center',
            type: 'information',
            title: 'Please verify your email address ',
            showConfirmButton: false,
            timer: 3000
          })
          user.sendEmailVerification().then(function (a) {
            console.log(a);

          }).catch((error) => {

            // An error happened.
          });
          // this.router.navigate(['/next-page']);


        }
      )
        .catch(
          (error) => {
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
        )
    }
  }

}
