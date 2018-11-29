import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
declare var google;
@Component({
  selector: 'app-businessform',
  templateUrl: './businessform.component.html',
  styleUrls: ['./businessform.component.scss']
})
export class BusinessformComponent implements OnInit {
names;
email;
Owner;
address;



infos = new Array();
  constructor(private database: DatabaseService,private router: Router) {
   let  userid = this.database.getUser();

     this.database.retrieveInfor(userid).on('value',data=>{
         let infor = data.val();
         this.names = infor.name;
         this.email = infor.email;
       console.log(this.names);
     })
    

 
   }

  ngOnInit() {
   

     

  }

  submit(userid,buisnessName,businessEmail,businessOwner,businessTel,address,petrol93,petrol95,diesel,gas){
    alert(buisnessName+businessEmail+businessOwner+businessTel+address+petrol93+petrol95+diesel+gas)
    let geocoder = new google.maps.Geocoder();
    let resultsMap;
    userid = this.database.getUser();

 geocoder.geocode({'address':address},function(results, status){
 
  
  
  if(status == google.maps.GeocoderStatus.OK){

   alert(userid);

    let lati = results[0].geometry.location.lat();
   let longi = results[0].geometry.location.lng();
   console.log(lati +" "+ longi);

   console.log(userid+buisnessName+businessEmail+businessOwner+businessTel+address+petrol93+petrol95+diesel+gas);
  // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);
  return firebase.auth().onAuthStateChanged(data=>{
    if(data){
      firebase.database().ref(`userdb/${userid}`).update({
        name:buisnessName,
        email:businessEmail,
        owner:businessOwner,
        tel:businessTel,
        lat:lati,
        lng:longi,
        petrol93:petrol93,
        petrol95:petrol95,
        diesel:diesel,
        gas:gas
      });


    //   return firebase.database().ref('businessRegistration/'+ userid).push({
    //     name:buisnessName,
    //     email:businessEmail,
    //     owner:businessOwner,
    //     tel:businessTel,
    //     lat:lati,
    //     lng:longi,
    //     petrol93:petrol93,
    //     petrol95:petrol95,
    //     diesel:diesel,
    //     gas:gas
    // },(error=>{
    //   alert(error);
    // }))
    }else{

      alert("login");

    }
  

})

  }

    })
   
      //  
       // console.log(buisnessName+businessEmail+businessPhone+businessOwner+businessTel+address+petrol93+petrol95+diesel+gas)
      
       
     

  


 
    }
}
