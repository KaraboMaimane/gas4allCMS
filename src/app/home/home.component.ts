import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MediaService } from '../media.service';
import { Router } from '@angular/router';
import locationsArr from "../../app/GlobalArray";
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
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
name;
owner;
petrol93;
petrol95;
phone;
tel;
///User Details Declarations
userAddress;
userDiesel;
userEmail;
userGas;
userlat;
userlng;
userName;
userOwner;
userPetrol93;
userPetrol95;
userPhone;
userTel;
shoptype;
detailsInfor = new Array();

///Products details declarations
product_Petrol95 =0;
product_Petrol93 =0;
product_Gas =0;
product_Diesel =0;



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
  // name: string;
  icon;
  iconArray = [];
  userid;
  modal;
  names;
  company;
  Owner;

  constructor( public router: Router,private database: DatabaseService, private media: MediaService) {
    this.modal = 'false';
    this.man = this.media.man;
    this.pump = this.media.fuelpump;
    this.shop = this.media.shop;
    this.styles = this.media.mapstyle;

   
   
    this.location = navigator.geolocation.getCurrentPosition((data)=>{
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });

   
  }
business(){

  
  let userid = this.database.getUser();
  console.log(userid)
  firebase.database().ref('userdb/'+ userid).on('value', (data: any) => {
let a = data.val();
 console.log(data.val())
 this.userEmail =a.email;
       this.userOwner= a.owner;
       this.userPetrol93 = a.petrol93;
       this.userPetrol95 = a.petrol95;
       this.userDiesel = a.diesel;
       this.userGas = a.gas;
       this.userAddress= a.address;
       this.userTel = a.tel;
       this.shoptype = a.icon;
       this.userName = a.name;


 console.log(a)


  
  })

  

}

view(){
  let userid = this.database.getUser();


 firebase.database().ref('userdb/'+userid).on('value',data=>{
      let infor = data.val();
      console.log(userid);
   
   
      if(infor.petrol93 !== undefined || infor.petrol95 !== undefined || infor.diesel !== undefined || infor.gas  !== undefined){
        this.product_Petrol93= infor.petrol93;
        this.product_Petrol95= infor.petrol95;
        this.product_Diesel = infor.diesel;
        this.product_Gas = infor.gas;
    
      }else{
  
        this.product_Petrol95 =0;
       this.product_Petrol93 =0;
      this.product_Gas =0;
       this.product_Diesel =0;
      }
    
    })


}
  edit(){
    let userid = this.database.getUser();
    if(this.product_Petrol93 == null || this.product_Petrol93 == undefined && this.product_Petrol95 == null || this.product_Petrol95 == undefined && this.product_Diesel == null || this.product_Diesel == undefined && this.product_Gas == null || this.product_Gas == undefined){
     this.petrol95 =0;
      this.petrol93 =0;
     this.gas =0;
      this.diesel =0; 
    }

   return firebase.auth().onAuthStateChanged(data=>{
    console.log(this.product_Diesel+","+this.product_Gas+","+this.product_Petrol93+","+this.product_Petrol95);
     if(data){
       firebase.database().ref('userdb/'+ userid).update({
         petrol93:this.product_Petrol93,
         petrol95:this.product_Petrol95,
         diesel:this.product_Diesel,
         gas:this.product_Gas,
     }).then(data=>{
      this.database.success();
     })

     }
 

       })
  }

  ngOnInit() {
 
   this.business()
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
    
    
    
    console.log(locationsArr);
    
  }

 
  logOut() {
    console.log('exit')
    return new Promise((accpt, rej) => {
      firebase.auth().signOut();
      accpt("log Out Success")
      this.router.navigate(['/signin']);
    })
  }

  nextPage(page: string){
    this.router.navigate([page]);
  }

  submit(){
    let userid = this.database.getUser();
    console.log(userid);

    if(this.userName == "" || this.userName == undefined){
      //  alert("Enter business name");
       this.database.fail();

    }else if(this.userOwner == "" || this.userOwner == undefined){
      //  alert("Enter Owners name");

      this.database.fail();
    }else
    if(this.userAddress == "" || this.userAddress == undefined){
      //  alert("Enter business address");

      this.database.fail();
    }else
    if(this.userEmail == "" || this.userEmail == undefined){
      //  alert("Enter business email")

      this.database.fail();
    }else
    if(this.userTel == "" || this.userTel == undefined  ){
      //  alert("Enter business Contact details")

      this.database.fail();
    }

    else{
      let geocoder = new google.maps.Geocoder();
    let resultsMap;
 



    console.log(this.userid + this.userName + this.userEmail + this.userOwner + this.userTel + this.userAddress, this.shoptype);

    let obj ={
      address:this.userAddress
    }


    let objinfor={
      name:this.userName,
            email:this.userEmail,
              owner: this.userOwner,
              tel: this.userTel,
              uid:userid,
              icon:this.shoptype,
              petrol95:this.userPetrol95,
               petrol93 :this.userPetrol93,
                gas :this.userGas,
                diesel:this.userDiesel,

    }

  
  console.log(objinfor);
    geocoder.geocode({ 'address':obj.address}, function (results, status) {



      if (status == google.maps.GeocoderStatus.OK){
       


        let lati = results[0].geometry.location.lat();
        let longi = results[0].geometry.location.lng();
        console.log(lati + " " + longi);


        // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);
        
           
            console.log(userid);

            firebase.database().ref('userdb/' + userid).update(
            objinfor 
            ).then(()=>{
               this.modal = 'true';
              this.modal1 = 'true';
               Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Your data has been saved',
                  showConfirmButton: false,
                  timer: 3000
                })
            })
            }
            //.then(data=>{
            //   // this.modal = 'true';
            //   // this.modal1 = 'true';
            //   console.log(this.modal, this.modal1)
            
            // // this.database.success();
            
            // Swal.fire({
            //   position: 'center',
            //   type: 'success',
            //   title: 'Your data has been saved',
            //   showConfirmButton: false,
            //   timer: 3000
            // }).then(data=> { 
          
            //   this.modal = 'true';

            //   console.log( this.modal);
            // })
            
            // alert(this.modal="true");


            // },(error =>{
            //   alert(this.modal="true")
            // }))

          


      


       

      }
      

    )}
    
  }

}
