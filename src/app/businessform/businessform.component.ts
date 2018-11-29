import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-businessform',
  templateUrl: './businessform.component.html',
  styleUrls: ['./businessform.component.scss']
})
export class BusinessformComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
