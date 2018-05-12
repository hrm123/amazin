import { Injectable } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Injectable()
export class DataService {
  message = '';
  messageType = 'danger';

  user: any;

  constructor(private router: Router) { 
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
  

}
