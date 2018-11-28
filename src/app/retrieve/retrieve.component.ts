import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.scss']
})
export class RetrieveComponent implements OnInit {

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
  }

  async retrieve(email){
    await this.database.retrievePassword(email).then((data)=>{
      alert(`A password reset email has been sent to: ${email}, Check your mail`);
      this.router.navigate(['']);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
