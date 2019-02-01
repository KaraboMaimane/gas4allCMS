import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MediaService } from '../media.service';
import { Router } from '@angular/router';
import locationsArr from "../../app/GlobalArray";
import * as firebase from 'firebase';

// import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// PopUp
details = [];

  
address;
diesel;
email;
gas;
// icon;
lat;
lng;
// name;
owner;
petrol93;
petrol95;
phone;
tel;


  //setting up our coordinates here
  totalOulets: number = 0;
  totalSpaza: number  = 0;
  totalGarage:number = 0;
  latitude;
  longitude;
  locations = [];
  location;
  man: string;
  shop: string;
  pump: string;
  styles;
  name: string;
  icon;
  iconArray = [];

  modal;

  constructor( public router: Router,private database: DatabaseService, private media: MediaService) {
    this.modal = 'false';
    this.man = this.media.man;
    this.pump = this.media.fuelpump;
    this.shop = this.media.shop;
    this.styles = this.media.mapstyle;

    console.log(this.modal);
    
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

        this.totalOulets = i +  1;
        console.log(this.totalOulets);

        firebase.database().ref(`/userdb/${keys[i]}`).on('value',
          (data) => {
            let business = {
              address: data.val().address,
              name: data.val().name,
              lat: data.val().lat,
              lng: data.val().lng,
              email: data.val().email,
              phone: data.val().phone,
              owner: data.val().owner,
              tel: data.val().tel,
              diesel: data.val().diesel,
              gas: data.val().gas,
              petrol93: data.val().petrol93,
              petrol95: data.val().petrol95,
              icon: data.val().icon

            }


            this.locations.push(business);

            if(data.val().icon == "garage"){
              this.totalGarage = this.totalGarage + 1;
              this.icon= this.media.fuelpump;
            }else{
              this.totalSpaza =this.totalSpaza + 1;
              this.icon=this.media.shop;
          
            }
            let o ={
              icon:this.icon
            }

            this.iconArray.push(o);
          })

        
      }
    })
console.log(this.totalSpaza,this.totalGarage);
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
  // showPopup(){
  //   this.popup.show();
  //   console.log('pop')
  // }


  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

    console.log(this.latitude, this.longitude);
  }

  return(location){
    locationsArr.length = 0;
    locationsArr.push(location);
   

    this.address  = locationsArr[0].address;
    this.diesel  = locationsArr[0].diesel;
    this.email  = locationsArr[0].email;
    this.gas  = locationsArr[0].gas;
    this.icon  = locationsArr[0].icon;
    this.name  = locationsArr[0].name;
    this.owner  = locationsArr[0].owner;
    this.petrol93  = locationsArr[0].petrol93;
    this.petrol95  = locationsArr[0].petrol95;
    this.tel  = locationsArr[0].tel;
    
    // this.router.navigate(['/more-info'])
    
    console.log(locationsArr);
    
  }

  logout(){
    this.database.logOut().then(()=>{
      console.log('exit')
      this.router.navigate(['/signin']);
    })
  }

  nextPage(page: string){
    this.router.navigate([page]);
  }

}
