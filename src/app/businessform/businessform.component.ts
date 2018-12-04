import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-businessform',
  templateUrl: './businessform.component.html',
  styleUrls: ['./businessform.component.scss']
})
export class BusinessformComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

}
