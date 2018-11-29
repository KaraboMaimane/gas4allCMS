import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import * as firebase from 'firebase';
import { Response } from "@angular/http";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  //setting up our coordinates here
  latitude;
  longitude;
  locations = [];
  location;

  constructor(private database: DatabaseService) {
    this.location = navigator.geolocation.getCurrentPosition((data)=>{
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });

    // this.geoLocation('fdsafasdfas');
  }

  ngOnInit() {
    firebase.database().ref('/users').on('value', (data) => {
      let keys = Object.keys(data.val());
      for (let i = 0; i < keys.length; i++) {
        firebase.database().ref(`/users/${keys[i]}`).on('value',
          (data) => {
            let business = {
              name: data.val().name,
              lat: data.val().lat,
              lng: data.val().lng
            }
            this.locations.push(business);
          })
      }
    })

<<<<<<< HEAD
  async ngOnInit() {
    // await this.database.getLocations().child('users')
=======
    console.log(this.locations)
>>>>>>> 7184d9da90b74b7d860d962e1a45d71c650ef4cb
  }

  // geoLocation(place){
  //   this.database.geoLocation(place).subscribe((response :Response) => {
  //     const data = response.json();
  //     console.log(data);
  //   },
  //   (error)=>{
  //     console.log(error);
  //   })
  // }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}
