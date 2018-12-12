import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import * as firebase from 'firebase';
import { Response } from "@angular/http";
import { MediaService } from '../media.service';

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
  man: string;
  shop: string;
  pump: string;
  styles;
  constructor(private database: DatabaseService, private media: MediaService) {
    this.man = this.media.man;
    this.pump = this.media.fuelpump;
    this.shop = this.media.shop;
    this.styles = this.media.mapstyle
    
    this.location = navigator.geolocation.getCurrentPosition((data)=>{
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });

    // this.geoLocation('fdsafasdfas');
  }

  ngOnInit() {
    firebase.database().ref('/userdb').on('value', (data) => {
      let keys = Object.keys(data.val());
      for (let i = 0; i < keys.length; i++) {
        firebase.database().ref(`/userdb/${keys[i]}`).on('value',
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
