import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import locationsArr from '../app/GlobalArray';

import { Http, Headers, Response } from "@angular/http"; //finally this response
// import { map } from "rxjs/operators"
// import { Alert, promise } from 'selenium-webdriver';
import Swal from 'sweetalert2';
import { Popup } from 'ng2-opd-popup';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  locations = [];
  arry = [];
  state;
  authenticate = firebase.auth();
  userName
  userEmail
  userOwner
  userPetrol93
  userPetrol95
  userDiesel;
  infor = new Array();
  userGas
  userAddress
  userTel
  shoptype
  details = new Array();
  constructor(private popup: Popup, private http: Http) {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDJdLBi-paptMqqNpIc6c5jHvIM6jOrb6s",
    //   authDomain: "fuelapp-6050c.firebaseapp.com",
    //   databaseURL: "https://fuelapp-6050c.firebaseio.com",
    //   projectId: "fuelapp-6050c",
    //   storageBucket: "fuelapp-6050c.appspot.com",
    //   messagingSenderId: "955542967293"
    // });
  }

  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      let user = firebase.auth().currentUser;
      console.log(user);

      user.sendEmailVerification().then(function (a) {
        console.log(a);

      }).catch(function (error) {
        // An error happened.
      });
    });

  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);

  }

  getUser() {
    return firebase.auth().currentUser.uid;
  }

  onAuth() {
    return new Promise((accpt, rej) => {
      this.authenticate.onAuthStateChanged(user => {
        if (user != null) {
          this.state = 1;
        }
        else {
          this.state = 0;
        }
        accpt(this.state)
      })

    })
  }

  forgotPassword(email: any) {
    return this.authenticate.sendPasswordResetEmail(email);
  }

  logOut() {
    console.log('exit')
    return new Promise((accpt, rej) => {
      this.authenticate.signOut();
      accpt("log Out Success")
    })
  }

  registerBusiness(userid, buisnessName, businessEmail, businessOwner, businessTel, lat, lng, petrol93, petrol95, diesel, gas) {

    return firebase.auth().onAuthStateChanged(data => {
      if (data) {
        return firebase.database().ref('businessRegistration/' + userid).push({
          name: buisnessName,
          email: businessEmail,
          owner: businessOwner,
          tel: businessTel,
          lat: lat,
          lng: lng,
          petrol93: petrol93,
          petrol95: petrol95,
          diesel: diesel,
          gas: gas
        })
      } else {

        alert("login");

      }


    })
  }

  retrievePassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  update(userid, obj) {
    firebase.database().ref(`userdb/${userid}`).update(obj);

  }

  updateProduct(userid, obj) {
    return firebase.database().ref(`userdb/${userid}`).update(obj);
  }

  addpic(userid) {
    return firebase.database().ref('pic/' + userid).set({
      url: "../../assets/maxresdefault (3).jpg"
    })
  }

  addUser(userid, userName, email) {
    return firebase.database().ref(`userdb/${userid}`).set({
      name: userName,
      email: email,

    }).then(data => {
      this.addpic(userid);
    })


  }

  // geoLocation(place: string){
  //   return this.http.get(`https://www.globalpetrolprices.com/api/getGasXML_weekly.php?gasoline_diesel=1&rate=LC&countries=97&p=a7594c9d74a6422b728cff761a728e23`);
  // }

  retrieveBusinessInfor() {
    let userid = this.getUser();
    return new Promise((pass, fail) => {
      firebase.database().ref('userdb/' + userid).on('value', data => {
        let infor = data.val();
        let buisnessName = infor.name;
        let businessEmail = infor.email;
        console.log(infor + userid);
        let obj = {
          name: infor.name,
          email: infor.email
        }
        this.arry.push(obj)

      });
      pass(this.arry);
    })


  }

  retrieveInfor() {
    locationsArr.length = 0;
    let userid = this.getUser();
    return new Promise((accpt, rej) => {
      firebase.database().ref('userdb/' + userid).on('value', (data: any) => {
        var business = data.val();
        // console.log(business);

        
      
          let obj = {
            address: business.address,
diesel: business.diesel,
email:  business.email,
gas: business.gas,
icon:  business.icon,
lat:  business.lat,
lng: business.lng,
name:  business.name,
owner: business.owner,
petrol93: business.petrol93,
petrol95: business.petrol95,
tel:  business.tel,
uid:business.uid,
          }

         // this.details.push(obj);
        locationsArr.push(obj);
          console.log(locationsArr[0].address);

          
 
     
        // this.userName = infor.name;
        // this.userEmail = infor.email;
        // this.userOwner = infor.owner;
        // this.userPetrol93 = infor.petrol93;
        // this.userPetrol95 = infor.petrol95;
        // this.userDiesel = infor.diesel;
        // this.userGas = infor.gas;
        // this.userAddress = infor.address;
        // this.userTel = infor.tel;
        // this.shoptype = infor.icon;
      })
    })

    // return firebase.database().ref('userdb/' + userid);
  }

  retrieveBusinessDetails(userid) {


  }

  showPopup() {
    this.popup.options = {
      color: "#2196F3"
    }
    this.popup.show();
    console.log('pop')
  }

  success() {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Your data has been saved',
      showConfirmButton: false,
      timer: 2500
    })
  }


  confirmation() {
    Swal.fire({
      position: 'center',
      type: 'information',
      title: 'Please verify your email address ',
      showConfirmButton: false,
      timer: 3000
    })
  }

  fail() {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Some fields are invalid or empty</a>'
    })
  }
}
