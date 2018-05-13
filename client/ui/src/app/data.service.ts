import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {RestApiService} from './restapi.service';;


@Injectable()
export class DataService {
  message = '';
  messageType = 'danger';

  user: any;

  constructor(private router: Router, private rest: RestApiService) { 
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message){
    this.message = message;
    this.messageType = 'danger';
  }

  success(message){
    this.message = message;
    this.messageType = 'success';
  }

  warning(message){
    this.message = message;
    this.messageType = 'warning';
  }

  async getProfile(){
    try{
      if(localStorage.getItem('token')) {
        const data = await this.rest.get('http://localhost:3030/api/accounts/profile');
        console.log('getprofile', data);
        this.user = data['user'];
      }

    }
    catch(err){
      this.error(err);
    }
  }
  

}
