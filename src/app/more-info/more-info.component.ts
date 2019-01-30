import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import locationsArr from "../../app/GlobalArray";
@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  details = [];

  
address;
diesel;
email;
gas;
icon;
lat;
lng;
name;
owner;
petrol93;
petrol95;
phone;
tel;
  constructor( private router:Router) { }

  ngOnInit() {
    console.log(locationsArr)
    
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
    console.log(this.address)
     
  }


  nextPage(page:string){
    this.router.navigate([page]);
  }

}
