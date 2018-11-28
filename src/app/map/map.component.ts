import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  //setting up our coordinates here
  latitude = 51.678418;
  longitude = 7.809007;


  constructor(private database: DatabaseService) { }

  async ngOnInit() {
    await this.database.getLocations().child('users')
  }

  onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}
