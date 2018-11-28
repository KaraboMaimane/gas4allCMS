import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import * as firebase from 'firebase';

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

    this.database.geoLocation('s').subscribe(Response=>{
      console.log(Response);
    },
    (error)=>{
      console.log(error);
    })
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

    console.log(this.locations)
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}
