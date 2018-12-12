import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
declare var google;
@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit {

  petrol95 = 0;
  petrol93 = 0;
  gas = 0;
  diesel = 0;
  userid;
  username;
  email;
  company;
  tel;
  icon;
  address;
  lati;
  longi;

  constructor(private database: DatabaseService) {
 
    
this.userid = this.database.getUser();
    this.database.retrieveInfor(this.userid).on('value',data=>{
      let infor = data.val();
      console.log(data);
      this.company= infor.name;
      this.email = infor.email;
      this.tel = infor.tel;
      this.icon = infor.icon;
      this.address = infor.address
    })
    alert(this.email +" "+ this.company);

  }

  submit(form: NgForm){
    console.log(form);
    let geocoder = new google.maps.Geocoder();
 
 
    let company = form.value.company;
    let address = form.value.address;
    let icon = form.value.icon;
    let tel = form.value.tel;

    geocoder.geocode({'address':form.value.address},function(results, status){
      let id = firebase.auth().currentUser.uid;
      if(status == google.maps.GeocoderStatus.OK){
        let lati = results[0].geometry.location.lat();
        let longi = results[0].geometry.location.lng();
        alert(lati + " "+longi + id);
        // let userid = this.database.getUser();

     

        firebase.database().ref('userdb/'+ id).update({
          name:company,
          tel:tel,
          icon:icon,
          address:address,
          lat: lati,
          lng:longi
        })
        alert("Information Saved");
      // return firebase.auth().onAuthStateChanged(data=>{
      //     if(data){

      //       firebase.database().ref('userdb/'+ this.userid).update({
      //         name:this.company,
      //         tel:this.tel,
      //         icon:this.icon,
      //         address:this.address,
      //         lat: this.lati,
      //         lng:this.longi
      //       })
    
      //    alert("Information Saved")
      //       console.log("yes yes");
         
        
      //     }else{
      
        
      
      //     }
        
      
      // })
      }


    })
  
  }

  ngOnInit() {

  }


}
