import { Component, OnInit,ViewChild } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MediaService } from '../media.service';
import { Router } from '@angular/router';
import locationsArr from "../../app/GlobalArray";
import * as firebase from 'firebase';
import { Chart } from "chart.js";
import { first } from 'rxjs/operators';
declare var Swal;
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 

  tel: any;
  owner: any;
  name: any;
  email: any;
  address: any;
  diesel: number;
  gas: number;
  petrol93: number;
  petrol95: number;
  product_Gas: any;
  product_Diesel: any;
  product_Petrol95: any;
  product_Petrol93: any;
  userName: any;
  shoptype: any;
  userTel: any;
  userAddress: any;
  userGas: any;
  userDiesel: any;
  userPetrol95: any;
  userPetrol93: any;
  userOwner: any;
  userEmail: any;
  //setting up our coordinates here
  totalOulets: number = 0;
  totalSpaza: number = 0;
  totalGarage: number = 0;
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
  icon2;
  iconArray = [];
  userid;
  modal;
  names;
  company;
  Owner;
  currentUserID;
  currentUserImage;
  currentUserName;
  Tip_heading;
  Tip_Type;
  Tip
  charts =[];

  modal1;
  page: string = 'home';
  error: string;
  email2: any;
  logOutEmail: any;

  showfab: any;
  ClientArray = [];
first;
  telvalidate: number = 27000000000;
  userKey: string;
  graph: string;


// Chart Code
// public barChartOptions = {
//   scaleShowVerticalLines:false,
//   responsive:true

// };

// public barChartLabels = ['Gas Outlet', 'Spaza','totalOutlets',];
// public barChartType = 'bar';
// public barChartLegend = true;


// // sum = [23];
// // sum1 = [0,7 ];
// // sum3 = [0,0,16,0 ]
// public barChartData = [
//   {data:[23], label:'totalOutlets' },
//   {data: [0,7], label:'garage' },
//   {data:[0,0,6], label:'Spaza' }
  
// ];
// Chart Code

  constructor(public router: Router, private database: DatabaseService, private media: MediaService) {
    this.modal = 'false';
    this.man = this.media.man;
    this.pump = this.media.fuelpump;
    this.shop = this.media.shop;
    this.styles = this.media.mapstyle;

    // this.BasicChart()

    this.location = navigator.geolocation.getCurrentPosition((data) => {
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });

  }

  trigger(){
    var x = document.getElementById("chart-container")
    if(this.modal != 'Outlets'){
      this.modal = 'Outlets'
      x.style.display ='none'
      this.graph = 'false';
      console.log(x)
    }else{
      this.modal = '';
    }
  }

  trigger1(){

   this.BasicChart();

    var x = document.getElementById("chart-container")
  
    if(x.style.display == 'none'){
     x.style.display = 'block'
     this.modal = 'false'
     console.log('chartshow')
     console.log(this.modal);
    }
    else{
      x.style.display ='none'
      this.modal = ''
      // this.modal = 'Outlets'
      console.log('chartdisable')
      console.log(this.modal);

    }
    // if(  document.getElementById("chart-container").style.display == 'none'){
    //   console.log("ging")
    // document.getElementById("chart-container").style.display = 'block';
    //  }
    //  else if( document.getElementById("chart-container").style.display =='block') {
    //   console.log("goutg")
    //   document.getElementById("chart-container").style.display = 'none';
    //   console.log("goug")
    //  }
    //  else{
    //   document.getElementById('chart-container').style.display = 'none';
    //   console.log('outg');

    //  }

  }
  business() {


    let userid = this.database.getUser();

    console.log(userid)
    firebase.database().ref('userdb/' + userid).on('value', (data: any) => {
      let a = data.val();
      console.log(data.val())
      this.userEmail = a.email;
      this.userOwner = a.owner;
      this.userPetrol93 = a.petrol93;
      this.userPetrol95 = a.petrol95;
      this.userDiesel = a.diesel;
      this.userGas = a.gas;
      this.userAddress = a.address;
      this.userTel = a.tel;
      this.shoptype = a.icon;
      this.userName = a.name;
      this.showfab = a.showfab;
      this.userKey = userid
      alert(this.userKey)

      console.log(a)
    })

  }

  view() {
    let userid = this.database.getUser();


    firebase.database().ref('userdb/' + userid).on('value', data => {
      let infor = data.val();
      console.log(userid);


      if (infor.petrol93 !== undefined || infor.petrol95 !== undefined || infor.diesel !== undefined || infor.gas !== undefined) {
        this.product_Petrol93 = infor.petrol93;
        this.product_Petrol95 = infor.petrol95;
        this.product_Diesel = infor.diesel;
        this.product_Gas = infor.gas;

      } else {

        this.product_Petrol95 = 0;
        this.product_Petrol93 = 0;
        this.product_Gas = 0;
        this.product_Diesel = 0;
      }

    })


  }
  edit() {
    let userid = this.database.getUser();
    if (this.product_Gas == null || this.product_Gas == undefined && this.product_Petrol93 == null || this.product_Petrol93 == undefined && this.product_Petrol95 == null || this.product_Petrol95 == undefined && this.product_Diesel == null || this.product_Diesel == undefined) {
      Swal.fire({
        type: 'error',
        title: 'You cannot leave these empty',
        text: 'Please insert 0 if not available.',

      })
    }
    else if (this.product_Gas == null || this.product_Gas == undefined) {
      Swal.fire({
        type: 'error',
        title: 'You cannot leave this field empty',
        text: 'Please insert 0 if not available.',

      })
    }
    else if (this.product_Petrol93 == null || this.product_Petrol93 == undefined) {
      Swal.fire({
        type: 'error',
        title: 'You cannot leave this field empty',
        text: 'Please insert 0 if not available.',

      })

    }
    else if (this.product_Petrol95 == null || this.product_Petrol95 == undefined) {
      Swal.fire({
        type: 'error',
        title: 'You cannot leave this field empty',
        text: 'Please insert 0 if not available.',

      })

    }
    else if (this.product_Diesel == null || this.product_Diesel == undefined) {
      Swal.fire({
        type: 'error',
        title: 'You cannot leave this field empty',
        text: 'Please insert 0 if not available.',

      })
    }
    else {
      return firebase.auth().onAuthStateChanged(data => {
        console.log(this.product_Diesel + "," + this.product_Gas + "," + this.product_Petrol93 + "," + this.product_Petrol95);
        if (data) {
          firebase.database().ref('userdb/' + userid).update({
            petrol93: this.product_Petrol93,
            petrol95: this.product_Petrol95,
            diesel: this.product_Diesel,
            gas: this.product_Gas,
          }).then(data => {
            // this.database.success();

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Your data has been saved',
              showConfirmButton: false,
              timer: 3000
            })
          })

        }


      })
    }


  }

  

  alphaOnly(event) {

    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8);
  }

  ngOnInit() {
  //     this.charts = new Chart("chart", {
  //     type: 'pie',
  //     data: {
  //         labels: ['totalSpaza', 'totalGarage', 'totalOutlets'],
  //         datasets: [{
  //             label: ['totalSpaza','totalGarage','totalOutlets'],
  //             data: [this.totalSpaza, this.totalGarage, this.totalOulets],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 2
               
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
  // });
    //  let userid = this.database.getUser();
    //  console.log(userid)
    // this.database.retrieveInfor().then((data:any)=>{
    //   console.log(data)
    //   this.ClientArray = data;
    //   this.logOutEmail = this.ClientArray[0].email;
    //   console.log(this.logOutEmail)
    // })
    // let userid = this.database.getUser();

    // console.log(userid)
    // firebase.database().ref('userdb/' + userid).on('value', (data: any) => {
    //   let a = data.val();
    //   console.log(data.val())
    //   this.userEmail = a.email;
    //   this.userOwner = a.owner;
    //   this.userPetrol93 = a.petrol93;
    //   this.userPetrol95 = a.petrol95;
    //   this.userDiesel = a.diesel;
    //   this.userGas = a.gas;
    //   this.userAddress = a.address;
    //   this.userTel = a.tel;
    //   this.shoptype = a.icon;
    //   this.userName = a.name;
    //   this.logOutEmail = a.email


    //   console.log(a)



    // })
    

    this.database.getComments().then((data:any)=>{
      console.log(data);
    })

    this.man = this.media.man;
    this.pump = this.media.fuelpump;
    this.shop = this.media.shop;
    this.styles = this.media.mapstyle;

    this.page = 'home';

    firebase.database().ref('/userdb').on('value', (data) => {
      let keys = Object.keys(data.val());
      for (let i = 0; i < keys.length; i++) {

        this.totalOulets = i + 1;
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
            console.log(data.val().icon)
            if (data.val().icon == "spaza") {
              console.log(data.val().icon)
              this.totalSpaza = this.totalSpaza + 1;
            }
            else {
              console.log(data.val().icon)
              // this.locations.push(business)
               this.totalGarage = this.totalGarage + 1;
               console.log(this.totalGarage)
              // this.icon = '../../assets/house (1).png';
              // console.log(" we are garages")
            }
            this.locations.push(business);


            let o = {
              icon: this.icon
            }

            this.iconArray.push(o);
          })


      }
    })
    console.log(this.totalSpaza, this.totalGarage);
    console.log(this.locations)
  }

// CHART CODE
// public barChartOptions = {
//   scaleShowVerticalLines:false,
//   responsive:true

// };

// public ChartLabels = ['Gas Outlet', 'Spaza','totalOutlets',];
// public ChartType = 'bar';
// public ChartLegend = true;

// // sun = this.totalGarage + 1;

// // sum = [23];
// // sum1 = [0,7 ];
// // sum3 = [0,0,16,0 ]
// public ChartData = [
//   {data:this.totalGarage, label:'garage' },
//   {data: this.totalOulets, label:'totalOutlets' },
//   {data:this.totalSpaza, label:'Spaza' }
  
// ];


// CHART CODE

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

    console.log(this.latitude, this.longitude);
  }

  return(location) {

    locationsArr.length = 0;
    locationsArr.push(location);
    this.address = locationsArr[0].address;
    this.diesel = locationsArr[0].diesel;
    this.email = locationsArr[0].email;
    this.gas = locationsArr[0].gas;
    this.icon = locationsArr[0].icon;
    this.name = locationsArr[0].name;
    this.owner = locationsArr[0].owner;
    this.petrol93 = locationsArr[0].petrol93;
    this.petrol95 = locationsArr[0].petrol95;
    this.tel = locationsArr[0].tel;
    console.log(locationsArr);

  }

  addTip(){
    console.log(locationsArr)
    this.database.makeComments(this.Tip_heading,this.Tip_Type,this.Tip).then((data:any)=>{
      console.log(data)
    })
  }


  logOut() {

    console.log('exit')
    return new Promise((accpt, rej) => {
      firebase.auth().signOut();
      accpt("log Out Success")
      this.router.navigate(['/signin']);
    })
  }

  nextPage(page: string) {
    this.router.navigate([page]);
  }

  submit() {

    if (this.userTel.length !== 10) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    }
    else if (this.userName == null || this.userName == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    }
    else if (this.userEmail == null || this.userEmail == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    }
    else if (this.userOwner == null || this.userOwner == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    }
    else if (this.userAddress == null || this.userAddress == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    }
    else if (this.shoptype == null || this.shoptype == undefined) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Please enter valid data',
      })
    } else {
      let userid = this.database.getUser();
      console.log(userid);
      console.log('here ' + typeof this.userTel);

      let geocoder = new google.maps.Geocoder();
      let resultsMap;




      console.log(this.userid + this.userName + this.userEmail + this.userOwner + this.userTel + this.userAddress, this.shoptype);

      let obj = {
        address: this.userAddress
      }


      let objinfor = {
        name: this.userName,
        email: this.userEmail,
        address: this.userAddress,
        owner: this.userOwner,
        tel: this.userTel,
        uid: userid,
        icon: this.shoptype,
        showfab: 'true',
        key: this.userKey
      }


      console.log(objinfor);
      geocoder.geocode({ 'address': obj.address }, function (results, status) {



        if (status == google.maps.GeocoderStatus.OK) {



          let lati = results[0].geometry.location.lat();
          let longi = results[0].geometry.location.lng();
          console.log(lati + " " + longi);


          // this.database.registerBusiness(userid,buisnessName,businessEmail,businessOwner,businessTel,lati,longi ,petrol93,petrol95,diesel,gas);


          console.log(userid);
          firebase.database().ref('userdb/' + userid).update({
            lat: lati,
            lng: longi,
          }).then((data)=>{
            console.log(data)
            firebase.database().ref('userdb/' + userid).update(
              objinfor
            ).then(data => {
              // this.database.success();
  
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your data has been saved',
                showConfirmButton: false,
                timer: 3000
              })
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


      )

    }

    console.log('Length: ', this.userTel.length)



  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  test() {
    console.log('fdasfdasfas');
  }

  // CHART

  BasicChart(){
 
    this.charts = new Chart("chart", {
      type: 'bar',
      data: {
          labels: ['totalSpaza', 'totalGarage', 'totalOutlets'],
          datasets: [{
              label: ['totalSpaza','totalGarage','totalOutlets'],
              data: [this.totalSpaza, this.totalGarage, this.totalOulets],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2
               
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  }
 
}
