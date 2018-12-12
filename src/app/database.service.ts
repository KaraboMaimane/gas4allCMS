import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Http, Headers, Response } from "@angular/http"; //finally this response
import {map} from "rxjs/operators"
import { Alert, promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  locations = [];
  arry=[];

  constructor(private http: Http) {
    firebase.initializeApp({
      apiKey: "AIzaSyDJdLBi-paptMqqNpIc6c5jHvIM6jOrb6s",
      authDomain: "fuelapp-6050c.firebaseapp.com",
      databaseURL: "https://fuelapp-6050c.firebaseio.com",
      projectId: "fuelapp-6050c",
      storageBucket: "fuelapp-6050c.appspot.com",
      messagingSenderId: "955542967293"
    });
  }

  register(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getUser() {
    return firebase.auth().currentUser.uid;
  }

  registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lat,lng,petrol93,petrol95,diesel,gas){
  
    return firebase.auth().onAuthStateChanged(data=>{
      if(data){
        return firebase.database().ref('businessRegistration/'+ userid).push({
          name:buisnessName,
          email:businessEmail,
          owner:businessOwner,
          tel:businessTel,
          lat:lat,
          lng:lng,
          petrol93:petrol93,
          petrol95:petrol95,
          diesel:diesel,
          gas:gas
      })
      }else{

        alert("login");

      }
    

  })
  }

  retrievePassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }
   update(userid,obj){
    firebase.database().ref(`userdb/${userid}`).update(obj);

  }

  updateProduct(userid,obj){
  return firebase.database().ref(`userdb/${userid}`).update(obj);
  }

  addpic(userid){
  return  firebase.database().ref('pic/'+ userid).set({
    url:"../../assets/maxresdefault (3).jpg"
    })
  }

  addUser(userid, userName, email) {
    return firebase.database().ref(`userdb/${userid}`).set({
      name: userName,
      email: email,

    }).then(data=>{
      this.addpic(userid);
    })

   
  }

  // geoLocation(place: string){
  //   return this.http.get(`https://www.globalpetrolprices.com/api/getGasXML_weekly.php?gasoline_diesel=1&rate=LC&countries=97&p=a7594c9d74a6422b728cff761a728e23`);
  // }

  retrieveBusinessInfor(){
    let userid = this.getUser();
    return new Promise((pass,fail)=>{
      firebase.database().ref('userdb/'+ userid).on('value',data =>{
        let infor = data.val();
      let buisnessName = infor.name;
      let  businessEmail = infor.email;
        console.log(infor + userid);
        let obj = {
          name:infor.name,
          email: infor.email
        }
          this.arry.push(obj)

   });
   pass(this.arry);
     })


  }

  retrieveInfor(userid ){

    return  firebase.database().ref('userdb/'+ userid);
  }
  retrieveBusinessDetails(userid){


  }


}
