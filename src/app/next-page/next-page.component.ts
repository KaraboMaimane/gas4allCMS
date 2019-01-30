import { Component, OnInit } from '@angular/core';
// import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DatabaseService } from '../database.service';
import { NgForm } from '@angular/forms';
declare var google;

@Component({
  selector: 'app-next-page',
  templateUrl: './next-page.component.html',
  styleUrls: ['./next-page.component.scss']
})
export class NextPageComponent implements OnInit {

  petrol95 = 0;
  petrol93 = 0;
  gas = 0;
  diesel = 0;
  userid;
  username;
  email;
  company
  names;
  tel ;
  Owner;
  address;
  shoptype;
  url;
  profileObj = {};
  infos = new Array();

  constructor(private database: DatabaseService, private router: Router) {
    let userid = this.database.getUser();

    this.database.retrieveInfor(userid).on('value', data => {
      let infor = data.val();
      this.names = infor.name;
      this.email = infor.email;
      this.company = infor.name;
      this.Owner = infor.owner;
      this.petrol93 = infor.petrol93;
      this.petrol95 = infor.petrol95;
      this.diesel = infor.diesel;
      this.gas = infor.gas;
      this.address= infor.address;
      this.tel = infor.tel;
      this.shoptype = infor.icon;

      console.log(this.email);
    })

  }

  logout(){
    this.database.logOut().then(()=>{
      console.log('exit')
      this.router.navigate(['/signin'])
    })
  }

  products(){
    this.router.navigate(['/products'])
  }
  home(){
    this.router.navigate(["/home"]);
  }
  submit(){

    let geocoder = new google.maps.Geocoder();
    let resultsMap;
    let userid = this.database.getUser();
;


    console.log(userid + this.company + this.email + this.Owner + this.tel + this.address, this.shoptype);

    let obj ={
      address:this.address
    }


    let objinfor={
      name:this.company,
            email:this.email,
              owner: this.Owner,
              tel: this.tel,
              uid: userid,
              icon:this.shoptype,
              petrol95:this.petrol95,
               petrol93 :this.petrol93,
                gas :this.gas,
                diesel:this.diesel,

    }

  
  
    geocoder.geocode({ 'address':obj.address}, function (results, status) {

   


      if (status == google.maps.GeocoderStatus.OK){
       


        let lati = results[0].geometry.location.lat();
        let longi = results[0].geometry.location.lng();
        console.log(lati + " " + longi);


        // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);
  
        return firebase.auth().onAuthStateChanged(data => {
        
          if (data) {
           
            firebase.database().ref('userdb/' + userid).update({
              name:objinfor.name,
              email:objinfor.email,
              owner: objinfor.owner,
              tel: objinfor.tel,
              lat: lati,
              lng: longi,
              uid: userid,
              icon:objinfor.icon,
              address:obj.address,
              // petrol95:objinfor.petrol95,
              // petrol93 :objinfor.petrol93,
              // gas :objinfor.gas,
              //  iesel:objinfor.diesel,

              

            })

            alert("Information Saved")
          


          } else {



          }


        })

      }
      

    })
  }

  onSubmit(form: NgForm) {
    console.log(form);
    let geocoder = new google.maps.Geocoder();
    let resultsMap;
    let userid = this.database.getUser();

    let company = form.value.companyName;
    let email = form.value.email;
    let owner = form.value.ownerName;
    let tel = form.value.telephone;
    let petrol93 = form.value.petrol93;
    let petrol95 = form.value.petrol95;
    let gas = form.value.lpg;
    let diesel = form.value.diesel;
    let icon = form.value.shoptype;
    this.address=form.value.address;


    console.log(userid + company + email + owner + tel + petrol93 + petrol95 + diesel + gas + form.value.address, icon);

    let obj ={
      address:this.address
    }

    alert(form.value.address);
    geocoder.geocode({ 'address':form.value.address }, function (results, status) {

      alert(status);


      if (status == google.maps.GeocoderStatus.OK){



        let lati = results[0].geometry.location.lat();
        let longi = results[0].geometry.location.lng();
        console.log(lati + " " + longi);

     
        alert(userid);

        // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);
  
        return firebase.auth().onAuthStateChanged(data => {
       
          if (data) {
            alert("inside auth" + "inside data"+petrol93);
            firebase.database().ref('userdb/' + userid).update({
              name: company,
              email: email,
              owner: owner,
              tel: tel,
              lat: lati,
              lng: longi,
              uid: userid,
              icon: icon,
              address:obj.address

            })

            alert("Information Saved")
          

            this.router.navigate(["/products"])
         
          } else {



          }


        })

      }
      

    })



  }










  // constructor(private database: DatabaseService) { 
  //   this.userid = this.database.getUser();
  //   firebase.database().ref('userdb/'+ this. userid)
  //   this.database.retrieveInfor(this.userid).on('value',data=>{
  //     let infor = data.val();
  //     console.log(data);
  //     this.username = infor.owner;
  //     this.email = infor.email;
  //     this.company= infor.name;

  //     if(data){
  //       this.petrol93= infor.petrol93;
  //       this.petrol95= infor.petrol95;
  //       this.diesel = infor.diesel;
  //       this.gas = infor.gas;

  //     }else{
  //       alert(false);
  //       this.petrol95 =0;
  //      this.petrol93 =0;
  //     this.gas =0;
  //      this.diesel =0;
  //     } 


  //   })
  //   console.log(this.diesel+""+this.gas+""+this.petrol93+""+this.petrol95);
  // }

  ngOnInit() {

  }

  // submit(){

  //   alert(this.diesel+""+this.gas+""+this.petrol93+""+this.petrol95);
  //   return firebase.auth().onAuthStateChanged(data=>{

  //     if(data){
  //       firebase.database().ref('userdb/'+ this.userid).update({
  //         petrol93:this.petrol93,
  //         petrol95:this.petrol95,
  //         diesel:this.diesel,
  //         gas:this.gas,
  //     })

  //     }else(
  //       alert("false")
  //     )


  //       })
  // }

  nextPage(page: string){
    this.router.navigate([page]);
  }
}
