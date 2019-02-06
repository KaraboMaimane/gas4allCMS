import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  petrol95 =0;
  petrol93 =0;
  gas =0;
  diesel =0;
  userid;
username;
email;
company
  constructor(private database: DatabaseService, private router: Router) {
    this.userid = this.database.getUser();
    firebase.database().ref('userdb/'+ this.userid).on('value',data=>{
      let infor = data.val();
      console.log(data);
      this.username = infor.owner;
      this.email = infor.email;
      this.company= infor.name;
   
      if(infor.petrol93 !== undefined || infor.petrol95 !== undefined || infor.diesel !== undefined || infor.gas){
        this.petrol93= infor.petrol93;
        this.petrol95= infor.petrol95;
        this.diesel = infor.diesel;
        this.gas = infor.gas;
    
      }else{
  
        this.petrol95 =0;
       this.petrol93 =0;
      this.gas =0;
       this.diesel =0;
      }
      console.log(this.diesel+","+this.gas+","+this.petrol93+","+this.petrol95);
    })


   }
   More(){
     this.router.navigate(["/more-info"]);
   }

   logout(){
    this.database.logOut().then(()=>{
      console.log('exit')
      this.router.navigate(['/signin']);
    })
  }

  busipage(){
    this.router.navigate(["/next-page"]);
  }

  home(){
    this.router.navigate(["/home"]);
  }
   edit(){
     if(this.petrol93 == null || this.petrol93 == undefined && this.petrol95 == null || this.petrol95 == undefined && this.diesel == null || this.diesel == undefined && this.gas == null || this.gas == undefined){
      this.petrol95 =0;
       this.petrol93 =0;
      this.gas =0;
       this.diesel =0; 
     }

    return firebase.auth().onAuthStateChanged(data=>{
    
      if(data){
        firebase.database().ref('userdb/'+ this.userid).update({
          petrol93:this.petrol93,
          petrol95:this.petrol95,
          diesel:this.diesel,
          gas:this.gas,
      }).then(data=>{
       this.database.success();
      })

      }
  

        })
   }


  ngOnInit() {
  }

  nextPage(page: string){
    this.router.navigate([page]);
  }


}
