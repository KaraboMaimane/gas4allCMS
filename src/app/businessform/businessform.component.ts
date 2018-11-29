import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
declare var google;
@Component({
  selector: 'app-businessform',
  templateUrl: './businessform.component.html',
  styleUrls: ['./businessform.component.scss']
})
export class BusinessformComponent implements OnInit {
names;
email;
businessOwner;
businessEmail;

infos = new Array();
  constructor(private database: DatabaseService,private router: Router) {
    

    this.database.retrieveInfor().on('value',data=>{
      let infor = data.val();
      this.names = infor.name;
      this.email = infor.email;
      console.log(this.names);
    })
    

 
   }

  ngOnInit() {
   

     

  }

  submit(userid,buisnessName,businessEmail,businessPhone,businessOwner,businessTel,addresss,petrol93,petrol95,diesel,gas){
    alert(buisnessName+businessEmail+businessPhone+businessOwner+businessTel+addresss+petrol93+petrol95+diesel+gas)
    let geocoder = new google.maps.Geocoder();
    let resultsMap;


 geocoder.geocode({'address':addresss},function(results, status){
  userid = this.database.getUser();
  if(status == google.maps.GeocoderStatus.OK){
   alert(userid);
    let lati = results[0].geometry.location.lat();
   let longi = results[0].geometry.location.lng();
   console.log(lati +" "+ longi);

   console.log(userid+buisnessName+businessEmail+businessPhone+businessOwner+businessTel+addresss+petrol93+petrol95+diesel+gas);
   this.database.registerBusiness(userid,buisnessName,businessEmail,businessPhone,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);

  }

    })
   
      //  
       // console.log(buisnessName+businessEmail+businessPhone+businessOwner+businessTel+address+petrol93+petrol95+diesel+gas)
      
       
     

  


 
    }
}
