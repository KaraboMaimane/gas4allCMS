import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  locations = [];

  constructor() {
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

  getLocations() {
    firebase.database().ref('/users').on('value', (data)=>{
      let keys = Object.keys(data.val());
      this.addArray(this.loopKeys(keys));
    })
  }

  loopKeys(keys){
    for(let i = 0; i <= keys.length; i++){
      firebase.database().ref(`/users/${keys[i]}`).on('value', (data)=>{
        if(data.val() != undefined && data.val() != null){
          this.addArray(data.val()); 
        }
      })
    }

    console.log(this.locations);
  }

  addArray(value){
    this.locations.push(value);
  }
}
