import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss']
})
export class CardlistComponent implements OnInit {
  petrol95 =0;
  petrol93 =0;
  gas =0;
  diesel =0;
  userid;
username;
email;
company

  constructor(private database: DatabaseService) { 
    this.userid = this.database.getUser();
    firebase.database().ref('userdb/'+ this. userid)
    this.database.retrieveInfor(this.userid).on('value',data=>{
      let infor = data.val();
      console.log(data);
      this.username = infor.owner;
      this.email = infor.email;
      this.company= infor.name;
   
      if(data){
        this.petrol93= infor.petrol93;
        this.petrol95= infor.petrol95;
        this.diesel = infor.diesel;
        this.gas = infor.gas;
    
      }else{
        alert(false);
        this.petrol95 =0;
       this.petrol93 =0;
      this.gas =0;
       this.diesel =0;
      }


    })
    console.log(this.diesel+""+this.gas+""+this.petrol93+""+this.petrol95);
  }

  ngOnInit() {

  }

  submit(){
   
    alert(this.diesel+""+this.gas+""+this.petrol93+""+this.petrol95);
    return firebase.auth().onAuthStateChanged(data=>{
    
      if(data){
        firebase.database().ref('userdb/'+ this.userid).update({
          petrol93:this.petrol93,
          petrol95:this.petrol95,
          diesel:this.diesel,
          gas:this.gas,
      })

      }else(
        alert("false")
      )
  

        })
  }
}
