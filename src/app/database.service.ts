import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Http, Headers, Response } from "@angular/http"; //finally this response
import {map} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  locations = [];

  constructor(private http: Http) {
    firebase.initializeApp({
      apiKey: "AIzaSyDJdLBi-paptMqqNpIc6c5jHvIM6jOrb6s",
      authDomain: "fuelapp-6050c.firebaseapp.com",
      databaseURL: "https://fuelapp-6050c.firebaseio.com",
      projectId: "fuelapp-6050c",
      storageBucket: "",
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
    return firebase.auth().currentUser;
  }

  retrievePassword(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }

  addUser(userid, userName, email) {
    return firebase.database().ref(`userdb/${userid}`).set({
      name: userName,
      email: email
    })
  }

  // geoLocation(place: string){
  //   return this.http.get(`https://www.globalpetrolprices.com/api/getGasXML_weekly.php?gasoline_diesel=1&rate=LC&countries=97&p=a7594c9d74a6422b728cff761a728e23`);
  // }

}
