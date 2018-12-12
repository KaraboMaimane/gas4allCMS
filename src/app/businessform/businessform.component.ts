import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
declare var google;
import {NgForm} from '@angular/forms';
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
company;
petrol93;
petrol95;
diesel;
gas;
url;
profileObj={};
//

//
name;
emails;
ownerName;
pic
event:any;
icon;


infos = new Array();
  constructor(private database: DatabaseService,public router: Router) {
   let  userid = this.database.getUser();

 
      this.database.retrieveInfor(userid).on('value',data=>{
        let infor = data.val();
        this.names = infor.name;
         this.email = infor.email;
         this.company= infor.name;
        this.Owner= infor.owner;
        this.petrol93= infor.petrol93;
        this.petrol95= infor.petrol95;
        this.diesel = infor.diesel;
        this.gas = infor.gas;
        console.log(this.email);
      })
    

      // firebase.database().ref('pic/'+ userid).on('value',((data)=>{
      //   let infor = data.val();
      //   if(infor != null && infor != ""){
      //     this.pic = infor.url;
      //     console.log(infor);
      //   }else{
      //     console.log("no picture" );
          
      //   }
      // }))

 
   }

  ngOnInit() {
   

     

  }

  onSubmit(form: NgForm,event:any){
    console.log(form);
    let geocoder = new google.maps.Geocoder();
    let resultsMap;
   let  userid = this.database.getUser();

   let company = form.value.companyName;
   let email = form.value.email;
   let owner = form.value.ownerName;
   let tel = form.value.telephone;
   let petrol93 = form.value.petrol93;
   let petrol95 = form.value.petrol95;
   let gas = form.value.lpg;
   let diesel = form.value.diesel;
   let icon = form.value.shoptype;

  
   console.log(userid+company+email+owner+tel+petrol93+petrol95+diesel+gas+form.value.address,icon);

    geocoder.geocode({'address':form.value.address},function(results, status){
 
  
  
      if(status == google.maps.GeocoderStatus.OK){
    
      
    
        let lati = results[0].geometry.location.lat();
       let longi = results[0].geometry.location.lng();
       console.log(lati +" "+ longi);

    
     
      // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);

      return firebase.auth().onAuthStateChanged(data=>{
        if(data){
          firebase.database().ref('userdb/'+ userid).update({
            name:company,
            email:email,
            owner:owner,
            tel:tel,
            lat:lati,
            lng:longi,
            petrol93:petrol93,
            petrol95:petrol95,
            diesel:diesel,
            gas:gas,
            uid:userid,
            icon:icon

          })

       alert("Information Saved")
          console.log("yes yes");
       
      
        }else{
    
      
    
        }
      
    
    })
    
      }
    
        })
    
        

  }
  // insertImage(event:any){
   
  // alert("hello")
  
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
      
  //       this.url = event.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     console.log(event.target.files);
  //     let selectedfile = event.target.files[0];
  //     let filename = selectedfile.name;
    
   

  //     let storageRef = firebase.storage().ref("profilepic/" + filename);

  //     let metadata = { contentType: "image/jpeg", size: 0.75 };
  //     let uploadTask = storageRef.put(selectedfile, metadata);

  //     this.profileObj = {
  //       filename: filename,
  //       metadata: metadata
  //     }
  //     uploadTask.on(
  //       "state_changed",
  //       function(snapshot) {},
  //       function(error) {
  //         // Handle unsuccessful uploads
  //         alert("error !!1");
  //       },
  //       function() {
  //         // Handle successful uploads on complete
         
  //         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //           console.log("File available at", downloadURL);

  //           firebase.auth().onAuthStateChanged(user => {
  //             if (user) {
  //               console.log("User has sign in");
  //               let userID = firebase.auth().currentUser.uid;
  //               let obj = {
  //                 url: downloadURL
  //               };

  //               firebase
  //                 .database()
  //                 .ref("pic/" + userID)
  //                 .set({
  //                   url: downloadURL
  //                 });

  //               console.log(userID);
  //             } else {
  //               console.log("User has not sign in");
  //             }
  //           });
  //         });
  //       }
  //     );

  //     //});


  //   }
  // }

}
