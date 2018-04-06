import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

import { Observable, Subscription } from "rxjs/Rx";
import { TIME_TO_LEFT, TIME_TO_SEARCH } from '../helpers/constants';


@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html'
})
export class GetUserComponent implements OnInit {

  public document:string='';
  public documentToSearch:string = '';
  public created_at: Date = null;
  public user:User;
  public currentTime:Date;

  constructor(private _userService:UserService) {

  }

  ngOnInit() {
    //this.getTemp();
    this.searchObservable().subscribe();
  }

  searchObservable() : Observable<any>{

    return new Observable(observer =>{

      let intervalo = setInterval(()=>{
        this.currentTime = new Date();
        this.getTemp();

      }, TIME_TO_SEARCH);
    });
  }

  search(document:string){
    this._userService.getUser(document)
      .subscribe((response:any)=>{
        this.user = response;
      });
  }

  getTemp(){
    this._userService.getTem()
      .subscribe((res:any)=>{
        this.document = res.document;
        this.created_at = new Date(res.created_at);
        let actualDate = new Date();

        if(actualDate.getTime() - this.created_at.getTime() > TIME_TO_LEFT){
          if(this.user){
            this.user = null;
          }
        }
        else{
          
          if(this.document != this.documentToSearch){
            this.documentToSearch = this.document;
            this.search(this.documentToSearch);
          }
        }
      });
  }

}
